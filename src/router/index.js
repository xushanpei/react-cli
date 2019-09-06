import React from "react";
import loadable from "@loadable/component";
import Loading from "../components/loading/Loading";
import RouterView from "./RouterView";

const Home = loadable(() => import("../pages/home/Home"), { fallback: <Loading /> });
const Detail = loadable(() => import("../pages/detail/Detail"), { fallback: <Loading /> });
const System = loadable(() => import("../pages/system/System"), { fallback: <Loading /> });

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/detail",
    component: Detail,
    routes: [
      {
        path: "/detail/system",
        component: System
      }
    ]
  }
];

export default routes;
