"use strict";

import { states } from "./initializer";

const userInput = document.getElementById("userInput");
const terminalContent = document.getElementById("terminal-content");
const terminalOutput = document.getElementById("terminal-output");
const helpPanel = document.querySelector(".help-section");
const commandLinebox = document.querySelector(".command-line");
const terminalOutputWrapper = document.getElementById(
  "terminal-output-wrapper"
);

async function loadMantras() {
  try {
    const response = await fetch("../mantra/mantras.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading mantras.json:", error);
  }
}

loadMantras().then((mantras) => {
  if (mantras) {
    states.mantras = mantras;

    const ul = document.createElement("ul");
    ul.classList.add("space-y-3", "text-xs");

    for (let [cmd, info] of Object.entries(mantras["commands"])) {
      const li = document.createElement("li");
      li.classList.add("flex", "flex-col", "gap-1");
      li.dataset.command = cmd;

      const liDiv = document.createElement("div");
      liDiv.classList.add("flex", "items-center", "gap-2");

      const commandSpan = document.createElement("span");
      commandSpan.classList.add(
        "block",
        "text-[#b3b3b3]",
        "bg-[#23232a]",
        "px-2",
        "py-0.5",
        "rounded",
        "select-none",
        "shrink-0",
        "whitspace-nowrap"
      );
      commandSpan.textContent = cmd;
      li.appendChild(liDiv);

      let commandSpanInfo = document.createElement("span");
      commandSpanInfo.classList.add("opacity-40", "italic");
      commandSpanInfo.textContent = info.cmd_info || "No description available";
      liDiv.appendChild(commandSpan);

      liDiv.appendChild(commandSpanInfo);

      ul.appendChild(li);
    }
    helpPanel.appendChild(ul);
  }
});

let typingTimeout;

userInput.addEventListener("input", function (e) {
  const inputValue = e.target.value.trim();
  commandCenter(inputValue);
});

// Command Center
function commandCenter(commands) {
  const splittedCommands = commands
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((cmd) => cmd.toLowerCase());

  showPressEnterMessage(false);

  clearhighlightedCommandInHelperPanel();

  if (commands.length < 3) return;

  const validCommands = splittedCommands.filter((cmd) => commandExists(cmd));
  states.currentCommand = validCommands;

  clearTimeout(typingTimeout);

  typingTimeout = setTimeout(() => {
    const allValid = areAllCommandsValid(commands);
    if (allValid) {
      showPressEnterMessage(true);
    }
  }, 1000);

  states.currentCommand.forEach((command) => {
    highlightCommandInHelperPanel(command);
  });
}

// Are all commands valid?
function areAllCommandsValid(input) {
  const commands = input
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((cmd) => cmd.toLowerCase());

  if (commands.length === 0) return false;

  return commands.every((cmd) => commandExists(cmd));
}

// command exists
function commandExists(command) {
  return states.mantras.commands.hasOwnProperty(command);
}

/**
 *Shows or hides the 'Press Enter Message' Element based on the current state and length of character of user input.
 */
function showPressEnterMessage(show = true) {
  const existingMessage = commandLinebox.querySelector("#command_etc");
  if (show) {
    if (!existingMessage) {
      commandLinebox.insertAdjacentHTML(
        "beforeend",
        `<span id="command_etc" class="text-xs bg-[#2d2d2d] p-1 absolute right-0 top-[-24px] fade-in">Press Enter To Get Result!</span>`
      );
    }
  } else {
    if (existingMessage) {
      existingMessage.classList.remove("fade-in");
      existingMessage.classList.add("fade-out");
      existingMessage.addEventListener("animationend", () => {
        existingMessage.remove();
      });
    }
  }
}

// Higlight the command line input text
function highlightCommandInHelperPanel(command) {
  const highlightedCommandEl = helpPanel.querySelector(
    `li[data-command="${command}"]`
  );
  if (highlightedCommandEl) {
    highlightedCommandEl.classList.add("highlighted_cmd");
  } else {
    clearhighlightedCommandInHelperPanel();
  }
}

function clearhighlightedCommandInHelperPanel() {
  const highlightedCmds = helpPanel.querySelectorAll(".highlighted_cmd");
  highlightedCmds.forEach((el) => {
    el.classList.remove("highlighted_cmd");
  });
}
