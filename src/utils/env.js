// @flow

const getApiUrl = (): string => {
  const apiUrl = process.env.REACT_APP_API_URL;

  if (!apiUrl) {
    throw new Error("Api's root URL not defined");
  }

  return apiUrl;
};

export default {
  getApiUrl,
};
