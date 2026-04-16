const { Prize, History } = require('../../../models');

const doGacha = async (req, res) => {
  const { username } = req.body;
  if (!username)
    return res.status(400).json({ error: 'Username mana woy! Isi body-nya!' });
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const countToday = await History.countDocuments({
    username,
    date: { $gte: startOfDay },
  });

  if (countToday >= 5) {
    return res
      .status(429)
      .json({ error: 'Udah limit 5x sehari anjir, besok lagi mainnya!' });
  }
  const isWin = Math.random() < 0.3;
  let wonPrize = null;

  if (isWin) {
    const availablePrizes = await Prize.find({
      $expr: { $lt: ['$currentWon', '$maxQuota'] },
    });
    if (availablePrizes.length > 0) {
      const randomIdx = Math.floor(Math.random() * availablePrizes.length);
      const selectedPrize = availablePrizes[randomIdx];

      const updatedPrize = await Prize.findOneAndUpdate(
        { _id: selectedPrize._id, currentWon: { $lt: selectedPrize.maxQuota } },
        { $inc: { currentWon: 1 } },
        { new: true }
      );
      if (updatedPrize) wonPrize = updatedPrize.name;
    }
  }
  await History.create({ username, isWin: !!wonPrize, prizeName: wonPrize });
  if (wonPrize) {
    return res.json({
      message: `Hoki lu gede njir! Selamat dapet ${wonPrize}`,
    });
  } else {
    return res.json({ message: 'Zonk! Kasihan deh lu, coba lagi nanti.' });
  }
};
const getHistory = async (req, res) => {
  const { username } = req.params;
  const history = await History.find({ username }).sort({ date: -1 });
  res.json({ username, history });
};
const getRemainingQuota = async (req, res) => {
  const prizes = await Prize.find();
  const remaining = prizes.map((p) => ({
    hadiah: p.name,
    sisa_kuota: p.maxQuota - p.currentWon,
  }));
  res.json(remaining);
};
const getWinners = async (req, res) => {
  const winners = await History.find({ isWin: true });

  const maskName = (name) => {
    return name
      .split('')
      .map((char) => {
        if (char === ' ') return ' ';
        return Math.random() > 0.5 ? '*' : char;
      })
      .join('');
  };

  const maskedWinners = winners.map((w) => ({
    prize: w.prizeName,
    winner: maskName(w.username),
  }));

  res.json(maskedWinners);
};
module.exports = { doGacha, getHistory, getRemainingQuota, getWinners };
