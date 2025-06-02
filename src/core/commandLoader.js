// Load Commands
import { states } from "./state";
import { withBase } from "../utils/helpers";

export async function loadMantras(
  mantrasPath = withBase("/mantra/mantras.json")
) {
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
