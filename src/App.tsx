/* node_modules */
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

/* absolute */
import Login from "pages/login";
import Question1 from "pages/question-1";
import Question2 from "pages/question-2";
import Results from "pages/results";
import initialData from "initialData";
import "global.scss";

const App: React.FC = (): JSX.Element => {
  const [userInfo, setUserInfo] = React.useState<IUserInfo>(initialData);

  return (
    <Routes>
      <Route path="/login" element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />} />
      <Route path="/question-1" element={<Question1 userInfo={userInfo} setUserInfo={setUserInfo} />} />
      <Route path="/question-2" element={<Question2 userInfo={userInfo} setUserInfo={setUserInfo} />} />
      <Route path="/results" element={<Results userInfo={userInfo} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
