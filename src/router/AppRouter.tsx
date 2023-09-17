import { Redirect, useRoutes } from "raviger";
import { User } from "../types/UserTypes";
import About from "../components/About";
import { Boards } from "../components/Boards/Boards";


export default function AppRouter({ currentUser }: { currentUser: User }) {
  const routes = {
    "/": () => <Redirect to="/boards" />,
    "/signin": () => <Redirect to="/" />,
    "/signup": () => <Redirect to="/" />,
    "/about": ()=> (<About />),
    "/boards": () => (
        <Boards />
    ),
  };
  let routeResult = useRoutes(routes)
  return routeResult;
}
