import Sidebar from "./Sidebar";
import Content from "./Content";
import Navbar from "./NavBar";

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
