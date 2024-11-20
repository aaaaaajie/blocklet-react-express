import { createAxios } from '@blocklet/js-sdk';

import { UserInfo } from '../../common/interfaces/user';

const api = createAxios({
  baseURL: window?.blocklet?.prefix || '/',
});

export async function fetchUser(userId: number) {
  const { data } = await api.get(`/api/users/${userId}`);
  return data;
}

export async function saveUserById(userId: number, updated: UserInfo) {
  const { data } = await api.put(`/api/users/${userId}`, {
    username: updated.username,
    tel_no: updated.tel_no,
    avatar: updated.avatar,
    email: updated.email,
    address: updated.address,
  });
  return data;
}

export default api;
