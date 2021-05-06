import "./modal.css";

export default function Modal({ children, isOpen, closeModal }) {
  const modalClickHandler = (e) => {
    if (e.target == e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div
      className={!!isOpen ? "modal open" : "modal"}
      onClick={modalClickHandler}
    >
      {children}
    </div>
  );
}
