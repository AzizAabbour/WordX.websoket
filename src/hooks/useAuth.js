import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, signupSuccess, logout as logoutAction, updateProfile } from '../store/slices/authSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(state => state.auth);

  const login = (email, password) => {
    // Simulated auth — replace with real API call
    const userData = {
      id: 'user_1',
      email,
      firstName: email.split('@')[0],
      lastName: '',
      avatar: null,
      plan: 'free',
      createdAt: new Date().toISOString(),
    };
    dispatch(loginSuccess(userData));
    return userData;
  };

  const signup = (data) => {
    const userData = {
      id: 'user_' + Date.now(),
      email: data.email,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      avatar: null,
      plan: 'free',
      createdAt: new Date().toISOString(),
    };
    dispatch(signupSuccess(userData));
    return userData;
  };

  const logoutUser = () => {
    dispatch(logoutAction());
  };

  const update = (data) => {
    dispatch(updateProfile(data));
  };

  return { user, isAuthenticated, loading, error, login, signup, logout: logoutUser, updateProfile: update };
}
