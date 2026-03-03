import { useState } from "react";
import {
  Upload,
  Calculator,
  BookOpen,
  Brain,
  Moon,
  FileText,
  TrendingUp,
  Plus,
  Trash2,
} from "lucide-react";
import API from "../services/api";
export default function StudentDataUpload() {
  const [students, setStudents] = useState([
    {
      id: 1,
      hoursStudied: "",
      previousScores: "",
      extracurricular: "",
      sleepHours: "",
      sampleQuestions: "",
      predictedScore: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  // 🔥 Handle Input Change
  const handleInputChange = (id, field, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };
  // 🔥 Add Student
  const addStudent = () => {
    const newId =
      students.length > 0
        ? Math.max(...students.map((s) => s.id)) + 1
        : 1;
    setStudents([
      ...students,
      {
        id: newId,
        hoursStudied: "",
        previousScores: "",
        extracurricular: "",
        sleepHours: "",
        sampleQuestions: "",
        predictedScore: "",
      },
    ]);
  };
  // 🔥 Remove Student
  const removeStudent = (id) => {
    if (students.length > 1) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };
  // 🔥 Submit to Backend (Spring → Python → DB)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Remove frontend-only fields before sending
      const payload = students.map(
        ({
          id,
          hoursStudied,
          previousScores,
          extracurricular,
          sleepHours,
          sampleQuestions,
        }) => ({
          hoursStudied,
          previousScores,
          extracurricular,
          sleepHours,
          sampleQuestions,
        })
      );
      const res = await API.post("/predict", payload);
      // Map predictedScore from backend
      const updatedStudents = res.data.map((student, index) => ({
        ...students[index],
        predictedScore: student.predictedScore.toFixed(1),
      }));
      setStudents(updatedStudents);
      alert("Prediction Completed ✅");
    } catch (error) {
      console.error(error);
      alert("Prediction Failed ❌");
    }
    setLoading(false);
  };
  return (
    <div className="student-upload-container">
      <div className="student-upload-header">
        <div className="header-content">
          <div className="header-icon">
            <Upload />
          </div>
          <div>
            <h1 className="page-title">Student Data Upload</h1>
            <p className="page-subtitle">
              Enter student data and predict final semester score
            </p>
          </div>
        </div>
      </div>
      <div className="student-upload-content">
        <form onSubmit={handleSubmit} className="student-form">
          <div className="students-grid">
            {students.map((student, index) => (
              <div key={student.id} className="student-card">
                <div className="card-header">
                  <h3>Student {index + 1}</h3>
                  {students.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStudent(student.id)}
                      className="remove-button"
                    >
                      <Trash2 />
                    </button>
                  )}
                </div>
                <div className="form-grid">
                  <InputField
                    label="Hours Studied"
                    icon={<BookOpen />}
                    type="number"
                    value={student.hoursStudied}
                    onChange={(e) =>
                      handleInputChange(
                        student.id,
                        "hoursStudied",
                        e.target.value
                      )
                    }
                  />
                  <InputField
                    label="Previous Scores"
                    icon={<TrendingUp />}
                    type="number"
                    value={student.previousScores}
                    onChange={(e) =>
                      handleInputChange(
                        student.id,
                        "previousScores",
                        e.target.value
                      )
                    }
                  />
                  <SelectField
                    label="Extracurricular"
                    icon={<Brain />}
                    value={student.extracurricular}
                    onChange={(e) =>
                      handleInputChange(
                        student.id,
                        "extracurricular",
                        e.target.value
                      )
                    }
                  />
                  <InputField
                    label="Sleep Hours"
                    icon={<Moon />}
                    type="number"
                    value={student.sleepHours}
                    onChange={(e) =>
                      handleInputChange(
                        student.id,
                        "sleepHours",
                        e.target.value
                      )
                    }
                  />
                  <InputField
                    label="Sample Question Papers"
                    icon={<FileText />}
                    type="number"
                    value={student.sampleQuestions}
                    onChange={(e) =>
                      handleInputChange(
                        student.id,
                        "sampleQuestions",
                        e.target.value
                      )
                    }
                  />
                  {/* 🔥 Predicted Score */}
                  <div className="form-group">
                    <label className="form-label">
                      <Calculator className="label-icon" />
                      Predicted Final Score
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={student.predictedScore}
                      readOnly
                      placeholder="Prediction will appear here"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="form-actions">
            <button type="button" onClick={addStudent} className="add-student-button">
              <Plus /> Add Student
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Predicting..." : "Upload & Predict"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
/* 🔥 Reusable Components */
function InputField({ label, icon, type, value, onChange }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {icon} {label}
      </label>
      <input type={type} className="form-input" value={value} onChange={onChange} required />
    </div>
  );
}
function SelectField({ label, icon, value, onChange }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {icon} {label}
      </label>
      <select className="form-select" value={value} onChange={onChange} required>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  );
}