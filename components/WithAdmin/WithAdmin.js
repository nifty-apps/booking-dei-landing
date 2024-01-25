import { useRouter } from "next/router";
import { useEffect } from "react";
import useIsAdmin from "../../utils/adminCheck";
import ErrorPage from "../../pages/[locale]/404";

export default function withAdmin(Component) {
  return function WithAdmin(props) {
    const router = useRouter();
    const { isAdmin, isLoading } = useIsAdmin();
    useEffect(() => {
      if (!isAdmin && !isLoading) {
        router.push("/404");
      }
    }, [router, isAdmin]);
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return isAdmin ? <Component {...props} /> : <ErrorPage />;
  };
}
