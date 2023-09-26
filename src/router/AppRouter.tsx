import { Redirect, useRoutes } from "raviger";
import { User } from "../types/UserTypes";
import { Suspense, lazy } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { About } from "../components/About";

const Boards = lazy(() => import("../components/Boards/Boards"));
const Stages = lazy(() => import("../components/Stages/Stages"));
const ListTasks = lazy(() => import("../components/ListTasks"));

export default function AppRouter() {
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
    "/boards/:id": ({ id }: { id: string }) => (
      <Suspense fallback={<LoadingSpinner />}>
        <Stages id={Number(id)} />
      </Suspense>
    ),
    "/listTasks": () => (
      <Suspense fallback={<LoadingSpinner />}>
        <ListTasks />
      </Suspense>
    ),
  };
  let routeResult = useRoutes(routes);
  return routeResult;
}
