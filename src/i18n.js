import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { register } from "timeago.js";

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
        Users: "Users",
        Next: "Next",
        Prev: "Prev",
        Error: "Error!",
        usernotfound: "User not found",
        Edit: "Edit",
        ChangeDisplayName: "Change display name",
        Save: "Save",
        Cancel: "Cancel",
        MyProfile: "My profile",
        NoHoax: "There are no hoaxes",
        OldHoaxes: "Load old hoaxes",
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
        Users: "İstifadəçilər",
        Next: "Sonrakı>",
        Prev: "<Əvvəlki",
        Error: "Səhv!",
        usernotfound: "İstifadəçi tapılmadı",
        Edit: "Dəyişdir",
        ChangeDisplayName: "Görünən adı dəyişdir",
        Save: "Yadda saxla",
        Cancel: "Ləğv et",
        MyProfile: "Hesabım",
        NoHoax: "Hələki heç bir hoax paylaşılmayıb",
        OldHoaxes: "Əvvəlki hoaxları yüklə...",
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

const timeageAZ = (number, index) => {
  return [
    ["az əvvəl", "indicə"],
    ["%s saniyə əvvəl", "%s saniyə içində"],
    ["1 dəqiqə əvvəl", "1 dəqiqə içində"],
    ["%s dəqiqə əvvəl", "%s dəqiqə içində"],
    ["1 saat əvvəl", "1 saat içində"],
    ["%s saat əvvəl", "%s saat içində"],
    ["1 gün əvvəl", "1 gün içində"],
    ["%s gün əvvəl", "%s gün içində"],
    ["1 həftə əvvəl", "1 həftə içində"],
    ["%s həftə əvvəl", "%s həftə içində"],
    ["1 ay əvvəl", "1 ay içində"],
    ["%s ay əvvəl", "%s ay içində"],
    ["1 il əvvəl", "1 il içində"],
    ["%s il əvvəl", "%s il içində"],
  ][index];
};

register("tr", timeageAZ);

export default i18n;
