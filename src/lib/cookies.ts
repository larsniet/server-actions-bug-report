"use server";

import { cookies } from "next/headers";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type Organization = {
  organization_id: {
    id: string;
    name: string;
  };
  role_id: {
    name: string;
  } | null;
};

export const deleteCookie = async (name: string) => {
  cookies().set({
    name: name,
    value: "",
    expires: new Date("2016-10-05"),
    path: "/",
  });
};

export const handleOrganizationCookie = async (
  organizations: Organization[]
) => {
  // Check in cookies if organization and role are selected
  let selectedOrganizationId: RequestCookie | string | undefined =
    cookies().get("selectedOrganizationId");

  // If no organization selected, select first one
  if (!selectedOrganizationId && organizations?.length) {
    selectedOrganizationId = organizations[0].organization_id.id as string;
    cookies().set({
      name: "selectedOrganizationId",
      value: selectedOrganizationId,
      httpOnly: true,
    });
  }

  // If organization selected, check if user has access to it
  if (selectedOrganizationId) {
    const organization = organizations?.find(
      (org) => org.organization_id.id === selectedOrganizationId
    );

    // If no access, select first one
    if (!organization) {
      selectedOrganizationId = organizations[0].organization_id.id as string;
      cookies().set({
        name: "selectedOrganizationId",
        value: selectedOrganizationId,
        httpOnly: true,
      });
    }
  }
};
