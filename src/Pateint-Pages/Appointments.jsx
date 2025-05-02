import { useEffect, useState } from 'react';
import axios from '../Middleware/axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const patient = JSON.parse(localStorage.getItem('patient')); // Assuming you stored patient info in localStorage

        const response = await axios.get(`http://localhost:8000/api/appointments/${patient.uhid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const columns = [
    { name: 'Doctor Name', selector: row => row.doctor_name, sortable: true },
    { name: 'Department', selector: row => row.department, sortable: true },
    { name: 'Date & Time', selector: row => `${row.appointment_date} at ${row.appointment_time}` },
    { name: 'Status', selector: row => row.status, sortable: true },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Appointments</h2>
        <Link to="/book-appointment" className="btn btn-sm aptBtn">
          Book an Appointment
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={appointments}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default Appointments;
