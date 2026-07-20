import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import FitnessForm from "./components/FitnessForm";
import ViewForm from "./components/ViewForm";
import UpdateForm from "./components/UpdateForm";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
          <Link className="navbar-brand" to="/home">
            Fit Nest
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/fitness-form" element={<FitnessForm />} />
          <Route path="/update-form/:joiningId" element={<UpdateForm />} />
          <Route path="/view-form" element={<ViewForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
