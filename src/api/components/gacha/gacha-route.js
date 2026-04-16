const express = require('express');
const gachaController = require('./gachacontroller');
module.exports = (app) => {
  const router = express.Router();
  router.post('/', gachaController.doGacha);
  router.get('/history/:username', gachaController.getHistory);
  router.get('/prizes', gachaController.getRemainingQuota);
  router.get('/winners', gachaController.getWinners);
  app.use('/gacha', router);
};
