import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
import joblib

# load dataset
data = pd.read_csv("student_data.csv")

X = data[["hoursStudied","previousScores","extracurricular","sleepHours","sampleQuestions"]]
y = data["finalScore"]

# split training & testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# train model
model = LinearRegression()
model.fit(X_train, y_train)

# prediction on test data
y_pred = model.predict(X_test)

# calculate R2 score
r2 = r2_score(y_test, y_pred)

print("Model R2 Score:", r2)

# save model
joblib.dump(model, "student_model.pkl")
print("Model saved successfully")