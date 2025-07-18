import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isFoundingMember?: boolean;
      purchasedAt?: Date | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }
}