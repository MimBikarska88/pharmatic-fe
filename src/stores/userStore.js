import { createStore } from "zustand";
import { roleType } from "../utils/roleTypes";

const initialStore = {
  role: roleType.guest,

  Admin: {},
  Customer: {},
  SoleProprietor: {},
  Organization: {},
};
export const useUserStore = createStore((set) => ({
  ...initialStore,
  setRole: (newRole) => set((newRole) => ({ role: newRole })),
}));
