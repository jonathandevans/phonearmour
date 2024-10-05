"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "./actions";

const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const _id = localStorage.getItem("configId");
    if (_id) setConfigId(_id);
  }, []);

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: 2,
    retryDelay: 1500,
  });

  if (data?.success) {
    if (configId) {
      localStorage.removeItem("configId");
      router.push(`/configure/preview?id=${configId}`);
    } else {
      router.push("/");
    }
  }

  return (
    <div className={styles.panel}>
      <FontAwesomeIcon icon={faCircleNotch} className={styles.icon} />
      <h3>Logging you in...</h3>
      <p>You will be redirected automatically.</p>
    </div>
  );
};
export default Page;