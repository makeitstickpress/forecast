import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WatchProvider } from "../WatchContext";
import WatchButton from "./WatchButton";

test("toggles between Watch and Watching", async () => {
  const user = userEvent.setup();
  render(
    <WatchProvider>
      <WatchButton forecastId="battery-tech" />
    </WatchProvider>
  );

  const button = screen.getByRole("button", { name: "Watch" });
  expect(button).toHaveAttribute("aria-pressed", "false");

  await user.click(button);

  expect(
    screen.getByRole("button", { name: /Watching/ })
  ).toHaveAttribute("aria-pressed", "true");
});

test("two buttons for the same forecast stay in sync", async () => {
  const user = userEvent.setup();
  render(
    <WatchProvider>
      <WatchButton forecastId="battery-tech" />
      <WatchButton forecastId="battery-tech" />
    </WatchProvider>
  );

  await user.click(screen.getAllByRole("button")[0]);

  const buttons = screen.getAllByRole("button", { name: /Watching/ });
  expect(buttons).toHaveLength(2);
});
