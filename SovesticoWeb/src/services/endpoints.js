import { GLOBALS as g } from "../../globals";

export const QueryTico = async (symbol, query) => {
  let reqBody = JSON.stringify({
    symbol: symbol,
    query: query,
  });

  let res = fetch(`${g.BASE_URL + g.QUERY_TICO}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: reqBody,
  })
    .then((r) => r.json())
    .then((r) => {
      console.log("Response", r);
      return r.output;
    })
    .catch((error) => console.error("Error:", error));

  return res;
};

export const GetRecommendations = async (filters) => {
  let reqBody = JSON.stringify({
    filters: filters,
  });

  console.log("REQ BOD", reqBody);

  let res = fetch(`${g.BASE_URL + g.GET_RECOMMENDATIONS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: reqBody,
  })
    .then((r) => r.json())
    .then((r) => {
      console.log("Response", r);
      return r;
    })
    .catch((error) => console.error("Error:", error));

  return res;
};
