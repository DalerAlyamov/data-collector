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

const Question2: React.FC<IProps> = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const [disabledNextBtn, setDisabledNextBtn] = React.useState(true);

  const inputFirstLastInterval = () => {
    if (inputFirstTime === 0) inputFirstTime = new Date().valueOf();
    else inputLastTime = new Date().valueOf();
  };

  const handleChangeFavoriteSeason = (value: TSeason) => {
    inputFirstLastInterval();
    setUserInfo({
      ...userInfo,
      favoriteSeason: value,
      question2_NumberOfSelections:
        userInfo.question2_NumberOfSelections !== undefined ? userInfo.question2_NumberOfSelections + 1 : 0,
      question2_EditList: [...userInfo.question2_EditList, value],
    });
  };

  React.useEffect(() => {
    if (userInfo.favoriteSeason) setDisabledNextBtn(false);
    else setDisabledNextBtn(true);
  }, [userInfo]);

  React.useEffect(() => {
    return () => {
      setUserInfo((prev) => ({
        ...prev,
        question2_TotalSecondsOnPage: new Date().valueOf() - startTimeOnPage,
        question2_BetweenFirstLastInputSeconds:
          (inputLastTime === 0 ? new Date().valueOf() : inputLastTime) -
          (inputFirstTime === 0 ? new Date().valueOf() : inputFirstTime),
      }));
    };
  }, [setUserInfo]);

  React.useEffect(() => {
    startTimeOnPage = new Date().valueOf();
  }, []);

  if (userInfo?.age === undefined) return <Navigate to="/login" />;

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        !disabledNextBtn && navigate("/results");
      }}
    >
      <div className="input-label">
        <p>What time of the year do you like the most?</p>
        <Select value={userInfo.favoriteSeason} onChange={handleChangeFavoriteSeason} />
      </div>
      <button type="submit" className={classNames("button", disabledNextBtn && "disabled")}>
        Next
      </button>
    </form>
  );
};

const Select = ({ value, onChange }: { value: TSeason; onChange: (value: TSeason) => void }) => {
  const [opened, setOpened] = React.useState(false);

  React.useEffect(() => {
    const handleWindowClick = () => {
      setOpened(false);
    };
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);

  return (
    <div className="select">
      <button
        type="button"
        className={classNames("current-value", opened && "opened")}
        onClick={(e) => {
          e.stopPropagation();
          setOpened(!opened);
        }}
      >
        {value}
        <div className="arrow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.32998 8.91C3.32998 8.72 3.39998 8.53 3.54998 8.38C3.83998 8.09 4.31998 8.09 4.60998 8.38L11.13 14.9C11.61 15.38 12.39 15.38 12.87 14.9L19.39 8.38C19.68 8.09 20.16 8.09 20.45 8.38C20.74 8.67 20.74 9.15 20.45 9.44L13.93 15.96C13.42 16.47 12.73 16.76 12 16.76C11.27 16.76 10.58 16.48 10.07 15.96L3.54998 9.44C3.40998 9.29 3.32998 9.1 3.32998 8.91Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </button>
      {opened && (
        <div className="options">
          <button type="button" className="option" onClick={() => onChange("Winter")}>
            Winter
          </button>
          <button type="button" className="option" onClick={() => onChange("Spring")}>
            Spring
          </button>
          <button type="button" className="option" onClick={() => onChange("Summer")}>
            Summer
          </button>
          <button type="button" className="option" onClick={() => onChange("Autumn")}>
            Autumn
          </button>
        </div>
      )}
    </div>
  );
};

export default Question2;
