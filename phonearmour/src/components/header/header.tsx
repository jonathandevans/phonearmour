import { Button } from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const Header = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <header className={styles.header}>
      <Link href="/"><h3>Phone<span>Armour.</span></h3></Link>
      <nav className={styles.nav}>
        {user ? <>
          {isAdmin ? <>
            <Button href="/dashboard" variant={{ colour: "transparent" }}>Dashboard ✨</Button>
          </> : null}
          <Button href="/api/auth/logout" variant={{ colour: "transparent" }}>Sign Out</Button>
        </> : <>
          <Button href="/api/auth/login" variant={{ colour: "transparent" }}>Login</Button>
          <Button href="/api/auth/register" variant={{ colour: "transparent" }}>Sign Up</Button>
        </>}
        <div className={styles.split} />
        <Button href="/configure/upload" variant={{ colour: "red" }}>Create Case <FontAwesomeIcon icon={faArrowRight} className={styles.icon}/></Button>
      </nav>
    </header>
  );
};