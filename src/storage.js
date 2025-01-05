export function logCommand(command) {
  const commands = JSON.parse(localStorage.getItem('commands')) || [];
  commands.push({ command, timestamp: new Date() });
  localStorage.setItem('commands', JSON.stringify(commands));
}

export function getCommandHistory() {
  return JSON.parse(localStorage.getItem('commands')) || [];
}
