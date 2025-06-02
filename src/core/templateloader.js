//  # Fetches and converts <template> to DOM
import { states } from "./state.js";
import { addDatasetToTopElement } from "../utils/helpers.js";

export async function loadTemplate(command) {
  const templatePath = states.mantras.commands[command]?.html;
  if (!templatePath) return null;

  try {
    const response = await fetch(templatePath);
    if (!response.ok) {
      throw new Error(`Template not found: ${templatePath}`);
    }
    const htmlText = await response.text();
    return convertHTMLToElement(htmlText, command);
  } catch (err) {
    console.error("Error loading template:", err);
  }
}

/**
 * Converts a template string into a DOM element.
 */
function convertHTMLToElement(htmlString, command) {
  const temp = document.createElement("div");
  temp.innerHTML = htmlString.trim();
  const template = temp.querySelector("template");

  if (!template) {
    throw new Error("No <template> tag found in HTML string");
  }

  const fragment = template.content.cloneNode(true);
  return addDatasetToTopElement(fragment, command);
}
