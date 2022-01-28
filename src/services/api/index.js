import { request } from 'umi';

export async function refreshAccessToken(body, options) {
  return request('/api/user/refreshToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
