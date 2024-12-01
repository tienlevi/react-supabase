import { Route, Routes } from "react-router-dom";
import LayoutMain from "./components/Layout/Layout";
import ProtectRoutes from "./routes/ProtectRoutes";
import { protectRoutes, publicRoutes } from "./routes/routes";

function App() {
  return (
    <Routes>
      <Route element={<ProtectRoutes />}>
        <Route element={<LayoutMain />}>
          {protectRoutes.map((item) => {
            const Page = item.component;
            return (
              <Route key={item.path} path={item.path} element={<Page />} />
            );
          })}
        </Route>
      </Route>
      {publicRoutes.map((item) => {
        const Page = item.component;
        return <Route key={item.path} path={item.path} element={<Page />} />;
      })}
    </Routes>
  );
}

export default App;
