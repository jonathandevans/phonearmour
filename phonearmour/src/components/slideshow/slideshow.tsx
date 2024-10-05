"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import styles from "./slideshow.module.css";
import { PhoneModel } from "../phone-model/phone-model";

const EXAMPLES = [
  "/example-1.jpg",
  "/example-2.jpg",
  "/example-3.jpg",
  "/example-4.jpg",
  "/example-5.jpg",
  "/example-6.jpg",
];
const ANIMATION_DELAYS = ["0.2s", "0.3s", "0.4s", "0.5s", "0.6s"];

/**
 * Splits an array into a specified number of parts, distributing the elements as evenly as possible.
 *
 * @template T - The type of elements in the array.
 * @param {Array<T>} array - The array to be split.
 * @param {number} numParts - The number of parts to split the array into.
 * @returns {Array<Array<T>>} A new array containing the split parts.
 */
function splitArray<T>(array: Array<T>, numParts: number): Array<Array<T>> {
  const result: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) result[index] = [];
    result[index].push(array[i]);
  }
  return result;
}

interface ExampleProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
};

const Example = ({ image, className, ...props } : ExampleProps) => {
  const delay = ANIMATION_DELAYS[Math.floor(Math.random() * ANIMATION_DELAYS.length)];

  return (
    <div className={`${styles.example} ${className}`} style={{ animationDelay: delay }}>
      <PhoneModel image={image} colour="white" />
    </div>
  );
};

interface ColumnProps {
  examples: string[];
  className?: string;
  speed: number;
};

const Column = ({ examples, className = "", speed } : ColumnProps) => {
  const [height, setHeight] = useState<number>(0);
  const column = useRef<HTMLDivElement | null>(null);
  const duration = `${height * speed}ms`;

  useEffect(() => {
    if (!column.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setHeight(column.current?.offsetHeight ?? 0);
    });
    resizeObserver.observe((column.current));

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={column} className={`${className} ${styles.column}`} style={{ "--column-duration": duration } as React.CSSProperties}>
      {examples.concat(examples).map((image, _index) => (
        <Example key={_index} image={image} />
      ))}
    </div>
  );
};

export const Slideshow = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const [ col1, col2, tempCol ] = splitArray(EXAMPLES, 3);
  const col3 = splitArray(tempCol, 2);

  return (
    <div ref={containerRef} className={styles.container}>
      {isInView ? <>
        <Column examples={[...col1, ...col3.flat(), ...col2]} className={styles.col2} speed={10} />
        <Column examples={[...col2, ...col3[1]]} className={styles.col1} speed={15} />
        <Column examples={col3.flat()} speed={12.5} />
      </> : null}
      <div className={styles.gradTop} />
      <div className={styles.gradBottom} />
    </div>
  );
};
