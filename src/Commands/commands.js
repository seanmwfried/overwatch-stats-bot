const statsCommand = require('./Stats/statsCommand');
const linkCommand = require('./Link/linkCommand');
const meCommand = require('./Me/meCommand');

const commands = {
  stats: statsCommand,
  link: linkCommand,
  me: meCommand
}

module.exports = commands;