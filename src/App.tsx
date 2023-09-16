import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { User } from './types/UserTypes';
import LoginRouter from './router/LoginRouter';
import AppRouter from './router/AppRouter';
import { me } from './utils/apiUtils';

function App() {

  const  getCurrentUser = async (setCurrentUser:(currentUser: User) => void ) => {
    const currentUser = await me();
    if (currentUser.username === "") {
      localStorage.removeItem("token");
    }
    setCurrentUser(currentUser);
  }

  const [currentUser, setCurrentUser] = useState<User>({
    username: null,
    url: "",
    name: "",
  });

  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
      currentUser.username && currentUser.username?.length > 0 ? (
       <AppRouter currentUser={currentUser} />
      ) : (
        <LoginRouter />
      )
  );
  
}

export default App;
