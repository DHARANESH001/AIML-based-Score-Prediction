import { useEffect, useState } from "react";
import {
  Users,
  CheckCircle,
  XCircle,
  Target,
  Download,
  TrendingUp,
} from "lucide-react";
import API from "../services/api";
export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState([]);
  const [r2, setR2] = useState(0);
  useEffect(() => {
    fetchPredictions();
    fetchR2();
  }, []);
  const fetchPredictions = async () => {
    try {
      const res = await API.get("/predictions");
      const data = res.data;
      setStudents(data);
      const total = data.length;
      const pass = data.filter((s) => s.predictedScore >= 50).length;
      const fail = total - pass;
      setStats([
        {
          title: "Total Students",
          value: total,
          icon: Users,
          colorClass: "blue",
        },
        {
          title: "Predicted Pass",
          value: pass,
          icon: CheckCircle,
          colorClass: "green",
        },
        {
          title: "Predicted Fail",
          value: fail,
          icon: XCircle,
          colorClass: "red",
        },
        {
          title: "Accuracy",
          value: `${r2}%`,
          icon: Target,
          colorClass: "purple",
        },
      ]);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };
  const fetchR2 = async () => {
    try {
      const res = await API.get("/model-r2");
      setR2(res.data.r2);
    } catch (error) {
      console.error("Error fetching R2:", error);
    }
  };
  const getGrade = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    return "F";
  };
  const getStatus = (marks) => (marks >= 50 ? "Pass" : "Fail");
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <p className="dashboard-subtitle">
          Monitor student performance and AI predictions
        </p>
      </div>
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className={`stat-icon ${stat.colorClass}`}>
                  <Icon />
                </div>
              </div>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.title}</p>
            </div>
          );
        })}
      </div>
      {/* Prediction Table */}
      <div className="results-section">
        <div className="results-header">
          <div className="results-title">
            <TrendingUp /> Prediction Results
          </div>
        </div>
        <table className="results-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Predicted Marks</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.predictedScore.toFixed(1)}</td>
                <td>
                  <span className="grade-badge">
                    {getGrade(student.predictedScore)}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      getStatus(student.predictedScore).toLowerCase()
                    }`}
                  >
                    {getStatus(student.predictedScore)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}