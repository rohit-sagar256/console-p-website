/**
 * Debounce utility: delays function execution until after delay ms have passed
 * since the last call. Useful for limiting rapid-fire events like input.
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @returns {Function} - Debounced function.
 */
export function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Adds a data attribute (default: data-command) to the first element node
 * in a DocumentFragment. Used to tag top-level elements for command mapping.
 * @param {DocumentFragment} fragment - The fragment to modify.
 * @param {string} value - The value to set for the data attribute.
 * @param {string} key - The data attribute key (default: "command").
 * @returns {DocumentFragment} - The modified fragment.
 */
export function addDatasetToTopElement(fragment, value, key = "command") {
  for (const node of fragment.childNodes) {
    if (node.nodeType === 1) {
      node.dataset[key] = value;
      break;
    }
  }
  return fragment;
}

/**
 * Checks if all commands in the input string are valid.
 * Splits input by whitespace, lowercases, and checks each command.
 * @param {string} input - The input string containing commands.
 * @returns {boolean} - True if all commands are valid, false otherwise.
 */
export function areAllCommandsValid(commands, input) {
  const commandsFilterd = input
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((cmd) => cmd.toLowerCase());

  if (commandsFilterd.length === 0) return false;

  return commandsFilterd.every((cmd) => commandExists(commands, cmd));
}

/**
 * Checks if a single command exists in the global states.mantras.commands object.
 * @param {string} command - The command to check.
 * @returns {boolean} - True if the command exists, false otherwise.
 */
export function commandExists(commands, command) {
  return commands.hasOwnProperty(command);
}

export function withBase(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}
