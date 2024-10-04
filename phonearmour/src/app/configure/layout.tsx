import { ReactNode } from "react";
import styles from "./page.module.css";
import { Steps } from "../../components/steps/steps";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.panel}>
      <Steps />
      {children}
    </div>
  );
};
export default Layout;
