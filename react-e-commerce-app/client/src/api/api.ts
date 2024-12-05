const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export const fetchApi = async (endpoint = "", options = {}) => {
  const url = `${baseUrl}${apiPath}${endpoint}`;

  console.log("URL: ", url);

  const response = await fetch(url, options);

  if (!response?.ok) {
    throw Error(`Request failed to ${url}: ${response.statusText}`);
  }

  return response.json();
};
