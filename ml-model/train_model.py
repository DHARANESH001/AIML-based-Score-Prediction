import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import numpy as np
# Load dataset
df = pd.read_csv("student_data.csv")
print("Original shape:", df.shape)
# Clean whitespace
df = df.apply(lambda x: x.str.strip() if x.dtype == "object" else x)
# Replace empty strings with NaN
df.replace("", np.nan, inplace=True)
# Convert extracurricular safely (only if it's string)
if df["extracurricular"].dtype == "object":
    df["extracurricular"] = df["extracurricular"].str.lower()
    df["extracurricular"] = df["extracurricular"].map({"yes": 1, "no": 0})
# Convert all numeric columns safely
numeric_cols = [
    "hoursStudied",
    "previousScores",
    "sleepHours",
    "sampleQuestions",
    "finalScore"
]
for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors="coerce")
# 🔥 Drop any remaining NaN rows
df = df.dropna()
print("After cleaning shape:", df.shape)
# Features
X = df[[
    "hoursStudied",
    "previousScores",
    "extracurricular",
    "sleepHours",
    "sampleQuestions"
]]
# Target
y = df["finalScore"]
# Final safety check
print("Any NaN left in X?", X.isnull().values.any())
print("Any NaN left in y?", y.isnull().values.any())
# Train test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
# Train model
model = LinearRegression()
model.fit(X_train, y_train)
# Evaluate
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
# Save model
joblib.dump(model, "student_model.pkl")
joblib.dump(r2, "model_r2.pkl")
print("✅ Model trained successfully")
print("R2 Score:", round(r2, 4))