import React from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  userInfo: IUserInfo;
}

const Results: React.FC<IProps> = ({ userInfo }) => {
  if (userInfo.age === undefined) return <Navigate to="/login" />;
  return (
    <div className="blocks">
      <div className="title">Collected data</div>
      <div className="block">
        <div className="title">Login page</div>
        <p>
          <span>Name:</span>
          {userInfo.name}
        </p>
        <p>
          <span>Password:</span>
          {userInfo.password}
        </p>
        <p>
          <span>Total seconds on the page:</span>
          {(userInfo.login_TotalSecondsOnPage! / 1000).toFixed(2)} s.
        </p>
        <p>
          <span>Seconds between first input and last input:</span>
          {(userInfo.login_BetweenFirstLastInputSeconds! / 1000).toFixed(2)} s.
        </p>
        <p>
          <span>Number of changes in inputs:</span>
          {userInfo.login_NumberOfEdits}
        </p>
      </div>
      <div className="block">
        <div className="title">Question page 1</div>
        <p>
          <span>Age:</span>
          {userInfo.age}
        </p>
        <p>
          <span>Total seconds on the page:</span>
          {(userInfo.question1_TotalSecondsOnPage! / 1000).toFixed(2)} s.
        </p>
        <p>
          <span>Seconds between first input and last input:</span>
          {(userInfo.question1_BetweenFirstLastInputSeconds! / 1000).toFixed(2)} s.
        </p>
        <p>
          <span>Number of changes in input:</span>
          {userInfo.question1_NumberOfEdits}
        </p>
        <p>
          <span>The list of saved ages:</span>
          {userInfo.question1_EditList.join(", ")}
        </p>
      </div>
      <div className="block">
        <div className="title">Question page 2</div>
        <p>
          <span>Favorite season:</span>
          {userInfo.favoriteSeason}
        </p>
        <p>
          <span>Total seconds on the page:</span>
          {(userInfo.question2_TotalSecondsOnPage! / 1000).toFixed(2)} s.
        </p>
        <p>
          <span>Seconds between first input and last input:</span>
          {(userInfo.question2_BetweenFirstLastInputSeconds! / 1000).toFixed(2)} s.
        </p>
        <p>
          <span>Number of selections:</span>
          {userInfo.question2_NumberOfSelections}
        </p>
        <p>
          <span>The list of selected options:</span>
          {userInfo.question2_EditList.join(", ")}
        </p>
      </div>
      <div className="block">
        <div className="title">Other information</div>
        <p>
          <span>Device model:</span>
          {userInfo.deviceModel}
        </p>
        <p>
          <span>IP addres:</span>
          {userInfo.ip}
        </p>
        <p>
          <span>Country:</span>
          {userInfo.country}
        </p>
        <p>
          <span>City:</span>
          {userInfo.city}
        </p>
        <p>
          <span>Location:</span>
          {userInfo.loc}
        </p>
        <p>
          <span>Organization:</span>
          {userInfo.org}
        </p>
        <p>
          <span>Region:</span>
          {userInfo.region}
        </p>
        <p>
          <span>Timezone:</span>
          {userInfo.timezone}
        </p>
      </div>
    </div>
  );
};

export default Results;
