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
  async function setCookie() {
    "use server";

    cookies().set({
      name: "testCookie",
      value: "testValue",
      httpOnly: true,
    });
  }
  await setCookie();

  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
