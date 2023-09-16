import { Redirect, useRoutes } from "raviger";
import { User } from "../types/UserTypes";
import Home from "../components/Home";


export default function AppRouter({ currentUser }: { currentUser: User }) {
  const routes = {
    "/": () => <Redirect to="/home" />,
    "/signin": () => <Redirect to="/" />,
    "/signup": () => <Redirect to="/" />,
    "/home": () => (
        <Home currentUser={currentUser} />
    ),
  };
  let routeResult = useRoutes(routes)
  return routeResult;
}
