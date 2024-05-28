// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import "./index.css";

import Dashboard from "./pages/Dashboard/Dashboard";
import Accounts from "./pages/Dashboard/Accounts"; // Import the Accounts component
import BookingForm from "./components/BookingForm";
import CalendarComponent from "./components/CalendarComponent";
import "react-calendar/dist/Calendar.css";
import Login from "./pages/Login";
//import Home from "./pages/Home";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Appointment from "./pages/Dashboard/AppointmentDashboard";
import Hospitalization from "./pages/Dashboard/Hospitalization";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="appointments" element={<Appointment />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="hospitalization" element={<Hospitalization />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<h1>Services</h1>} />
        <Route path="/calendar" element={<CalendarComponent />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;