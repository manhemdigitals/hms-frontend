import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pateint-Pages/Login";
import Register from "./Pateint-Pages/Register";
import ForgotPassword from "./Pateint-Pages/ForgotPassword";
import Dashboard from "./Pateint-Pages/Dashboard";
import Appointments from "./Pateint-Pages/Appointments";
import Prescriptions from "./Pateint-Pages/Prescriptions";
import Consultation from "./Pateint-Pages/Consultation";
import Billing from "./Pateint-Pages/Billing";
import VideoConsultation from "./Pateint-Pages/VideoConsultation";
import ProtectedRoute from "./Middleware/ProtectedRoute";
import Home from "./pages/Home";
import Navbar from "./include/Navbar";
import DashboardLayout from "./layouts/DashboardLayout";
import ProfileSettings from "./Pateint-Pages/ProfileSettings";
import BookAppointment from "./Pateint-Pages/BookAppointment";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Patient Portal with Sidebar */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/appointments" element={<Appointments />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/dashboard/prescriptions" element={<Prescriptions />} />
            <Route path="/dashboard/consultation" element={<Consultation />} />
            <Route path="/dashboard/billing" element={<Billing />} />
            <Route path="/dashboard/video-consultation" element={<VideoConsultation />} />
            <Route path="/dashboard/profile-settings" element={<ProfileSettings />} />

          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
