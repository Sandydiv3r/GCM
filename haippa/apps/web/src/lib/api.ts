import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function apiError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) return apiError(error.errors.map((e) => e.message).join(", "), 400);
  if (error instanceof Error) {
    if (error.message === "UNAUTHORIZED") return apiError("Unauthorized", 401);
    if (error.message === "FORBIDDEN")    return apiError("Forbidden", 403);
    if (error.message === "NOT_FOUND")    return apiError("Not found", 404);
  }
  console.error(error);
  return apiError("Internal server error", 500);
}
