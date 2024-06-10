import axios from "axios";
const baseURL = "https://learning.toeman.online";


export const AdminUserAxios = axios.create({
    baseURL: `${baseURL}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access')}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
