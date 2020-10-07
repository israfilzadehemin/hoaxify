import React, { useState } from "react";
import ProfileImageWithDefault from "../components/ProfileImageWithDefault";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { deleteHoax } from "../api/apiCalls";
import Modal from "../components/Modal";
import { useApiProgress } from "../shared/ApiProgress";

const HoaxView = (props) => {
  const { hoax, onDeleteHoax } = props;
  const { user, content, timestamp, fileAttachmentVM, id } = hoax;
  const loggedInUser = useSelector((store) => store.username);
  const { username, displayName, image } = user;
  const [modalVisible, setModalVisible] = useState(false);

  const pendingApiCall = useApiProgress("delete", `/api/1.0/hoaxes/${id}`);

  const { i18n } = useTranslation();

  const ownedByLoggedInUser = loggedInUser === username;
  const formatted = format(timestamp, i18n.language);

  const onClickDelete = async () => {
    await deleteHoax(id);
    onDeleteHoax(id);
  };

  const onClickCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="card p-1 mb-2">
        <div className="d-flex">
          <ProfileImageWithDefault
            image={image}
            width="35"
            height="35"
            className="rounded-circle"
          />
          <div className="flex-fill pl-2">
            <Link
              to={`/user/${username}`}
              className="nav-link d-flex justify-content-between"
            >
              <h6 className="">
                {displayName}@{username}
              </h6>
              <span>-</span>
              <span>{formatted}</span>
            </Link>
          </div>
          {ownedByLoggedInUser && (
            <button
              className="btn text-danger font-weight-bold py-0 px-2"
              style={{ lineHeight: "0" }}
              onClick={() => {
                setModalVisible(true);
              }}
            >
              X
            </button>
          )}
        </div>
        <div className="pl-5">{content}</div>
        {fileAttachmentVM && (
          <div className="text-center">
            {fileAttachmentVM.fileType.startsWith("image") ? (
              <img
                src={"images/attachment/" + fileAttachmentVM.name}
                className="img-fluid img-thumbnail"
                alt="content"
                style={{ width: "100%" }}
              />
            ) : (
              <strong>Unknown attachment</strong>
            )}
          </div>
        )}
      </div>
      <Modal
        content={content}
        visible={modalVisible}
        onClickCancel={onClickCancel}
        onClickOk={onClickDelete}
        pendingApiCall={pendingApiCall}
      />
    </>
  );
};

export default HoaxView;
