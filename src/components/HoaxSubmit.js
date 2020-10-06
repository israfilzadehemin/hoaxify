import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import { postHoax, postHoaxAttachment } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "../components/ButtonWithProgress";
import Input from "../components/Input";
import AutoUploadImage from "./AutoUploadImage";

const HoaxSubmit = () => {
  const { image } = useSelector((store) => ({ image: store.image }));
  const [focused, setFocused] = useState(false);
  const [hoax, setHoax] = useState("");
  const [errors, setErrors] = useState({});
  const [newImage, setNewImage] = useState();
  const [attachmentId, setAttachmentId] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (!focused) {
      setHoax("");
      setErrors({});
      setNewImage();
      setAttachmentId(undefined);
    }
  }, [focused]);

  useEffect(() => {
    setErrors({});
  }, [hoax]);

  const pendingApiCall = useApiProgress("post", "/api/1.0/hoaxes");
  const pendingFileUpload = useApiProgress("post", "/api/1.0/hoax-attachment");

  const onClickHoaxify = async () => {
    const body = {
      content: hoax,
      attachmentId,
    };

    try {
      await postHoax(body);
      setFocused(false);
    } catch (err) {
      if (err.response.data.errors) {
        setErrors(err.response.data.errors[0]);
      }
    }
  };

  const onChangeFile = (event) => {
    if (event.target.files.length < 1) {
      return;
    }
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
      uploadFile(file);
    };
    fileReader.readAsDataURL(file);
  };

  const uploadFile = async (file) => {
    const attachment = new FormData();
    attachment.append("file", file);
    const resp = await postHoaxAttachment(attachment);
    setAttachmentId(resp.data.id);
  };

  let textAreaClass = "form-control";
  if (errors.defaultMessage) {
    textAreaClass += " is-invalid";
  }

  return (
    <div className="card p-1 flex-row">
      <ProfileImageWithDefault
        width="35"
        height="35"
        className="rounded-circle mr-2"
      />
      <div className="flex-fill">
        <textarea
          className={textAreaClass}
          rows={focused ? "3" : "1"}
          onFocus={() => setFocused(true)}
          onChange={(event) => setHoax(event.target.value)}
          value={hoax}
        ></textarea>
        <div className="invalid-feedback">{errors.defaultMessage}</div>
        {focused && (
          <>
            {!newImage && <Input type="file" onChangeInput={onChangeFile} />}
            {newImage && (
              <AutoUploadImage image={newImage} uploading={pendingFileUpload} />
            )}
            <div className="text-right mt-1">
              <ButtonWithProgress
                className="btn btn-success col-3"
                onClick={onClickHoaxify}
                pendingApiCall={pendingApiCall}
                disabled={(pendingApiCall, pendingFileUpload)}
                text="Hoaxify"
              >
                Hoaxify
              </ButtonWithProgress>
              <button
                className="btn btn-danger d-inline-flex ml-1"
                onClick={() => {
                  setFocused(false);
                }}
                disabled={(pendingApiCall, pendingFileUpload)}
              >
                {t("Cancel")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HoaxSubmit;
