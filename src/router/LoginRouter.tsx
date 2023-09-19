import { useRoutes } from "raviger";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

export default function LoginRouter() {
  const routes = {
    "/signin": () => <SignIn />,
    "/signup": () => <SignUp />,
  };
  let routeResult = useRoutes(routes) || <SignIn />;
  return routeResult;
}