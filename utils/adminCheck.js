import { useState, useEffect } from "react";

export default function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsAdmin(!!user?.isAdmin);
    setIsLoading(false);
  }, []);

  return { isAdmin, isLoading };
}
