'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/store/features/auth/authSlice';

export default function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    const isAuthenticatedFromStorage = localStorage.getItem('isAuthenticated');

    if (userFromStorage && isAuthenticatedFromStorage === 'true') {
      const user = JSON.parse(userFromStorage);
      dispatch(setUser(user));
    }
  }, []);

  return null;
}
