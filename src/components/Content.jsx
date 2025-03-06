import Sidebar from "./Sidebar";
import Contenido from "./Contenido";
import Navbar from "./Navbar";

const Content = () => {
  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <Contenido />
    </div>
  );
};

export default Content;
