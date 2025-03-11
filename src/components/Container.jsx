import Sidebar from "./Sidebar";
import Contenido from "./Content";
import NavBar from "./NavBar";

const Container = () => {
  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <Contenido />
    </div>
  );
};

export default Container;
