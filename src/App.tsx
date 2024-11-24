import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePlayer from "./pages/CreatePlayer";
import EditPlayer from "./pages/EditPlayer";
import LayoutMain from "./components/Layout/Layout";
import CreateClub from "./pages/CreateClub";
import EditClub from "./pages/EditClub";
import "./styles/styles.css";

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
    </Routes>
  );
}

export default App;
