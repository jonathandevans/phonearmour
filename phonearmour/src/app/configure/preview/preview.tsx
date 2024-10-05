"use client";

import { PhoneModel } from "@/components/phone-model/phone-model";
import styles from "./preview.module.css";
import { useRouter } from "next/navigation";
import { Configuration } from "@prisma/client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";
import { COLOURS, MODELS } from "@/validators/options";
import { BASE_PRICE, PRODUCTS_PRICES } from "@/config/products";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "./actions";
import LoginModal from "@/components/login-modal/login-modal";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const Preview = ({configuration}: {configuration: Configuration}) => {
  const router = useRouter();

  const { id } = configuration;
  const { user } = useKindeBrowserClient();
  const [ isLoginModalOpen, setIsLoginModalOpen ] = useState<boolean>(false);

  const { colour, model, finish, material } = configuration;
  const tw = COLOURS.find((supportedColour) => supportedColour.value === colour)?.tw;

  const {label: modelLabel} = MODELS.options.find(({value}) => value === model)!;

  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate") totalPrice += PRODUCTS_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCTS_PRICES.finish.textured;

  const {mutate: createPaymentSession} = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({url}) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrieve payment URL")
    },
    onError: () => {
      // TODO: error popup
    }
  });

  const handleCheckout = () => {
    if (user) {
      createPaymentSession({configId: id});
    } else {
      localStorage.setItem("configId", id);
      setIsLoginModalOpen(true)
    }
  };

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className={styles.preview}>
        <div>
          <PhoneModel image={configuration.croppedImageUrl!} colour="stone" style={{ background: `var(--${tw})` }} />
        </div>

        <div className={styles.text}>
          <h1>Your {modelLabel} Case</h1>
          <p className={styles.subtext}>In stock and ready to ship</p>
          
          <div className={styles.break} />

          <div className={styles.attri}>
            <div className={styles.list}>
              <h3>Highlights</h3>
              <ul>
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ul>
            </div>

            <div className={styles.list}>
              <h3>Materials</h3>
              <ul>
                <li>High-quality, durable material</li>
                <li>Scratch and fingerprint resistant coating</li>
              </ul>
            </div>
          </div>

          <div className={styles.pricing}>
            <p>
              <span>Base Price</span> <span>{formatPrice(BASE_PRICE / 100)}</span></p>
            {finish === "textured" && <p><span>Textured finish</span> <span>+{formatPrice(PRODUCTS_PRICES.finish.textured / 100)}</span></p>}
            {material === "polycarbonate" && <p><span>Polycarbonate</span> <span>+{formatPrice(PRODUCTS_PRICES.material.polycarbonate / 100)}</span></p>}

            <div className={styles.break} />

            <p className={styles.bold}><span>Order Total</span> <span>{formatPrice(totalPrice / 100)}</span></p>
          </div>

          <Button className={styles.checkout} variant={{ colour: "red" }} onClick={handleCheckout}>
            Checkout
            <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
          </Button>
        </div>
      </div>
    </>
  );
};