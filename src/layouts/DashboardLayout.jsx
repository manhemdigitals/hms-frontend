import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./DashboardLayout.css"; // Optional: for your own styling
import Logo from '../assets/logo (3).png'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaCalendarCheck, FaFileMedical, FaStethoscope, FaFileInvoiceDollar, FaVideo } from "react-icons/fa";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [patientName, setPatientName] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const profileImage = localStorage.getItem("profileImage") || "https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww";


    const navItems = [
        { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
        { to: "/dashboard/appointments", label: "Appointments", icon: <FaCalendarCheck /> },
        { to: "/dashboard/prescriptions", label: "Prescriptions", icon: <FaFileMedical /> },
        { to: "/dashboard/consultation", label: "Consultation", icon: <FaStethoscope /> },
        { to: "/dashboard/billing", label: "Billing", icon: <FaFileInvoiceDollar /> },
        { to: "/dashboard/video-consultation", label: "Video Call", icon: <FaVideo /> },
    ];

    useEffect(() => {
        // Dummy patient name — replace this with actual user context or API
        const user = JSON.parse(localStorage.getItem("patient")); // or use context if set
        if (user && user.name) {
            setPatientName(user.name);
        } else {
            setPatientName("Hemang"); // fallback
        }
    }, []);


    return (
        <div className="dashboard-layout d-flex">
            {/* Sidebar */}
            <div className={`sidebar  ${sidebarOpen ? "open" : ""}`}>
                <div className="p-3">
                    <div className="text-center mb-4">
                        <img
                            src={profileImage} // Replace with patient's image URL from state or localStorage
                            alt="Profile"
                            className="rounded-circle profile-img mb-2"
                            style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                            onClick={() => navigate('/dashboard/profile-settings')}
                        />
                        <h6 className="m-0">{patientName}</h6>
                    </div>
                    <ul className="nav flex-column">
                        {navItems.map(({ to, label, icon }) => (
                            <li className="nav-item" key={to}>
                                <Link
                                    to={to}
                                    className={`nav-link d-flex align-items-center gap-2 ${location.pathname === to ? "active-nav" : ""
                                        }`}
                                >
                                    {icon}
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main content */}
            <div className="content flex-grow-1">
                {/* Topbar */}
                <div className="topbar d-flex justify-content-between align-items-center p-3 shadow-sm bg-white">
                    <button className="btn btn-outline-primary d-lg-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        ☰
                    </button>
                    <h5 className="m-0"><img className="w-50 h-50" src={Logo} alt="" /></h5>
                    <button className="btn btn-sm btn-danger" onClick={() => {
                        localStorage.removeItem("isLoggedIn");
                        window.location.href = "/";
                    }}>
                        Log out
                    </button>
                </div>

                {/* Page Content */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
