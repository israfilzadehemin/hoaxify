import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getHoaxes } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import HoaxView from "./HoaxView";
import Spinner from "./Spinner";

const HoaxFeed = (props) => {
  const [hoaxPage, setHoaxPage] = useState({
    content: [],
    last: true,
    number: 0,
  });

  const { username } = useParams();

  useEffect(() => {
    loadHoaxes();
  }, []);

  const loadHoaxes = async (page) => {
    try {
      const resp = await getHoaxes(username, page);
      setHoaxPage((prevPage) => ({
        ...resp.data,
        content: [...prevPage.content, ...resp.data.content],
      }));
    } catch (err) {}
  };

  const { t } = useTranslation();

  const path = username
    ? `/api/1.0/users/${username}/hoaxes?current=`
    : "/api/1.0/hoaxes?current=";
  const pendingApiCall = useApiProgress("get", path);

  const { content, last, number } = hoaxPage;
  if (content.length === 0) {
    return (
      <div className="alert alert-danger text-center font-weight-bold">
        {pendingApiCall ? <Spinner /> : t("NoHoax")}
      </div>
    );
  }

  return (
    <div>
      {content.map((hoax) => {
        return <HoaxView key={hoax.id} hoax={hoax} />;
      })}
      {!last && (
        <div
          className="alert alert-primary text-center font-weight-bold"
          style={{ cursor: !pendingApiCall ? "pointer" : "not-allowed" }}
          onClick={!pendingApiCall ? () => loadHoaxes(number + 1) : () => {}}
        >
          {pendingApiCall ? <Spinner /> : t("OldHoaxes")}
        </div>
      )}
    </div>
  );
};

export default HoaxFeed;
