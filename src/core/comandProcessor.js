// Parses input, validates commands, updates state

import { states } from "./state.js";
import { areAllCommandsValid, commandExists } from "../utils/helpers.js";
import {
  highlightCommandInHelperPanel,
  clearhighlightedCommandInHelperPanel,
} from "../utils/helperUi.js";

export function parseCommands(rawInput) {
  return rawInput
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((cmd) => cmd.toLowerCase());
}

/**
 * Updates states.currentCommand based on valid input commands.
 */
export function updateCurrentCommands(input) {
  const parsed = parseCommands(input);
  const seen = new Set();

  states.currentCommand = parsed.filter((cmd) => {
    return (
      commandExists(states.mantras.commands, cmd) &&
      !seen.has(cmd) &&
      seen.add(cmd)
    );
  });

  clearhighlightedCommandInHelperPanel();
  highlightCommandInHelperPanel();
}

/**
 * Checks if all commands are valid after a short delay.
 * Used to trigger visual cues like "Press Enter".
 */
let validationTimeout;
export function validateCommandsWithDelay(input, onValidCallback) {
  clearTimeout(validationTimeout);

  validationTimeout = setTimeout(() => {
    const allValid = areAllCommandsValid(states.mantras.commands, input);
    if (allValid && typeof onValidCallback === "function") {
      onValidCallback();
    }
  }, 1000);
}
