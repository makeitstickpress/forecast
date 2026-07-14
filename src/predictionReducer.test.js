import { initialTicket, predictionReducer } from "./predictionReducer";

test("choosing a side keeps the rest of the ticket", () => {
  const next = predictionReducer(initialTicket, {
    type: "chose_side",
    choice: "Yes",
  });

  expect(next.choice).toBe("Yes");
  expect(next.confidence).toBe(50);
  expect(next.status).toBe("editing");
});

test("a full submit cycle: editing, saving, saved", () => {
  let state = predictionReducer(initialTicket, {
    type: "chose_side",
    choice: "No",
  });
  state = predictionReducer(state, { type: "set_confidence", confidence: 75 });
  state = predictionReducer(state, { type: "submitted" });
  expect(state.status).toBe("saving");

  state = predictionReducer(state, { type: "save_succeeded" });
  expect(state.status).toBe("saved");
  expect(state.choice).toBe("No");
  expect(state.confidence).toBe(75);
});

test("reset returns the initial ticket", () => {
  const dirty = { choice: "Yes", confidence: 90, status: "saved" };
  expect(predictionReducer(dirty, { type: "reset" })).toEqual(initialTicket);
});

test("unknown actions throw", () => {
  expect(() => predictionReducer(initialTicket, { type: "bogus" })).toThrow();
});
