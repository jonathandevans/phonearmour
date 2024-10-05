"use server";

import { db } from "../../db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Check if the user exists in Kinde
  if (!user?.id || !user.email) {
    throw new Error("Invalid user data");
    // return { success: false };
  }

  // Check whether the user is in our database
  const existingUser = await db.user.findFirst({
    where: { id: user.id },
  });

  // Add the user to out database
  if (!existingUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    });
  }

  return { success: true };
};
