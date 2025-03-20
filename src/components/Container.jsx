import Sidebar from "./Sidebar";
import Content from "./Content";
import Navbar from "./Navbar";

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
