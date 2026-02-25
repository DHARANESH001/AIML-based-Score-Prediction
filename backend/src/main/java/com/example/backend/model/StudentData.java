package com.example.backend.model;

public class StudentData {

    private double hoursStudied;
    private double previousScores;
    private String extracurricular;
    private double sleepHours;
    private double sampleQuestions;
    private double predictedScore;

    // GETTERS & SETTERS

    public double getHoursStudied() {
        return hoursStudied;
    }

    public void setHoursStudied(double hoursStudied) {
        this.hoursStudied = hoursStudied;
    }

    public double getPreviousScores() {
        return previousScores;
    }

    public void setPreviousScores(double previousScores) {
        this.previousScores = previousScores;
    }

    public String getExtracurricular() {
        return extracurricular;
    }

    public void setExtracurricular(String extracurricular) {
        this.extracurricular = extracurricular;
    }

    public double getSleepHours() {
        return sleepHours;
    }

    public void setSleepHours(double sleepHours) {
        this.sleepHours = sleepHours;
    }

    public double getSampleQuestions() {
        return sampleQuestions;
    }

    public void setSampleQuestions(double sampleQuestions) {
        this.sampleQuestions = sampleQuestions;
    }

    public double getPredictedScore() {
        return predictedScore;
    }

    public void setPredictedScore(double predictedScore) {
        this.predictedScore = predictedScore;
    }
}