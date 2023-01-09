import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NewTicket from "./pages/NewTicket";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import About from "./pages/About";
function App() {
  return (
    <>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/new-ticket" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
            <Route path="/tickets" element={<PrivateRoute />}>
              <Route path="/tickets" element={<Tickets />} />
            </Route>

            <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
              <Route path="/ticket/:ticketId" element={<Ticket />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
