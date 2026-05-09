const mineflayer = require('mineflayer');
const config = require('./config.json');

const bot = mineflayer.createBot({
  host: config.frodefiscale.falix.gg,
  port: config.22369,
  username: config.HainzSMPmanager,
  auth: 'offline',
  version: 1.21.11,
  viewDistance: config.botChunk
});

let movementPhase = 0;
const STEP_INTERVAL = 1500;
const STEP_SPEED    = 1;
const JUMP_DURATION = 500;

bot.on('spawn', () => {
  setTimeout(() => {
    bot.setControlState('sneak', true);
    console.log(`✅ ${config.HainzSMPmanager} is Ready!`);
  }, 3000);

  setTimeout(movementCycle, STEP_INTERVAL);
});

function movementCycle() {
  if (!bot.entity) return;

  switch (movementPhase) {
    case 0:
      bot.setControlState('forward', true);
      bot.setControlState('back', true);
      bot.setControlState('jump', true);
      break;
    case 1:
      bot.setControlState('forward', true);
      bot.setControlState('back', true);
      bot.setControlState('jump', true);
      break;
    case 2:
      bot.setControlState('forward', true);
      bot.setControlState('back', true);
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('jump', true);
      }, JUMP_DURATION);
      break;
    case 3:
      bot.setControlState('forward', true);
      bot.setControlState('back', true);
      bot.setControlState('jump', true);
      break;
  }

  movementPhase = (movementPhase + 1) % 4;

  setTimeout(movementCycle, STEP_INTERVAL);
}

bot.on('error', (err) => {
  console.error('⚠️ Error:', err);
});
bot.on('end', () => {
  console.log('⛔️ Bot Disconnected!');
});
