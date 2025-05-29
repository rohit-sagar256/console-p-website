"use strict";

let states = {
  showPressEnterMessage: false,
  showHelpPanel: false,
  showTerminalOutput: false,
  showTerminalContent: false,
  showCommandLinebox: true,
};

const userInput = document.getElementById("userInput");
const terminalContent = document.getElementById("terminal-content");
const terminalOutput = document.getElementById("terminal-output");
const helpPanel = document.querySelector(".help-section");
const commandLinebox = document.querySelector(".command-line");
const terminalOutputWrapper = document.getElementById(
  "terminal-output-wrapper"
);

userInput.addEventListener("input", function (e) {
  const inputValue = e.target.value.trim();

  if (inputValue.length >= 3) {
    if (!states.showPressEnterMessage) {
      states.showPressEnterMessage = true;
      showPressEnterMessage(true);
    }
  } else {
    if (states.showPressEnterMessage) {
      states.showPressEnterMessage = false;
      showPressEnterMessage(false);
    }
  }
});





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
