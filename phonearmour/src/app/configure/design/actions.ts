"use server";

import { db } from "@/db";
import { CaseColour, CaseFinish, CaseMaterial, PhoneModel } from "@prisma/client";

export type SaveConfigArgs = {colour: CaseColour, finish: CaseFinish, material: CaseMaterial, model: PhoneModel, configId: string};

export async function saveConfig({colour, finish, material, model, configId}: SaveConfigArgs) {
  await db.configuration.update({
    where: {id: configId},
    data: {colour, finish, material, model}
  });
}