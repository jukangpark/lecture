import { atom } from "recoil";

export const isDarkState = atom({
  key: "isDark",
  default: false,
});

export const userState = atom({
  key: "user",
  default: [],
});
