import { Dispatch, SetStateAction } from "react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

import styles from "./login-modal.module.css";

const LoginModal = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
      <div className={styles.popup}>
        <h2>Log in to continue</h2>
        <p><span>Your configuration was saved!</span> Please login or create an account to complete your purchase.</p>
        <div className={styles.buttons}>
          <LoginLink className={styles.login}>Login</LoginLink>
          <RegisterLink className={styles.register}>Register</RegisterLink>
        </div>
      </div>
    </>
  );
};
export default LoginModal;