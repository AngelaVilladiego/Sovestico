import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

function Root() {
  return (
    <div className="h-full min-h-screen flex flex-col fixed top-0 w-full">
      <Navbar />

      <Outlet />
    </div>
  );
}

export default Root;
