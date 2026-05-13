import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@haippa/db";
import { apiSuccess, handleApiError } from "@/lib/api";

const schema = z.object({
  email:           z.string().email(),
  fullName:        z.string().min(2),
  country:         z.string().min(2),
  city:            z.string().optional(),
  bio:             z.string().min(50, "Please write at least 50 characters about yourself"),
  portfolioUrls:   z.array(z.string().url()).min(1, "At least one portfolio URL required"),
  instagramHandle: z.string().optional(),
  idDocumentUrl:   z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const data = schema.parse(await req.json());
    const application = await prisma.artistApplication.create({ data: { ...data, status: "PENDING" } });
    return apiSuccess({ applicationId: application.id }, 201);
  } catch (err) {
    return handleApiError(err);
  }
}
