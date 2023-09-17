import { Redirect, useRoutes } from "raviger";
import { User } from "../types/UserTypes";
import About from "../components/About";
import { Suspense, lazy } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Boards = lazy(() => import("../components/Boards/Boards"));

export default function AppRouter({ currentUser }: { currentUser: User }) {
  const routes = {
    "/": () => <Redirect to="/boards" />,
    "/signin": () => <Redirect to="/" />,
    "/signup": () => <Redirect to="/" />,
    "/about": () => <About />,
    "/boards": () => (
      <Suspense fallback={<LoadingSpinner />}>
        <Boards />
      </Suspense>
    ),
  };
  let routeResult = useRoutes(routes);
  return routeResult;
}
