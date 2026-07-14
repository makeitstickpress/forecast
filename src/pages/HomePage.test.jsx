import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { WatchProvider } from "../WatchContext";
import HomePage from "./HomePage";

function renderHome() {
  return render(
    <WatchProvider>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </WatchProvider>
  );
}

test("shows the loading state, then the forecasts", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      {
        id: "mars-orbit",
        category: "Space",
        question: "Will a crewed mission orbit Mars before 2035?",
        yes: 42,
        no: 58,
        predictions: "12,405",
        status: "open",
      },
    ],
  });

  renderHome();

  expect(screen.getByLabelText("Loading forecasts")).toBeInTheDocument();

  expect(
    await screen.findByText("Will a crewed mission orbit Mars before 2035?")
  ).toBeInTheDocument();
  expect(screen.queryByLabelText("Loading forecasts")).not.toBeInTheDocument();
});

test("shows the error state when the request fails", async () => {
  fetch.mockRejectedValueOnce(new Error("network down"));

  renderHome();

  expect(
    await screen.findByText("The forecasts could not be loaded.")
  ).toBeInTheDocument();
});
