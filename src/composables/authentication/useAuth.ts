interface LoginResponse {
  user: any;
  token: any;
}

export const useAuth = () => {
  const user = useState('user', () => null);
  const response = ref();
  const authTokenCookie = useCookie('authToken');
  const authUserCookie = useCookie('authUser');

  const login = async (credentials: { username: string; password: string }) => {

    try {
      const result: LoginResponse = await $fetch('/api/auth/login' as string, {
        method: 'POST',
        body: credentials
      });

      user.value = result.user;
      authTokenCookie.value = result.token;

      return response.value = {
        status: 'success',
        title: 'Login successful',
        description: 'You have successfully logged in',
        error: null
      };

    } catch (error) {

      return response.value = {
        status: 'error',
        title: 'Login failed',
        description: 'Error Logging in!',
        error: error
      }

    }


  }

  const logout = async () => {

    try {

      const result = await $fetch(`/api/auth/logout`, {
        method: 'POST',
        body: { token: authTokenCookie.value }
      });

      authTokenCookie.value = null;
      authUserCookie.value = null;

      return response.value = {
        status: 'success',
        title: 'Logout successful',
        description: 'You have successfully logged out',
        error: null
      };

    } catch (error) {
      return response.value = {
        status: 'error',
        title: 'Logout failed',
        description: 'Something went wrong during logout',
        error
      };
    }


  };


  const fetchUser = async () => {

    try {

      const result = await $fetch(`/api/auth/user/`, {
        method: 'POST',
        body: { token: authTokenCookie.value }
      });

      authUserCookie.value = result as any;

      return response.value = {
        status: 'success',
        title: 'User fetched successfully',
        description: 'You have successfully fetched user',
        error: null,
        data: result
      };


    } catch (error) {
      return response.value = {
        status: 'error',
        title: 'User fetch failed',
        description: 'Something went wrong during user fetch',
        error,
        data: null
      };

    }



  }

  return { user, login, logout, fetchUser };
};
