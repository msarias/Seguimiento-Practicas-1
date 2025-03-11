import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Content from "./Content";

const Container = () => {
  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <Content />
    </div>
  );
};

export default Container;
