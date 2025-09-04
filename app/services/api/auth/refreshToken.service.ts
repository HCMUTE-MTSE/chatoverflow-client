import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PREFIX_AUTH = import.meta.env.VITE_PREFIX_AUTH;

export const refreshToken = async (): Promise<string> => {
  const res = await axios.post(
    `${API_BASE_URL}/${PREFIX_AUTH}/refresh-token`,
    {},
    { withCredentials: true }
  );
  return res.data.data.accessToken;
};
