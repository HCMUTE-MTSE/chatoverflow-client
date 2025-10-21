import axios from 'axios';
import { clearCurrentUserCache } from '~/utils/userUtils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PREFIX_AUTH = import.meta.env.VITE_PREFIX_AUTH;
export const logout = async () => {
  await axios.post(
    `${API_BASE_URL}/${PREFIX_AUTH}/logout`,
    {},
    { withCredentials: true }
  );
  localStorage.removeItem('token');
  localStorage.removeItem('nickName');
  localStorage.removeItem('avatar');
  clearCurrentUserCache(); // Clear user cache
};
