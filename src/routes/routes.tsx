import ConfirmEmail from "../pages/ConfirmEmail";
import CreateClub from "../pages/CreateClub";
import CreatePlayer from "../pages/CreatePlayer";
import EditClub from "../pages/EditClub";
import EditPlayer from "../pages/EditPlayer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/confirm-email", component: ConfirmEmail },
];

export const protectRoutes = [
  { path: "/", component: Home },
  { path: "/player/create", component: CreatePlayer },
  { path: "/player/edit/:id", component: EditPlayer },
  { path: "/club/create", component: CreateClub },
  { path: "/club/edit/:id", component: EditClub },
];
