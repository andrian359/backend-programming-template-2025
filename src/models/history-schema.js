module.exports = (mongoose) => {
  const historySchema = new mongoose.Schema({
    username: String,
    isWin: Boolean,
    prizeName: { type: String, default: null },
    date: { type: Date, default: Date.now },
  });

  return mongoose.model('History', historySchema);
};
