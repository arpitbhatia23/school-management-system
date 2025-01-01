import { api } from '@/utils/api';

export const useAuthApi = () => {
  const login = async (data) => {
    try {
      const res = await api.post('/users/login', data);
      console.log(res);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  const register = async (data) => {
    try {
      return await pi.post('/users/register', data, {
        headers: {
          Accept: 'multipart/form-data',
        },
      });
    } catch (error) {
      return error.response;
    }
  };
  // update image
  const updateImage = async (data) => {
    try {
      return await api.patch('users/update_image', data, {
        headers: {
          Accept: 'multipart/form-data',
        },
      });
    } catch (error) {
      return error.response;
    }
  };
  // current user
  const currentUser = async () => {
    try {
      return await api.get('users/current_user', {
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (error) {
      return error.response;
    }
  };
  // change password
  const changePassword = async (data) => {
    try {
      return await api.patch('user/change_password', data, {
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (error) {
      return error.response;
    }
  };
  // update profile detail
  const update_profile_detail = async (data) => {
    try {
      return await api.patch('user/updateprofile', data, {
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (error) {
      return error.response;
    }
  };
  // logout
  const logout = async (data) => {
    try {
      return await api.delete('users/logout', data);
    } catch (error) {
      return error.response;
    }
  };

  // refreshtoken
  const refresh_token = async (data) => {
    try {
      return await api.get('users/refresh_token', data);
    } catch (erro) {
      return error.response;
    }
  };

  // updateprofile
  const updateProfile = async (data) => {
    try {
      return await api.patch('users/updateprofile', data);
    } catch (error) {
      return error.response;
    }
  };

  return {
    login,
    register,
    updateImage,
    currentUser,
    changePassword,
    logout,
    refresh_token,
    updateProfile,
  };
};
