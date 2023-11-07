import { Platform } from "react-native";

export const PLATFORM_IOS = Platform.OS === 'ios' ? true : false;
export const STATUSBAR_HEIGHT = PLATFORM_IOS ? 20 : 0;