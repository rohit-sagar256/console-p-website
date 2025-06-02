import { helpPanel, terminalOutput } from "../ui/elements";
import { states } from "../core/state";
export function highlightCommandInHelperPanel() {
  states.currentCommand.forEach((command) => {
    const highlightedCommandEl = helpPanel.querySelector(
      `li[data-command="${command}"]`
    );
    if (highlightedCommandEl) {
      highlightedCommandEl.classList.add("highlighted_cmd");
    } else {
      clearhighlightedCommandInHelperPanel();
    }
  });
}

export function clearhighlightedCommandInHelperPanel() {
  const highlightedCmds = helpPanel.querySelectorAll(".highlighted_cmd");
  highlightedCmds.forEach((el) => {
    el.classList.remove("highlighted_cmd");
  });
}

export function clearCommandContent() {
  terminalOutput.querySelectorAll("[data-command]").forEach((el) => {
    const cmd = el.dataset.command;
    if (!states.currentCommand.includes(cmd)) {
      el.remove();
    }
  });
}
