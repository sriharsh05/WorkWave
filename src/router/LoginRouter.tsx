import { useRoutes } from "raviger";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function LoginRouter() {
  const routes = {
    "/signin": () => <SignIn />,
    "/signup": () => <SignUp />,
  };
  let routeResult = useRoutes(routes) || <SignIn />;
  return routeResult;
}