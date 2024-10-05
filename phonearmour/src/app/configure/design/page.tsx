import { notFound } from "next/navigation";
import { db } from "@/db";
import { DesignConfigurator } from "./design-configurator";
import styles from "./page.module.css";

const Page = async ({ searchParams }: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) => {
  const {id} = searchParams;

  if (!id || typeof id !== "string") return notFound();

  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration) return notFound();

  const {imageUrl, width, height} = configuration;

  return (
    <DesignConfigurator configId={configuration.id} imageDimensions={{width, height}} imageUrl={imageUrl} />
  );
};
export default Page;