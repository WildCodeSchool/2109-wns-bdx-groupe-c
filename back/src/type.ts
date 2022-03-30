import AppUser from "./models/AppUser";

export type CustomContext = {
  onSessionCreated: (sessionId: string) => void;
  user: AppUser | null;
};
