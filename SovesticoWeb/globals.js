const LOCAL_API = "http://127.0.0.1:5000/";
const testing_env = true;
var BASE_URL = testing_env ? LOCAL_API : "";

export const PRINCIPLES = [
  "Governance",
  "Environmentalism",
  "Social impact",
  "Doesn't produce vices",
  "Conservationism",
  "No military involvement",
  "Health conscious",
  "Catholic values",
];

export const GLOBALS = {
  BASE_URL: BASE_URL,
  QUERY_TICO: "queryTico",
};
