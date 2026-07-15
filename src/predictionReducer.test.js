import { initialTicket, predictionReducer } from "./predictionReducer";

test("choosing an outcome keeps the rest of the ticket", () => {
  const next = predictionReducer(initialTicket, {
    type: "chose_outcome",
    outcome: "Yes",
  });

  expect(next.outcome).toBe("Yes");
  expect(next.confidence).toBe(50);
  expect(next.status).toBe("editing");
});

test("a full submit cycle: editing, saving, saved", () => {
  let ticket = predictionReducer(initialTicket, {
    type: "chose_outcome",
    outcome: "No",
  });
  ticket = predictionReducer(ticket, {
    type: "changed_confidence",
    confidence: 75,
  });
  ticket = predictionReducer(ticket, { type: "submitted" });
  expect(ticket.status).toBe("saving");

  ticket = predictionReducer(ticket, { type: "save_succeeded" });
  expect(ticket.status).toBe("saved");
  expect(ticket.outcome).toBe("No");
  expect(ticket.confidence).toBe(75);
});

test("cleared returns the initial ticket", () => {
  const dirty = { outcome: "Yes", confidence: 90, status: "saved" };
  expect(predictionReducer(dirty, { type: "cleared" })).toEqual(initialTicket);
});

test("an unknown action leaves the ticket unchanged", () => {
  const ticket = { outcome: "Yes", confidence: 90, status: "editing" };
  expect(predictionReducer(ticket, { type: "bogus" })).toBe(ticket);
});
