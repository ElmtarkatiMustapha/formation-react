export default function Alert({ message, type, onClose }) {
  return (
    <div className={`alert ${type}`}>
      <p>{message}</p>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}