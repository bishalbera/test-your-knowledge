import { syncUser } from "@/utils/auth";

export const AuthSync = async () => {
  await syncUser();
  return null;
};
