import CreatePlayer from "../pages/CreatePlayer";
import EditPlayer from "../pages/EditPlayer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

export const protectRoutes = [
  { path: "/", component: Home },
  { path: "/player/create", component: CreatePlayer },
  { path: "/player/edit/:id", component: EditPlayer },
  { path: "/player/create", component: CreatePlayer },
  { path: "/player/edit/:id", component: EditPlayer },
];
