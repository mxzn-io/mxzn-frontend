import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { refreshAccessToken } from '@/services/api';

const loginPath = '/user/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      console.log(msg);
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果是登录页面，不执行

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
}

const requestInterceptor = async (url, options) => {
  const token = window.localStorage.getItem('accessToken') || '';

  return {
    url: `${url}`,
    // url: url,
    options: {
      ...options,
      interceptors: true,
      headers: {
        Authorization: token,
      },
    },
  };
};

const responseInterceptor = async (response, options) => {
  if (response.status === 401) {
    if (response.url.includes('/refreshToken')) {
      console.log('url includes refreshToken');
      return;
    }

    const refreshToken = window.localStorage.getItem('refreshToken') || '';

    refreshAccessToken({
      refreshToken,
    }).then((res) => {
      console.log(res);
    });
  }

  return response;
};

export const request = {
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
};

export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    childrenRender: (children, props) => {
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};
