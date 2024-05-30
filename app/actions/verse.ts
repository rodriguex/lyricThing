"use server";

import { TimedVerse } from "../types";
import prisma from "../utils/prisma";

export async function saveVerse(verse: TimedVerse) {
  return await prisma.timedVerse.create({
    data: verse,
  });
}

export async function updateVerse(id: number, verse: TimedVerse) {
  await prisma.timedVerse.update({
    where: { id },
    data: verse,
  });
}
