import {DarkTheme as PaperDarkTheme} from "react-native-paper";
import {DarkTheme as NavigationDarkTheme} from "@react-navigation/native";


export const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {...PaperDarkTheme.colors, ...NavigationDarkTheme.colors},
};
