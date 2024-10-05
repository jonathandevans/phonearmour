"use client";

import { useSearchParams } from "next/navigation";
import styles from "./thank-you.module.css";
import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "./actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "@/lib/utils";
import { BASE_PRICE, PRODUCTS_PRICES } from "@/config/products";

export const ThankYou = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });

  // Loading State
  if (data === undefined) {
    return (
      <div className={styles.loading}>
        <FontAwesomeIcon className={styles.icon} icon={faCircleNotch} />
        <h3>Loading your order...</h3>
        <p>This won't take long.</p>
      </div>
    );
  }

  // Waiting for payment
  if (data === false) {
    return (
      <div className={styles.loading}>
        <FontAwesomeIcon className={styles.icon} icon={faCircleNotch} />
        <h3>Verifying your payment</h3>
        <p>This might take a moment.</p>
      </div>
    );
  }

  const { configuration, billingAddress, shippingAddress, amount } = data;
  const { colour } = configuration;

  return (
    <div className={styles.panel}>
      <div className={styles.title}>
        <h4>Thank You!</h4>
        <h1>Your case is on the way!</h1>
        <h5>We've received your order and are now processing it.</h5>
      </div>

      <div className={styles.order}>
        <h5>Order Number</h5>
        <p>{orderId}</p>
      </div>

      <div className={styles.break} />

      <div className={styles.text}>
        <h5>You made a great choice!</h5>
        <p>We at PhoneArmour believe that a phone case doesn't only need to look good, but also last you for the years to come. We offer a 2-year guarantee: If your case isn't of the highest quality, we'll replace it for free.</p>
      </div>

      <div className={styles.addresses}>
        <div>
          <h5>Shipping Address</h5>
          <address>
            <span>{shippingAddress?.name}</span>
            <span>{shippingAddress?.street}</span>
            <span>{shippingAddress?.postalCode} {shippingAddress?.city}</span>
          </address>
        </div>

        <div>
          <h5>Billing Address</h5>
          <address>
            <span>{billingAddress?.name}</span>
            <span>{billingAddress?.street}</span>
            <span>{billingAddress?.postalCode} {billingAddress?.city}</span>
          </address>
        </div>
      </div>

      <div className={styles.pricing}>
        <p>
          <span>Base Price</span> <span>{formatPrice(BASE_PRICE / 100)}</span></p>
        {configuration.finish === "textured" && <p><span>Textured finish</span> <span>+{formatPrice(PRODUCTS_PRICES.finish.textured / 100)}</span></p>}
        {configuration.material === "polycarbonate" && <p><span>Polycarbonate</span> <span>+{formatPrice(PRODUCTS_PRICES.material.polycarbonate / 100)}</span></p>}

        <div className={styles.break} />

        <p className={styles.bold}><span>Order Total</span> <span>{formatPrice(amount)}</span></p>
      </div>
    </div>
  );
};