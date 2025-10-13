import { createHashRouter, redirect } from "react-router";
import Layout from "./layout";
import Error from "./layout/error";
import Rankings from "./pages/rankings/page";
import RankingsLayout from "./pages/rankings/layout";
import Home from "./pages/home/page";

const router = createHashRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/rankings",
        Component: RankingsLayout,
        children: [
          {
            index: true,
            loader: () => redirect("/rankings/17"),
          },
          {
            path: ":id",
            element: <Rankings />,
          },
        ],
      },
    ],
  },
]);

export default router;
