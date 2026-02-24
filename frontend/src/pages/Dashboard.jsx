import { Users, CheckCircle, XCircle, Target, Download, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      change: '+12%',
      icon: Users,
      colorClass: 'blue'
    },
    {
      title: 'Predicted Pass',
      value: '892',
      change: '+8%',
      icon: CheckCircle,
      colorClass: 'green'
    },
    {
      title: 'Predicted Fail',
      value: '342',
      change: '-4%',
      icon: XCircle,
      colorClass: 'red'
    },
    {
      title: 'Accuracy',
      value: '94.5%',
      change: '+2.3%',
      icon: Target,
      colorClass: 'purple'
    }
  ];

  const predictionResults = [
    { id: 1, name: 'Alice Johnson', predictedMarks: 85, status: 'Pass', grade: 'A' },
    { id: 2, name: 'Bob Smith', predictedMarks: 42, status: 'Fail', grade: 'F' },
    { id: 3, name: 'Carol Williams', predictedMarks: 78, status: 'Pass', grade: 'B+' },
    { id: 4, name: 'David Brown', predictedMarks: 91, status: 'Pass', grade: 'A+' },
    { id: 5, name: 'Emma Davis', predictedMarks: 38, status: 'Fail', grade: 'F' },
    { id: 6, name: 'Frank Miller', predictedMarks: 73, status: 'Pass', grade: 'B' },
    { id: 7, name: 'Grace Wilson', predictedMarks: 88, status: 'Pass', grade: 'A-' },
    { id: 8, name: 'Henry Taylor', predictedMarks: 45, status: 'Fail', grade: 'F' }
  ];

  const handleDownloadReport = () => {
    console.log('Downloading report...');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <p className="dashboard-subtitle">Monitor student performance and AI predictions</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className={`stat-icon ${stat.colorClass}`}>
                  <Icon />
                </div>
                <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="results-section">
        <div className="results-header">
          <div className="results-title">
            <TrendingUp />
            Prediction Results
          </div>
          <button
            onClick={handleDownloadReport}
            className="download-button"
          >
            <Download />
            Download Report
          </button>
        </div>

        <table className="results-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Predicted Marks</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {predictionResults.map((student) => (
              <tr key={student.id}>
                <td className="student-name">{student.name}</td>
                <td className="student-marks">{student.predictedMarks}</td>
                <td>
                  <span className="grade-badge">{student.grade}</span>
                </td>
                <td>
                  <span className={`status-badge ${student.status.toLowerCase()}`}>
                    {student.status}
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