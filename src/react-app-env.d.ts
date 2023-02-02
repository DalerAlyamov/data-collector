/// <reference types="react-scripts" />

type TSeason = "Winter" | "Spring" | "Summer" | "Autumn"

interface IUserInfo extends IpInfoJson {
  // data from "Login" page
  name?: string;
  password?: string;
  login_TotalSecondsOnPage?: number;
  login_BetweenFirstLastInputSeconds?: number;
  login_NumberOfEdits?: number;

  // data from "Question1" page
  age?: number;
  question1_TotalSecondsOnPage?: number;
  question1_BetweenFirstLastInputSeconds?: number;
  question1_NumberOfEdits?: number;
  question1_EditList: number[];

  // data from "Question2" page
  favoriteSeason: TSeason;
  question2_TotalSecondsOnPage?: number;
  question2_BetweenFirstLastInputSeconds?: number;
  question2_NumberOfSelections?: number;
  question2_EditList: string[];

  // other data
  deviceModel?: string;
}

interface IpInfoJson {
  ip?: string;
  city?: string;
  country?: string;
  loc?: string;
  org?: string;
  region?: string;
  timezone?: string;
}
