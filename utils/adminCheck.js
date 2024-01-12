import { useState, useEffect } from "react";

export default function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state to track loading

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsAdmin(!!user?.isAdmin);
    setIsLoading(false); // Set loading to false after the check
  }, []);

  return { isAdmin, isLoading };
}
