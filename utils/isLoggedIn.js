import { useState, useEffect } from "react";

export default function useIsUserLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, []);

  return isLoggedIn;
}
