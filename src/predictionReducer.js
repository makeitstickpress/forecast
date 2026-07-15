// Chapter 16: every rule for updating the prediction ticket, in one function,
// written as one if-branch per event just like the book's ticketReducer.
export const initialTicket = {
  outcome: "",
  confidence: 50,
  status: "editing", // "editing" | "saving" | "saved" | "failed"
};

export function predictionReducer(ticket, action) {
  if (action.type === "chose_outcome") {
    return { ...ticket, outcome: action.outcome, status: "editing" };
  }

  if (action.type === "changed_confidence") {
    return { ...ticket, confidence: action.confidence, status: "editing" };
  }

  if (action.type === "submitted") {
    return { ...ticket, status: "saving" };
  }

  if (action.type === "save_succeeded") {
    return { ...ticket, status: "saved" };
  }

  if (action.type === "save_failed") {
    return { ...ticket, status: "failed" };
  }

  if (action.type === "cleared") {
    return initialTicket;
  }

  return ticket;
}
