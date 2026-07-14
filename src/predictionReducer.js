// Chapter 16: every rule for updating the prediction ticket, in one function.
export const initialTicket = {
  choice: "",
  confidence: 50,
  status: "editing", // "editing" | "saving" | "saved" | "failed"
};

export function predictionReducer(state, action) {
  switch (action.type) {
    case "chose_side":
      return { ...state, choice: action.choice, status: "editing" };
    case "set_confidence":
      return { ...state, confidence: action.confidence, status: "editing" };
    case "submitted":
      return { ...state, status: "saving" };
    case "save_succeeded":
      return { ...state, status: "saved" };
    case "save_failed":
      return { ...state, status: "failed" };
    case "reset":
      return initialTicket;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
