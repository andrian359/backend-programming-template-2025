module.exports = (mongoose) => {
  const prizeSchema = new mongoose.Schema({
    name: String,
    maxQuota: Number,
    currentWon: { type: Number, default: 0 },
  });

  return mongoose.model('Prize', prizeSchema);
};
