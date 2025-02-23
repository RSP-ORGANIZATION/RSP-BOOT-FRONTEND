export default function Toast({ position = "top-0 end-0" }) {
  return (
    <div className={`toast-container position-fixed ${position} p-3`}>
      <div
        id="liveToast"
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ borderColor: "black" }}
      >
        <div className="toast-header">
          <strong className="me-auto">This message is from Epic Eats</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body" style={{ color: "black" }}>
          Epic Eats
        </div>
      </div>
    </div>
  );
}
