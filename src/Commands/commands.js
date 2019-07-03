const statsCommand = require('./Stats/statsCommand');
const linkCommand = require('./Link/linkCommand');
const meCommand = require('./Me/meCommand');
const showCommand = require('./Show/showCommand');
const testCommand = require('./test/testCommand');

const commands = {
  stats: statsCommand,
  link: linkCommand,
  me: meCommand,
  show: showCommand,
  test: testCommand
}

module.exports = commands;