import { db } from "@/db";
import { notFound } from "next/navigation";
import { Preview } from "./preview";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({searchParams}: PageProps) => {
  const {id} = searchParams;
  if (!id || typeof id !== "string")
    return notFound();

  const configuration = await db.configuration.findUnique({
    where: {id},
  });
  if (!configuration)
    return notFound();

  return (
    <Preview configuration={configuration} />
  );
};
export default Page;