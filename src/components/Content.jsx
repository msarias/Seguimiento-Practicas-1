import Sidebar from "./Sidebar";
import Contenido from "./Contenido";
import NavBar from "./NavBar.jsx";

const Content = () => {
  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <Contenido />
    </div>
  );
};

export default Content;
