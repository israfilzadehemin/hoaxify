import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ProfilePictureWithDefault from "../components/ProfileImageWithDefault";
import Input from "../components/Input";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { deleteHoax, deleteUser, updateUser } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import { logoutSuccess, updateSuccess } from "../redux/authActions";
import Modal from "../components/Modal";

const ProfileCard = (props) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState(false);
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);
  const [newImage, setNewImage] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));

  const routeParams = useParams();
  const pathUsername = routeParams.username;

  useEffect(() => {
    setEditable(pathUsername === loggedInUsername);
  }, [pathUsername, loggedInUsername]);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  let { username, displayName, image } = user;

  const onClickSave = async () => {
    if (newImage) {
      image = newImage.split(",")[1];
    }

    const body = {
      displayName: updatedDisplayName,
      image,
    };

    try {
      const resp = await updateUser(username, body);
      setInEditMode(false);
      setUser(resp.data);
      dispatch(updateSuccess(resp.data.displayName, resp.data.image));
    } catch (err) {
      setValidationErrors(err.response.data.message);
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
    };
    fileReader.readAsDataURL(file);
  };

  const { t } = useTranslation();
  const pendingApiCall = useApiProgress("put", `/api/1.0/users/${username}`);

  const deletingApiCall = useApiProgress(
    "delete",
    `/api/1.0/users/${username}`
  );

  useEffect(() => {
    if (!inEditMode) {
      setUpdatedDisplayName(undefined);
      setNewImage(undefined);
    } else {
      setUpdatedDisplayName(displayName);
    }
  }, [inEditMode, displayName]);

  const onClickCancel = () => {
    setModalVisible(false);
  };

  const onClickDeleteUser = async () => {
    await deleteUser(username);
    setModalVisible(false);
    dispatch(logoutSuccess());
    history.push("/");
  };

  const { displayName: displayNameError } = validationErrors;
  // Validaton error not working due to spring validation
  return (
    <div className="card card-header shadow-lg">
      <div className="card-body text-center">
        <ProfilePictureWithDefault
          className="rounded-circle"
          width="95"
          height="95"
          alt={username}
          image={image}
          tempimage={newImage}
        />
        {!inEditMode ? (
          <>
            <h3>
              {displayName}@{username}
            </h3>
            {editable && (
              <>
                <button
                  className="btn btn-success col-12"
                  onClick={() => setInEditMode(true)}
                >
                  {t("Edit")}
                </button>
                <button
                  className="btn btn-danger col-12 mt-1"
                  onClick={() => setModalVisible(true)}
                >
                  {t("Delete")}
                </button>
              </>
            )}
          </>
        ) : (
          <div>
            <Input
              label={t("ChangeDisplayName")}
              defaultValue={displayName}
              onChangeInput={(event) => {
                setUpdatedDisplayName(event.target.value);
              }}
              error={displayNameError}
            />
            <Input type="file" onChangeInput={onChangeFile} />
            <div>
              <ButtonWithProgress
                className="btn btn-success mr-3"
                onClick={() => onClickSave()}
                disabled={deletingApiCall}
                pendingApiCall={deletingApiCall}
                text={t("Save")}
              />
              <button
                className="btn btn-danger"
                onClick={() => setInEditMode(false)}
                disabled={deletingApiCall}
              >
                {t("Cancel")}
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        content="Are you sure to delete your account?"
        visible={modalVisible}
        onClickCancel={onClickCancel}
        onClickOk={onClickDeleteUser}
        pendingApiCall={pendingApiCall}
      />
    </div>
  );
};

export default ProfileCard;
