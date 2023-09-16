import { Redirect, useRoutes } from "raviger";
import { User } from "../types/UserTypes";


export default function AppRouter({ currentUser }: { currentUser: User }) {
  const routes = {
    "/": () => <Redirect to="/" />,
    "/signin": () => <Redirect to="/" />,
    "/signup": () => <Redirect to="/" />,
  };
  let routeResult = useRoutes(routes)
  return routeResult;
}
