export default function Toast() {
  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div
        id="liveToast"
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
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
