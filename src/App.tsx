import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingForm from './components/BookingForm';
<<<<<<< Updated upstream
import NextForm from './components/NextForm'; // Import your next form component
=======
import CalendarComponent from './components/CalendarComponent';
import 'react-calendar/dist/Calendar.css';
import Login from './Login';
>>>>>>> Stashed changes

const App = () => {
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<BookingForm />} />
        <Route path="/next-form" element={<NextForm />} /> {/* Define the route for the next form */}
=======
        <Route path="/" element={<Dashboard/>} /> {/* Define the route for the home page */}
        <Route path="/about" element={<About/>} /> {/* Define the route for the next form */}  \
        <Route path="/services" element={<h1>Services</h1>} /> {/* Define the route for the services page */}
        <Route path="/calendar" element={<CalendarComponent/>} /> {/* Define the route for the booking page */}
        <Route path="/book" element={<BookingForm/>} /> {/* Define the route for the booking page */}
        <Route path="/login" element={<Login/>} /> {/* Define the route for the login page */}
        <Route path="/*" element={<h1>404 Not Found</h1>} /> {/* Define the route for the 404 page */}
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
};

export default App;

