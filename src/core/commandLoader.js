// Load Commands
import { states } from "./state";

export async function loadMantras(mantrasPath = "./../../mantra/mantras.json") {
  try {
    const response = await fetch(mantrasPath);
    if (!response.ok) {
      throw new Error(`Failed to load mantras.json from ${mantrasPath}`);
    }
    const data = await response.json();
    states.mantras = data;
    return data || {};
  } catch (err) {
    console.error("Error loading mantras.json:", err);
    return null;
  }
}
