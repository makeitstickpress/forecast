import { useReducer } from "react";
import { initialTicket, predictionReducer } from "../predictionReducer";

export default function PredictionTicket({ forecast }) {
  const [ticket, dispatch] = useReducer(predictionReducer, initialTicket);
  const saving = ticket.status === "saving";

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "submitted" });
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          forecastId: forecast.id,
          choice: ticket.choice,
          confidence: ticket.confidence,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      dispatch({ type: "save_succeeded" });
    } catch {
      dispatch({ type: "save_failed" });
    }
  }

  if (ticket.status === "saved") {
    return (
      <div className="ticket saved-note">
        <p className="ticket-title">Prediction saved</p>
        <p>
          You predicted <strong>{ticket.choice}</strong> at{" "}
          <strong>{ticket.confidence}%</strong> confidence.
        </p>
        <button type="button" onClick={() => dispatch({ type: "reset" })}>
          Change prediction
        </button>
      </div>
    );
  }

  return (
    <form className="ticket" onSubmit={handleSubmit}>
      <p className="ticket-title">Your prediction</p>

      <fieldset className="choice-group" disabled={saving}>
        <legend>Which way will it go?</legend>
        <div className="choice-row">
          <label className={ticket.choice === "Yes" ? "choice on" : "choice"}>
            <input
              type="radio"
              name="choice"
              value="Yes"
              checked={ticket.choice === "Yes"}
              onChange={() => dispatch({ type: "chose_side", choice: "Yes" })}
            />
            Yes
          </label>
          <label className={ticket.choice === "No" ? "choice on" : "choice"}>
            <input
              type="radio"
              name="choice"
              value="No"
              checked={ticket.choice === "No"}
              onChange={() => dispatch({ type: "chose_side", choice: "No" })}
            />
            No
          </label>
        </div>
      </fieldset>

      <label className="confidence">
        Confidence: <strong>{ticket.confidence}%</strong>
        <input
          type="range"
          min="1"
          max="99"
          value={ticket.confidence}
          disabled={saving}
          onChange={(event) =>
            dispatch({
              type: "set_confidence",
              confidence: Number(event.target.value),
            })
          }
        />
      </label>

      {ticket.status === "failed" && (
        <p className="ticket-error" role="alert">
          Saving failed. Check your connection and try again.
        </p>
      )}

      <button type="submit" disabled={ticket.choice === "" || saving}>
        {saving ? "Saving…" : "Save prediction"}
      </button>
    </form>
  );
}
