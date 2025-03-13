import Sidebar from "./Sidebar";
import Contenido from "./Content";
import NavBar from "./NavBar";
// import Navbar from "./Navbar";
import Content from "./Content";

const Container = () => {
  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <Content />
    </div>
  );
};

export default Container;
