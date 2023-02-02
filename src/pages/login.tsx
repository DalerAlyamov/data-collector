import React from "react";
import initialData from "initialData";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

interface IProps {
  userInfo: IUserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
}

let inputFirstTime = 0;
let inputLastTime = 0;
let startTimeOnPage = 0;

const Login: React.FC<IProps> = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const firstInputRef = React.useRef<HTMLInputElement>(null);
  const [disabledNextBtn, setDisabledNextBtn] = React.useState(true);

  const inputFirstLastInterval = () => {
    if (inputFirstTime === 0) inputFirstTime = new Date().valueOf();
    else inputLastTime = new Date().valueOf();
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputFirstLastInterval();
    setUserInfo({
      ...userInfo,
      name: e.target.value,
      login_NumberOfEdits: userInfo.login_NumberOfEdits !== undefined ? userInfo.login_NumberOfEdits + 1 : 0,
    });
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputFirstLastInterval();
    setUserInfo({
      ...userInfo,
      password: e.target.value,
      login_NumberOfEdits: userInfo.login_NumberOfEdits !== undefined ? userInfo.login_NumberOfEdits + 1 : 0,
    });
  };

  React.useEffect(() => {
    if (userInfo.name?.length && userInfo.password?.length) setDisabledNextBtn(false);
    else setDisabledNextBtn(true);
  }, [userInfo]);

  React.useEffect(() => {
    setUserInfo(initialData);
    fetch("https://ipinfo.io/json?token=9c165453d0a53c")
      .then((res) => res.json())
      .then((json) => setUserInfo({ ...initialData, ...json, deviceModel: window.navigator.userAgent }));
    return () => {
      setUserInfo((prev) => ({
        ...prev,
        login_TotalSecondsOnPage: new Date().valueOf() - startTimeOnPage,
        login_BetweenFirstLastInputSeconds: inputLastTime - inputFirstTime,
      }));
    };
  }, [setUserInfo]);

  React.useEffect(() => {
    startTimeOnPage = new Date().valueOf();
    firstInputRef.current?.focus();
  }, []);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        !disabledNextBtn && navigate("/question-1");
      }}
    >
      <div className="input-label">
        <p>Username</p>
        <input
          ref={firstInputRef}
          className="input"
          type="text"
          value={userInfo.name ?? ""}
          onChange={handleChangeName}
        />
      </div>
      <div className="input-label">
        <p>Password</p>
        <input
          className="input"
          type="password"
          value={userInfo.password ?? ""}
          onChange={handleChangePassword}
          autoComplete="off"
        />
      </div>
      <button type="submit" className={classNames("button", disabledNextBtn && "disabled")}>
        Login
      </button>
    </form>
  );
};

export default Login;
