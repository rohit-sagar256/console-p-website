alert(
  "Welcome to the terminal! Type your commands below and press Enter to execute them."
);
const userInput = document.getElementById("userInput");
const terminalContent = document.getElementById("terminal-content");

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const command = this.value;

    // Create output for the command
    const outputDiv = document.createElement("div");
    outputDiv.className = "terminal-output";
    outputDiv.textContent = `$ ${command}`;

    // Create new command line
    const newCommandLine = document.createElement("div");
    newCommandLine.className = "command-line";
    newCommandLine.innerHTML = `
                <span class="prompt">rohitsagar.com:</span>
                <input type="text" class="user-input" autofocus>
                <span class="cursor"></span>
            `;

    // Add output and new command line to terminal
    terminalContent.insertBefore(outputDiv, this.parentElement);
    terminalContent.replaceChild(newCommandLine, this.parentElement);

    // Focus on new input
    newCommandLine.querySelector("input").focus();

    // Clear old input
    this.value = "";

    // Scroll to bottom
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }
});
