import { useEffect, useState } from "react";
import "../css/Dashboard.css";
import axios from "axios";

export const Dashboard = () => {
  const [students, setStudent] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [books, setBooks] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/dashboard")
      .then((res) => {
        if (res.data.ok) {
          setStudent(res.data.student);
          setAdmin(res.data.admin);
          setBooks(res.data.book);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <h2>Total Books</h2>
        <div className="number">{books}</div>
      </div>

      <div className="dashboard-box">
        <h2>Total Students</h2>
        <div className="number">{students}</div>
      </div>

      <div className="dashboard-box">
        <h2>Total Admin</h2>
        <div className="number">{admin}</div>
      </div>
    </div>
  );
};
