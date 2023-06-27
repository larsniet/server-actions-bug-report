import { cookies } from "next/headers";

export const metadata = {
  title: "Server actions bug report",
  description: "Server actions bug report",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The code below is giving the error:
  // Cookies can only be modified in a Server Action or Route Handler.
  async function deleteCookie(name: string) {
    "use server";

    try {
      cookies().set({
        name: name,
        value: "",
        expires: new Date("2016-10-05"),
        path: "/",
      });
    } catch (error) {
      console.error(`Error deleting cookie: ${name}`, error);
      throw error;
    }
  }
  await deleteCookie("test");

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
