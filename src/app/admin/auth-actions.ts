"use server";

import { redirect } from "next/navigation";
import { checkPassword, endSession, startSession } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Enter your password." };

  if (!process.env.ADMIN_PASSWORD_HASH) {
    return { error: "No admin password is set. Run `npm run admin:password` and restart the server." };
  }
  if (!checkPassword(password)) {
    return { error: "Incorrect password." };
  }

  await startSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}
