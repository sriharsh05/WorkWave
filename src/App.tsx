import React, { useEffect, useState } from "react";
import { User } from "./types/UserTypes";
import LoginRouter from "./router/LoginRouter";
import AppRouter from "./router/AppRouter";
import { me } from "./utils/apiUtils";
import { AppContainer } from "./components/AppContainer";

function App() {
  const getCurrentUser = async (
    setCurrentUser: (currentUser: User) => void
  ) => {
    const currentUser = await me();
    if (currentUser.username === "") {
      localStorage.removeItem("token");
    }
    setCurrentUser(currentUser);
  };

  const [currentUser, setCurrentUser] = useState<User>({
    username: null,
    url: "",
    name: "",
  });

  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div className="h-full">
      {currentUser.username && currentUser.username?.length > 0 ? (
        <AppContainer>
          <AppRouter/>
        </AppContainer>
      ) : (
        <LoginRouter />
      )}
    </div>
  );
}

export default App;
