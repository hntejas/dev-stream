import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

export default function AuthPromptModal({ isOpen, closeModal }) {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
    closeModal();
  };
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="auth-form">
        <div>Please login to continue</div>
        <div className="prompt-btn-container">
          <button className="outline-btn" onClick={closeModal}>
            Go Back
          </button>
          <button className="filled-action-btn" onClick={navigateToLogin}>
            Login
          </button>
        </div>
      </div>
    </Modal>
  );
}
