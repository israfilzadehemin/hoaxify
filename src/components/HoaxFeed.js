import { cleanup } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  getHoaxes,
  getNewHoaxCount,
  getNewHoaxes,
  getOldHoaxes,
} from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import HoaxView from "./HoaxView";
import Spinner from "./Spinner";

const HoaxFeed = (props) => {
  const [hoaxPage, setHoaxPage] = useState({
    content: [],
    last: true,
    number: 0,
  });

  const [newHoaxCount, setNewHoaxCount] = useState(0);

  const { username } = useParams();

  let lastHoaxId = 0;
  let firstHoaxId = 0;
  if (hoaxPage.content.length > 0) {
    firstHoaxId = hoaxPage.content[0].id;
    const lastHoaxIndex = hoaxPage.content.length - 1;
    lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
  }

  useEffect(() => {
    const getCount = async () => {
      const resp = await getNewHoaxCount(firstHoaxId, username);
      setNewHoaxCount(resp.data.count);
    };
    let counter = setInterval(() => {
      getCount();
    }, 3000);

    return function cleanUp() {
      clearInterval(counter);
    };
  }, [firstHoaxId, username]);

  useEffect(() => {
    const loadHoaxes = async (page) => {
      try {
        const resp = await getHoaxes(username, page);
        setHoaxPage((prevPage) => ({
          ...resp.data,
          content: [...prevPage.content, ...resp.data.content],
        }));
      } catch (err) {}
    };
    loadHoaxes();
  }, [username]);

  const loadOldHoaxes = async () => {
    const resp = await getOldHoaxes(lastHoaxId, username);
    setHoaxPage((prevPage) => ({
      ...resp.data,
      content: [...prevPage.content, ...resp.data.content],
    }));
  };

  const loadNewHoaxes = async () => {
    const resp = await getNewHoaxes(firstHoaxId, username);
    console.log(resp);
    setHoaxPage((prevPage) => ({
      ...prevPage,
      content: [...resp.data, ...prevPage.content],
    }));
    setNewHoaxCount(0);
  };

  const { t } = useTranslation();

  const path = username
    ? `/api/1.0/users/${username}/hoaxes?current=`
    : "/api/1.0/hoaxes?current=";

  const oldHoaxPath = username
    ? `/api/1.0/users/${username}/hoaxes/${lastHoaxId}`
    : `/api/1.0/hoaxes/${lastHoaxId}`;

  const newHoaxPath = username
    ? `/api/1.0/users/${username}/hoaxes/${firstHoaxId}?direction=after`
    : `/api/1.0/hoaxes/${firstHoaxId}?direction=after`;

  const initialPendingApiCall = useApiProgress("get", path);
  const loadOldHoaxesProgress = useApiProgress("get", oldHoaxPath);
  const loadNewHoaxesProgress = useApiProgress("get", newHoaxPath);

  const { content, last } = hoaxPage;
  if (content.length === 0) {
    return (
      <div className="alert alert-danger text-center font-weight-bold">
        {initialPendingApiCall ? <Spinner /> : t("NoHoax")}
      </div>
    );
  }

  const onDeleteHoaxSuccess = (id) => {
    setHoaxPage((prevPage) => ({
      ...prevPage,
      content: prevPage.content.filter((hoax) => id !== hoax.id),
    }));
  };

  return (
    <div>
      {newHoaxCount > 0 && (
        <div
          className="alert alert-primary text-center"
          style={{ cursor: loadNewHoaxesProgress ? "not-allowed" : "pointer" }}
          onClick={loadNewHoaxesProgress ? () => {} : loadNewHoaxes}
        >
          {loadNewHoaxesProgress ? <Spinner /> : t("NewHoax")}
        </div>
      )}
      {content.map((hoax) => {
        return (
          <HoaxView
            key={hoax.id}
            hoax={hoax}
            onDeleteHoax={onDeleteHoaxSuccess}
          />
        );
      })}
      {!last && (
        <div
          className="alert alert-primary text-center font-weight-bold"
          style={{ cursor: !loadOldHoaxesProgress ? "pointer" : "not-allowed" }}
          onClick={!loadOldHoaxesProgress ? () => loadOldHoaxes() : () => {}}
        >
          {loadOldHoaxesProgress ? <Spinner /> : t("OldHoaxes")}
        </div>
      )}
    </div>
  );
};

export default HoaxFeed;
