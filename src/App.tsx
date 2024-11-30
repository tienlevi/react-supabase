import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePlayer from "./pages/CreatePlayer";
import EditPlayer from "./pages/EditPlayer";
import LayoutMain from "./components/Layout/Layout";
import CreateClub from "./pages/CreateClub";
import EditClub from "./pages/EditClub";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route index element={<Home />} />
        <Route path="/player/create" element={<CreatePlayer />} />
        <Route path="/player/edit/:id" element={<EditPlayer />} />
        <Route path="/club/edit/:id" element={<EditClub />} />
        <Route path="/club/create" element={<CreateClub />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
