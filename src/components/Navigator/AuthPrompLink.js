import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../store/user";
import AuthPromptModal from "../Auth/AuthPromptModal";

export default function AuthPromptLink({ children, ...props }) {
  const { user } = useUser();
  const [modalOpen, setModalOpen] = useState(false);

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  if (!user.isLoggedIn) {
    return (
      <>
        <AuthPromptModal closeModal={closeModalHandler} isOpen={modalOpen} />
        <div className={props.className} onClick={() => setModalOpen(true)}>
          {children}
        </div>
      </>
    );
  } else {
    return <NavLink {...props}>{children}</NavLink>;
  }
}
