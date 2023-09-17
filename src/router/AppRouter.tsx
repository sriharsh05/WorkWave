import { Redirect, useRoutes } from "raviger";
import { User } from "../types/UserTypes";
import Boards from "../components/Boards";
import About from "../components/About";


export default function AppRouter({ currentUser }: { currentUser: User }) {
  const routes = {
    "/": () => <Redirect to="/boards" />,
    "/signin": () => <Redirect to="/" />,
    "/signup": () => <Redirect to="/" />,
    "/about": ()=> (<About />),
    "/boards": () => (
        <Boards currentUser={currentUser} />
    ),
  };
  let routeResult = useRoutes(routes)
  return routeResult;
}
