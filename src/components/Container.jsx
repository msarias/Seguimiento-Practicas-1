import Sidebar from "./Sidebar";
import Contenido from "./Content";
import Navbar from "./Navbar";

const Container = () => {
  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <Contenido />
    </div>
  );
};

export default Container;
