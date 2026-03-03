from flask import Flask, request, jsonify
import joblib
app = Flask(__name__)
# Load model
model = joblib.load("student_model.pkl")
# Load saved R2
MODEL_R2 = joblib.load("model_r2.pkl")
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    results = []
    for student in data:
        extra = 1 if student["extracurricular"] == "yes" else 0
        features = [[
            float(student["hoursStudied"]),
            float(student["previousScores"]),
            extra,
            float(student["sleepHours"]),
            float(student["sampleQuestions"])
        ]]
        prediction = model.predict(features)[0]
        results.append({
            "predictedScore": float(prediction)
        })
    return jsonify({
        "predictions": results
    })
@app.route("/model-r2", methods=["GET"])
def get_model_r2():
    return jsonify({
        "r2": round(MODEL_R2 * 100, 2)
    })
if __name__ == "__main__":
    app.run(debug=True)