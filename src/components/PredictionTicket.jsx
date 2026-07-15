import { useReducer } from "react";
import { initialTicket, predictionReducer } from "../predictionReducer";

export default function PredictionTicket({ forecast }) {
  const [ticket, dispatch] = useReducer(predictionReducer, initialTicket);
  const saving = ticket.status === "saving";

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "submitted" });

    fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        forecastId: forecast.id,
        outcome: ticket.outcome,
        confidence: ticket.confidence,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Save failed");
        dispatch({ type: "save_succeeded" });
      })
      .catch(() => dispatch({ type: "save_failed" }));
  }

  if (ticket.status === "saved") {
    return (
      <div className="ticket saved-note">
        <p className="ticket-title">Prediction saved</p>
        <p>
          You predicted <strong>{ticket.outcome}</strong> at{" "}
          <strong>{ticket.confidence}%</strong> confidence.
        </p>
        <button type="button" onClick={() => dispatch({ type: "cleared" })}>
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
          <label className={ticket.outcome === "Yes" ? "choice on" : "choice"}>
            <input
              type="radio"
              name="outcome"
              value="Yes"
              checked={ticket.outcome === "Yes"}
              onChange={() =>
                dispatch({ type: "chose_outcome", outcome: "Yes" })
              }
            />
            Yes
          </label>
          <label className={ticket.outcome === "No" ? "choice on" : "choice"}>
            <input
              type="radio"
              name="outcome"
              value="No"
              checked={ticket.outcome === "No"}
              onChange={() =>
                dispatch({ type: "chose_outcome", outcome: "No" })
              }
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
              type: "changed_confidence",
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

      <button type="submit" disabled={ticket.outcome === "" || saving}>
        {saving ? "Saving…" : "Save prediction"}
      </button>
    </form>
  );
}
