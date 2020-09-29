import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        "Sign up": "Sign up",
        PassNotMatch: "Password and confirm password does not match",
        Username: "Username",
        "Display name": "Display name",
        Password: "Password",
        "Confirm Password": "Confirm Password",
        Login: "Login",
        Logout: "Logout",
      },
    },
    tr: {
      translations: {
        "Sign up": "Qeydiyyatdan keç",
        PassNotMatch: "Şifrə və şifrə təkrarı eyni olmalıdır",
        Username: "Istifadəçi adı",
        "Display name": "Görünən ad",
        Password: "Şifrə",
        "Confirm Password": "Şifrəni təsdiqlə",
        Login: "Giriş",
        Logout: "Çıxış",
      },
    },
  },
  fallbackLng: "en",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
});

export default i18n;
