import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

function Root() {
  return (
    <div className="h-full min-h-screen flex flex-col bg-orange-100 bg-opacity-20">
      <Navbar />

      <Outlet />
    </div>
  );
}

export default Root;
