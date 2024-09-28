import { Button } from "@/components/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h3>Phone<span>Armour.</span></h3>
      <nav className={styles.nav}>
        <Button variant={{ colour: "transparent" }}>Log In</Button>
        <Button variant={{ colour: "transparent" }}>Sign Up</Button>
        <div className={styles.split} />
        <Button variant={{ colour: "red" }}>Create Case <FontAwesomeIcon icon={faArrowRight} className={styles.icon}/></Button>
      </nav>
    </header>
  );
};