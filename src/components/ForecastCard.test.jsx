import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { WatchProvider } from "../WatchContext";
import ForecastCard from "./ForecastCard";

const forecast = {
  id: "mars-orbit",
  category: "Space",
  question: "Will a crewed mission orbit Mars before 2035?",
  yes: 42,
  no: 58,
  predictions: "12,405",
  status: "open",
};

function renderCard() {
  return render(
    <WatchProvider>
      <MemoryRouter>
        <ForecastCard forecast={forecast} />
      </MemoryRouter>
    </WatchProvider>
  );
}

test("shows the question, odds, and prediction count", () => {
  renderCard();

  expect(
    screen.getByRole("link", {
      name: "Will a crewed mission orbit Mars before 2035?",
    })
  ).toBeInTheDocument();
  expect(screen.getByText("42% Yes")).toBeInTheDocument();
  expect(screen.getByText("58% No")).toBeInTheDocument();
  expect(screen.getByText("12,405 predictions")).toBeInTheDocument();
});

test("links to the forecast's own page", () => {
  renderCard();

  expect(
    screen.getByRole("link", {
      name: "Will a crewed mission orbit Mars before 2035?",
    })
  ).toHaveAttribute("href", "/forecast/mars-orbit");
});
