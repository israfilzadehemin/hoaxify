import React from "react";
import { changeLang } from "../api/apiCalls";
import { useTranslation } from "react-i18next";

const LanguageSelector = (props) => {
  const { i18n } = useTranslation();

  const onChangeLang = (lang) => {
    i18n.changeLanguage(lang);
    changeLang(lang);
  };

  return (
    <div className="container">
      <img
        style={{ cursor: "pointer" }}
        src="https://www.countryflags.io/az/flat/32.png"
        alt="Language flag"
        onClick={() => onChangeLang("tr")}
      />
      <img
        style={{ cursor: "pointer" }}
        src="https://www.countryflags.io/gb/flat/32.png"
        alt="Language flag"
        onClick={() => onChangeLang("en")}
      />
    </div>
  );
};

export default LanguageSelector;
