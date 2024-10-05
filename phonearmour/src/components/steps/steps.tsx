"use client";

import styles from "./steps.module.css";
import { usePathname } from "next/navigation";

const STEPS = [
  {
    name: "Step 1: Add image",
    description: "Choose an image for your case",
    url: "/upload",
    image: "/upload-step.svg",
  },
  {
    name: "Step 2: Customise design",
    description: "Make the case yours",
    url: "/design",
    image: "/customise-step.svg",
  },
  {
    name: "Step 3: Summary",
    description: "Review design before purchase",
    url: "/preview",
    image: "/delivery-step.svg",
  },
];

export const Steps = () => {
  const pathname = usePathname();

  return (
    <ol className={styles.list}>
      {STEPS.map((step, index) => {
        const isCurrent = pathname.endsWith(step.url);
        const isCompleted = STEPS.slice(index + 1).some((step) =>
          pathname.endsWith(step.url)
        );

        return (
          <li key={step.name} className={styles.item}>
            <div>
              <span
                className={`${styles.line} ${
                  isCurrent
                    ? styles.current
                    : isCompleted
                    ? styles.completed
                    : ""
                }`}
                aria-hidden="true"
              />

              <span className={styles.content}>
                <span className={styles.image}>
                  <img src={step.image} />
                </span>
                <span className={styles.text}>
                  <span className={`${styles.title} ${isCompleted ? styles.completed : ""}`}>{step.name}</span>
                  <span>{step.description}</span>
                </span>
              </span>

              {index !== 0 ? (
                <div className={styles.arrow}>
                  <svg
                    viewBox="0 0 12 82"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0.5 0V31L10.5 41L0.5 51V82"
                      stroke="currentcolor"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
