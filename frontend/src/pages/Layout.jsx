import NavBar from "../components/Shared/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-layout">
      <NavBar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
