 
import { BsCalendarCheck, BsClipboardCheck, BsCameraVideo, BsCash, BsChatDots } from "react-icons/bs";
import { useEffect, useState } from "react";

const Dashboard = () => {
 
  const [greeting, setGreeting] = useState("");
  const [patientName, setPatientName] = useState("");

 

  useEffect(() => {
    // Greet based on time
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    // Dummy patient name — replace this with actual user context or API
    const user = JSON.parse(localStorage.getItem("patient")); // or use context if set
    if (user && user.name) {
      setPatientName(user.name);
    } else {
      setPatientName("Hemang"); // fallback
    }
  }, []);

  const features = [
    {
      icon: <BsCalendarCheck size={32} />,
      label: "Appointments",
      route: "/dashboard/appointments",
    },
    {
      icon: <BsClipboardCheck size={32} />,
      label: "Prescriptions",
      route: "/dashboard/prescriptions",
    },
    {
      icon: <BsChatDots size={32} />,
      label: "Online Consultation",
      route: "/dashboard/consultation",
    },
    {
      icon: <BsCash size={32} />,
      label: "Billing & Payment",
      route: "/dashboard/billing",
    },
    {
      icon: <BsCameraVideo size={32} />,
      label: "Video Consultation",
      route: "/dashboard/video-consultation",
    },
  ];

  return (
    <div className="container">
      <h2 className="mb-2">{greeting}</h2>
      <h4 className="text-muted mb-4">Welcome, {patientName} 👋</h4>
      <div className="row">
        {features.map((feature, index) => (
          <div
            key={index}
            className="col-md-4 mb-4"
            style={{ cursor: "pointer" }}
          >
            <a style={{ textDecoration: 'none' }} href={feature.route}>
              <div className="card shadow-sm p-3 h-100 hover-shadow text-center">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <div className="mb-3">{feature.icon}</div>
                  <h5 className="card-title">{feature.label}</h5>
                </div>
              </div>
            </a>

          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Dashboard;
