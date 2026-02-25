import { useState } from 'react';
import { Upload, Calculator, BookOpen, Brain, Moon, FileText, TrendingUp, Plus, Trash2 } from 'lucide-react';
import API from "../services/api";

export default function StudentDataUpload() {
  const [students, setStudents] = useState([
    {
      id: 1,
      hoursStudied: '',
      previousScores: '',
      extracurricular: '',
      sleepHours: '',
      sampleQuestions: '',
      performanceIndex: ''
    }
  ]);

  const handleInputChange = (id, field, value) => {
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id === id) {
          const updatedStudent = { ...student, [field]: value };
          
          // Calculate performance index when all fields are filled
          if (field !== 'performanceIndex') {
            const { hoursStudied, previousScores, extracurricular, sleepHours, sampleQuestions } = updatedStudent;
            updatedStudent.performanceIndex = calculatePerformanceIndex(
              hoursStudied, 
              previousScores, 
              extracurricular, 
              sleepHours, 
              sampleQuestions
            );
          }
          
          return updatedStudent;
        }
        return student;
      })
    );
  };

  const addStudent = () => {
    const newId = Math.max(...students.map(s => s.id)) + 1;
    setStudents([...students, {
      id: newId,
      hoursStudied: '',
      previousScores: '',
      extracurricular: '',
      sleepHours: '',
      sampleQuestions: '',
      performanceIndex: ''
    }]);
  };

  const removeStudent = (id) => {
    if (students.length > 1) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/predict", students);

    // Map backend response to frontend format
    const updatedStudents = res.data.map(student => ({
      ...student,
      performanceIndex: student.predictedScore.toFixed(1)
    }));

    setStudents(updatedStudents);
    alert("Prediction Completed");

  } catch {
    alert("Prediction failed");
  }
};

  return (
    <div className="student-upload-container">
      <div className="student-upload-header">
        <div className="header-content">
          <div className="header-icon">
            <Upload />
          </div>
          <div className="header-text">
            <h1 className="page-title">Student Data Upload</h1>
            <p className="page-subtitle">Enter student information to calculate performance index</p>
          </div>
        </div>
      </div>

      <div className="student-upload-content">
        <form onSubmit={handleSubmit} className="student-form">
          <div className="students-grid">
            {students.map((student, index) => (
              <div key={student.id} className="student-card">
                <div className="card-header">
                  <h3 className="card-title">Student {index + 1}</h3>
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
                  <div className="form-group">
                    <label className="form-label">
                      <BookOpen className="label-icon" />
                      Hours Studied
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      className="form-input"
                      placeholder="Enter hours studied"
                      value={student.hoursStudied}
                      onChange={(e) => handleInputChange(student.id, 'hoursStudied', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <TrendingUp className="label-icon" />
                      Previous Scores
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      className="form-input"
                      placeholder="Enter previous scores"
                      value={student.previousScores}
                      onChange={(e) => handleInputChange(student.id, 'previousScores', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Brain className="label-icon" />
                      Extracurricular Activities
                    </label>
                    <select
                      className="form-select"
                      value={student.extracurricular}
                      onChange={(e) => handleInputChange(student.id, 'extracurricular', e.target.value)}
                      required
                    >
                      <option value="">Select option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Moon className="label-icon" />
                      Sleep Hours
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      className="form-input"
                      placeholder="Enter sleep hours"
                      value={student.sleepHours}
                      onChange={(e) => handleInputChange(student.id, 'sleepHours', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FileText className="label-icon" />
                      Sample Question Papers Practiced
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      className="form-input"
                      placeholder="Enter number of papers"
                      value={student.sampleQuestions}
                      onChange={(e) => handleInputChange(student.id, 'sampleQuestions', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Calculator className="label-icon" />
                      Performance Index
                    </label>
                    <div className="performance-display">
                      <input
                        type="text"
                        className="form-input performance-input"
                        value={student.performanceIndex}
                        readOnly
                        placeholder="Calculated automatically"
                      />
                      {student.performanceIndex && (
                        <div className={`performance-badge ${getPerformanceLevel(student.performanceIndex)}`}>
                          {getPerformanceLevel(student.performanceIndex)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" onClick={addStudent} className="add-student-button">
              <Plus />
              Add Another Student
            </button>
            <button type="submit" className="submit-button">
              <Upload />
              Upload Student Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function calculatePerformanceIndex(hoursStudied, previousScores, extracurricular, sleepHours, sampleQuestions) {
  const extra = extracurricular === "yes" ? 10 : 0;
  const prediction = 
    (parseFloat(hoursStudied) * 4.5) +
    (parseFloat(previousScores) * 0.4) +
    extra +
    (parseFloat(sleepHours) * 1.5) +
    (parseFloat(sampleQuestions) * 2);
  
  return Math.min(100, prediction).toFixed(1);
}

function getPerformanceLevel(index) {
  const numIndex = parseFloat(index);
  if (numIndex >= 90) return 'Excellent';
  if (numIndex >= 80) return 'Very Good';
  if (numIndex >= 70) return 'Good';
  if (numIndex >= 60) return 'Average';
  if (numIndex >= 50) return 'Below Average';
  return 'Poor';
}
