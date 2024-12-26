import { Platform, NativeModules } from 'react-native'

type TranslationFile = { [key: string]: string };

const DEFAULT_LANG = "en";

const DEVICE_LANG: string =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ?? (NativeModules.SettingsManager.settings.AppleLanguages[0] ?? "sk_SK")
    : NativeModules.I18nManager.localeIdentifier ?? "sk_SK";

export const getDeviceLang = (): string => {
  switch (DEVICE_LANG.toLowerCase()) {
    case "cz_cz": return "cz";
    case "sk_sk": return "sk";
    case "de_de": return "de";
    default: return "en";
  }
}

export const _t = (word: string): string => {
  return word;
}
