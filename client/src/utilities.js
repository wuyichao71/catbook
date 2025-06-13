const BASE_URL = "https://catbook-5bwk.onrender.com";

const formatParams = (params) => {
  return Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
};

const convertToJSON = (res) => {
  if (!res.ok) {
    throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
    res.json().then((result) => {
      console.error(`${result.err}`);
      throw `API request failed with response status ${res.status} and text: ${res.statusText}`;
    });
  }

  return res
    .clone()
    .json()
    .catch((error) => {
      return res.text().then((text) => {
        throw `API request's result could not be converted to a JSON object: \n${text}`;
      });
    });
};

export const get = (endpoint, params = {}) => {
  const fullPath = endpoint + "?" + formatParams(params);
  return fetch(BASE_URL + fullPath)
    .then(convertToJSON)
    .catch((error) => {
      throw `GET request to ${fullPath} failed with error:\n${error}`;
    });
};

export function post(endpoint, params = {}) {
  return fetch(BASE_URL + endpoint, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(params),
  })
    .then(convertToJSON) // convert result to JSON object
    .catch((error) => {
      // give a useful error message
      throw `POST request to ${endpoint} failed with error:\n${error}`;
    });
}
