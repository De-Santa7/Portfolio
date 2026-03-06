import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";
import UploadForm from "@/components/admin/UploadForm";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = verifyToken(
    cookieStore.get(COOKIE_NAME)?.value ?? ""
  );

  return isAuthenticated ? <UploadForm /> : <LoginForm />;
}
