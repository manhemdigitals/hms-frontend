import { useEffect, useState } from 'react';
import axios from '../Middleware/axios';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const [form, setForm] = useState({ name: '', mobile: '', date: '', time: '', department: '', doctors: "" });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientData = JSON.parse(localStorage.getItem("patient"));
    if (!patientData) {
      setMessage("Patient information not found. Please log in again.");
      return;
    }

    try {
      await axios.post('/appointments', {
        name: form.name,
        mobile: form.mobile,
        department: form.department,
        appointment_date: form.date,
        appointment_time: form.time,
        uhid: patientData.uhid,  // Automatically include the uhid
      });

      setMessage('Appointment booked successfully!');
      setForm({ name: '', mobile: '', date: '', time: '', department: '' });

      setTimeout(() => {
        navigate('/dashboard/appointments');
      }, 1500);
    } catch (error) {
      console.error('Booking error:', error);
      setMessage('Something went wrong!');
    }
  };

  // Fetch departments here
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/departments');
        setDepartments(response.data)

      } catch (error) {
        console.error('Failed to fetch departments:', error);
        return [];
      }
    }
    fetchDepartments()
  }, [])


  return (
    <div className="container mt-4">
      <h2 className="mb-3">Book an Appointment</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Patient Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Your Contact Number</label>
          <input type="text" name="mobile" value={form.mobile} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">-- Select --</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Doctor's Available</label>
          <select
            name="doctors"
            value={form.doctors}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">-- Select --</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Appointment Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Appointment Time</label>
          <input type="time" name="time" value={form.time} onChange={handleChange} className="form-control" required />
        </div>

        <button type="submit" className="btn btn-sm aptBtn">Book Now</button>
      </form>
    </div>
  );
};

export default BookAppointment;
