import { Inter } from "next/font/google";
import classNames from "classnames";
import { deleteCookie, handleOrganizationCookie } from "@/lib/cookies";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Server actions bug report",
  description: "Server actions bug report",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyClass = classNames("h-full", inter.className);

  // Example organizations
  const organizations = [
    {
      organization_id: {
        id: "1",
        name: "Organization 1",
      },
      role_id: {
        name: "Role 1",
      },
    },
  ];

  // If user is not connected to any organization, remove cookie (if it exists) and redirect to 404
  if (organizations.length === 0) {
    await deleteCookie("selectedOrganizationId");
    notFound();
  }

  // If user is connected to at least one organization, handle cookie
  await handleOrganizationCookie(organizations);

  return (
    <html lang="en" className="h-full bg-white">
      <body className={bodyClass}>{children}</body>
    </html>
  );
}
