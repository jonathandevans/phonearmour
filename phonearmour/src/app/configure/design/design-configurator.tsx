"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SaveConfigArgs, saveConfig as _saveConfig } from "./actions";
import { useRef, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import {
  COLOURS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/options";
import NextImage from "next/image";
import { Rnd } from "react-rnd";
import styles from "./design-configurator.module.css";
import { formatPrice } from "@/lib/utils";
import { BASE_PRICE } from "@/config/products";
import { Button } from "@/components/button/button";

const HandleComponent = () => {
  return (
    <div className={styles.handle} />
  );
};

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}

export const DesignConfigurator = ({ configId, imageDimensions, imageUrl }: DesignConfiguratorProps) => {
  const router = useRouter();

  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfiguration(), _saveConfig(args)]);
    },
    onError: () => {
      // TODO: Error popup
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`)
    }
  });

  const [options, setOptions] = useState<{
    colour: (typeof COLOURS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    colour: COLOURS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const [renderedDimensions, setRenderedDimensions] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4
  });
  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205
  });

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startUpload } = useUploadThing("imageUploader");

  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const saveConfiguration = async () => {
    try {
      const { left: caseLeft, top: caseTop, width, height } = phoneCaseRef.current!.getBoundingClientRect();
      const { left: containerLeft, top: containerTop } = containerRef.current!.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const x = renderedPosition.x - leftOffset;
      const y = renderedPosition.y - topOffset;

      // Create a canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      // Draw cropped user image on the canvas
      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));
      ctx?.drawImage(userImage, x, y, renderedDimensions.width, renderedDimensions.height);
      // Convert canvas to image
      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];
      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      await startUpload([file], { configId })
    } catch (err) {
      // TODO: Error popup
    }
  };

  return (
    <div className={styles.panel}>
      <div ref={containerRef} className={styles.design}>
        <div className={styles.imageContainer}>
          <div
            ref={phoneCaseRef}
            className={styles.phoneCase}
          >
            <NextImage
              alt="Phone image"
              src="/transparent-phone-edges.png"
              fill
              className={styles.phoneImage}
            />
          </div>
          <div className={styles.colour} style={{ background: `var(--${options.colour.tw})` }} />
          <div className={styles.background} />
        </div>

        <Rnd
          className={styles.moveable}
          default={{
            x: 150,
            y: 205,
            height: imageDimensions.height / 4,
            width: imageDimensions.width / 4,
          }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDimensions({
              width: parseInt(ref.style.width.slice(0, -2)),
              height: parseInt(ref.style.height.slice(0, -2)),
            })
            setRenderedPosition({ x, y })
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y })
          }}
        >
          <div className={styles.userImageContainer}>
            <NextImage
              src={imageUrl}
              fill
              alt="Your image"
              className={styles.userImage}
            />
          </div>
        </Rnd>
      </div>

      <div className={styles.customise}>
        <div className={styles.options}>
          <h2>Customise your case</h2>
          <div className={styles.break} />

          <div className={styles.option}>
            <h4>Colour: {options.colour.label}</h4>
            <div className={styles.colourButtons}>
              <button className={`${options.colour.label == "Black" ? styles.highlight : ""} ${styles.blackButton}`} aria-label="black" onClick={() => {
                setOptions((prev) => ({
                  ...prev,
                  colour: COLOURS.find(({ value }) => value === "black")!
                }))
              }}></button>
              <button className={`${options.colour.label == "Blue" ? styles.highlight : ""} ${styles.blueButton}`} aria-label="blue" onClick={() => {
                setOptions((prev) => ({
                  ...prev,
                  colour: COLOURS.find(({ value }) => value === "blue")!
                }))
              }}></button>
              <button className={`${options.colour.label == "Red" ? styles.highlight : ""} ${styles.redButton}`} aria-label="red" onClick={() => {
                setOptions((prev) => ({
                  ...prev,
                  colour: COLOURS.find(({ value }) => value === "red")!
                }))
              }}></button>
            </div>
          </div>

          <div className={styles.option}>
            <h4>Model</h4>
            <select
              value={options.model.value}
              onChange={(e) => {
                const model = MODELS.options.find(({ value }) => value === e.target.value)!;
                setOptions((prev) => ({ ...prev, model }));
              }}
              className={styles.select}
            >
              {MODELS.options.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className={styles.option}>
            <h4>Material</h4>
            <div className={styles.materialButtons}>
              <button className={`${options.material.label == "Silicone" ? styles.highlight : ""} ${styles.materialButton}`} onClick={() => {
                setOptions((prev) => ({
                  ...prev,
                  material: MATERIALS.options.find(({ value }) => value === "silicone")!
                }))
              }
              }>
                <p>Silicone</p>
                <span>
                  {formatPrice(
                    ((MATERIALS.options.find(({ value }) => value === "silicone")?.price ?? 0) -
                    (MATERIALS.options.find(({ value }) => value === options.material.value)?.price ?? 0))
                    / 100
                  )}
                </span>
              </button>
              <button className={`${options.material.label == "Soft Polycarbonate" ? styles.highlight : ""} ${styles.materialButton}`} onClick={() => {
                setOptions((prev) => ({
                  ...prev,
                  material: MATERIALS.options.find(({ value }) => value === "polycarbonate")!
                }))
              }}>
                <p>
                  <span>Soft Polycarbonate</span>
                  <span style={{ fontWeight: "500", color: "var(--stone-600)", fontSize: "0.8rem" }}>Scratch-resistant coating</span>
                </p>
                <span>
                  {formatPrice(
                    ((MATERIALS.options.find(({ value }) => value === "polycarbonate")?.price ?? 0) -
                    (MATERIALS.options.find(({ value }) => value === options.material.value)?.price ?? 0))
                    / 100
                  )}
                </span>
              </button>
            </div>
          </div>

          <div className={styles.option}>
            <h4>Finish</h4>
            <div className={styles.finishButtons}>
              <button className={`${options.finish.label == "Smooth Finish" ? styles.highlight : ""} ${styles.finishButton}`} onClick={() => {
                setOptions((prev) => ({
                  ...prev,
                  finish: FINISHES.options.find(({ value }) => value === "smooth")!
                }))
              }}>
                <p>Smooth Finish</p>
                <span>
                  {formatPrice(
                    ((FINISHES.options.find(({ value }) => value === "smooth")?.price ?? 0) -
                    (FINISHES.options.find(({ value }) => value === options.finish.value)?.price ?? 0))
                    / 100
                  )}
                </span>
              </button>
              <button className={`${options.finish.label == "Textured Finish" ? styles.highlight : ""} ${styles.finishButton}`} onClick={() => {
                setOptions((prev) => ({
                  ...prev,
                  finish: FINISHES.options.find(({ value }) => value === "textured")!
                }))
              }}>
                <p>
                  <span>Textured Finish</span>
                  <span style={{ fontWeight: "500", color: "var(--stone-600)", fontSize: "0.8rem" }}>Soft grippy texture</span>
                </p>
                <span>
                  {formatPrice(
                    ((FINISHES.options.find(({ value }) => value === "textured")?.price ?? 0) -
                    (FINISHES.options.find(({ value }) => value === options.finish.value)?.price ?? 0))
                    / 100
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.checkout}>
          <h3>Total: {formatPrice(
            (BASE_PRICE + options.material.price + options.finish.price) / 100
          )}</h3>

          <Button variant={{ colour: "red" }} onClick={() => saveConfig({
                configId, colour: options.colour.value, finish: options.finish.value, material: options.material.value, model: options.model.value,
              })}>
            {isPending ? "Saving..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}; 