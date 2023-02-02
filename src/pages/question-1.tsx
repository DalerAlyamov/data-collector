import classNames from "classnames";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface IProps {
  userInfo: IUserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>;
}

let inputFirstTime = 0;
let inputLastTime = 0;
let startTimeOnPage = 0;

const Question1: React.FC<IProps> = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const [disabledNextBtn, setDisabledNextBtn] = React.useState(true);
  const firstInputRef = React.useRef<HTMLInputElement>(null);

  const inputFirstLastInterval = () => {
    if (inputFirstTime === 0) inputFirstTime = new Date().valueOf();
    else inputLastTime = new Date().valueOf();
  };

  const handleChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputFirstLastInterval();
    if (isNaN(Number(e.target.value))) return;
    setUserInfo({
      ...userInfo,
      age: Number(e.target.value),
      question1_NumberOfEdits:
        userInfo.question1_NumberOfEdits !== undefined ? userInfo.question1_NumberOfEdits + 1 : 0,
    });
  };

  React.useEffect(() => {
    return () => {
      setUserInfo((prev) => ({
        ...prev,
        question1_TotalSecondsOnPage: new Date().valueOf() - startTimeOnPage,
        question1_BetweenFirstLastInputSeconds:
          (inputLastTime === 0 ? new Date().valueOf() : inputLastTime) - inputFirstTime,
      }));
    };
  }, [setUserInfo]);

  React.useEffect(() => {
    if (userInfo.age && userInfo.age < 100 && userInfo.age > 0) setDisabledNextBtn(false);
    else setDisabledNextBtn(true);
  }, [userInfo]);

  React.useEffect(() => {
    startTimeOnPage = new Date().valueOf();
    firstInputRef.current?.focus();
  }, []);

  if (userInfo.name === undefined || userInfo.password === undefined) return <Navigate to="/login" />;

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        !disabledNextBtn && navigate("/question-2");
      }}
    >
      <div className="input-label">
        <p>How old are you?</p>
        <input
          ref={firstInputRef}
          className="input"
          type="text"
          value={String(userInfo.age ?? "")}
          onChange={handleChangeAge}
          onBlur={() => {
            setUserInfo({
              ...userInfo,
              question1_EditList: userInfo.age ? [...userInfo.question1_EditList, userInfo.age] : [],
            });
          }}
        />
      </div>
      <button type="submit" className={classNames("button", disabledNextBtn && "disabled")}>
        Next
      </button>
    </form>
  );
};

export default Question1;
