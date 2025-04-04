import Content from "../generales/Content";
import NavBar from "../generales/NavBar";
import Sidebar from "../generales/Sidebar";

function Inicio() {
  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <div className="content">
        <Content />
      </div>
    </div>
  );
}

export default Inicio;