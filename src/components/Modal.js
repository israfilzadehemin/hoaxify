import React from "react";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";

const Modal = (props) => {
  const { visible, onClickCancel, content, onClickOk, pendingApiCall } = props;

  let className = "modal fade";
  if (visible) {
    className += " show d-block";
  }

  const { t } = useTranslation();

  return (
    <div
      className={className}
      style={{ backgroundColor: "#000000b0" }}
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {t("DeleteHoax")}
            </h5>
          </div>
          <div className="modal-body">
            <span className="d-block mt-1">{content}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={onClickCancel}
              disabled={pendingApiCall}
            >
              {t("Cancel")}
            </button>
            <ButtonWithProgress
              className="btn btn-danger"
              pendingApiCall={pendingApiCall}
              disabled={pendingApiCall}
              onClick={onClickOk}
              text={t("Delete")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
