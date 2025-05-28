"use strict";

import commands from "./commands.js";

const userInput = document.getElementById("userInput");
const terminalContent = document.getElementById("terminal-content");

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const command = this.value;
  }
});
