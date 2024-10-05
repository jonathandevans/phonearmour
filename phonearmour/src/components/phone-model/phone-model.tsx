import { HTMLAttributes } from "react";
import styles from "./phone-model.module.css";

interface PhoneModelProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  colour: "black" | "white" | "stone";
}

export const PhoneModel = ({ className, image, colour, ...props } : PhoneModelProps) => {
  return (
    <div className={`${styles.phoneContainer} ${className}`} {...props}>
      <img className={styles.phone} src={`/${colour}-phone-edges.png`} alt="Phone image" />
      <div className={styles.imageContainer}>
        <img className={styles.image} src={image} alt="Overlaying phone image" />
      </div>
    </div>
  );
};