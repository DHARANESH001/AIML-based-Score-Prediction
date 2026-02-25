from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load("student_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    results = []

    for student in data:
        extracurricular = 1 if student["extracurricular"] == "yes" else 0

        features = np.array([[
            float(student["hoursStudied"]),
            float(student["previousScores"]),
            extracurricular,
            float(student["sleepHours"]),
            float(student["sampleQuestions"])
        ]])

        prediction = model.predict(features)[0]

        student["predictedScore"] = round(prediction,2)
        results.append(student)

    return jsonify(results)

if __name__ == "__main__":
    app.run(port=5000, debug=True)