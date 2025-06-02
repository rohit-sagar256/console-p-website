"use strict";

import { states } from "./core/state";
import { loadMantras } from "./core/commandLoader";
import {
  debounce,
  addDatasetToTopElement,
  areAllCommandsValid,
  commandExists,
} from "./utils/helpers";
import {
  updateCurrentCommands,
  validateCommandsWithDelay,
} from "./core/comandProcessor";

import {
  userInput,
  terminalOutput,
  helpPanel,
  commandLinebox,
} from "./ui/elements";

import {
  clearhighlightedCommandInHelperPanel,
  highlightCommandInHelperPanel,
  clearCommandContent,
} from "./utils/helperUi";

loadMantras().then((mantras) => {
  if (!mantras) return;
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
});

let typingTimeout;

userInput.addEventListener("keydown", handleEnterKey);

userInput.addEventListener(
  "input",
  debounce((e) => {
    const inputValue = e.target.value.trim();
    updateCurrentCommands(inputValue);
    showPressEnterMessage(false);
    highlightCommandInHelperPanel();
    clearCommandContent();
    validateCommandsWithDelay(inputValue, () => {
      showPressEnterMessage(true);
    });
  }, 300)
);

function handleEnterKey(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const inputValue = e.target.value.trim();
    showPressEnterMessage(false);
    updateCurrentCommands(inputValue);
    showContentBasedOnCommand();
  }
}

function showContentBasedOnCommand() {
  clearCommandContent();

  if (states.currentCommand.length > 0) {
    states.currentCommand.forEach((command) => {
      if (states.mantras.commands[command]) {
        if (!terminalOutput.querySelector(`[data-command="${command}"]`)) {
          loadTemplate(command).then((template) => {
            const f = htmlStringToFragmentFromTemplate(template);
            const uf = addDatasetToTopElement(f, command);
            const tempDiv = document.createElement("div");
            tempDiv.appendChild(uf);
            const newEl = tempDiv.firstElementChild;
            terminalOutput.appendChild(newEl);
            newEl.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }
      }
    });
  } else {
    terminalOutput.innerHTML = "";
  }
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

async function loadTemplate(command) {
  const templatePath = states.mantras.commands[command]?.html;

  try {
    const response = await fetch(templatePath);
    if (!response.ok) {
      throw new Error(`Template not found: ${templatePath}`);
    }
    return await response.text();
  } catch (err) {
    console.error("Error loading template:", err);
  }
}

function htmlStringToFragmentFromTemplate(htmlString) {
  const temp = document.createElement("div");
  temp.innerHTML = htmlString.trim();

  const template = temp.querySelector("template");
  if (!template) {
    throw new Error("No <template> tag found in HTML string");
  }

  return template.content.cloneNode(true);
}
