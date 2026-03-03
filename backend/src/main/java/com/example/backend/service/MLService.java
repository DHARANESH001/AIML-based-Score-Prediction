package com.example.backend.service;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.backend.model.StudentData;
import com.example.backend.repository.StudentRepository;
@Service
public class MLService {
    @Autowired
    private StudentRepository studentRepository;
    public List<StudentData> getPrediction(List<StudentData> students){
        String url = "http://localhost:5000/predict"; // Python ML API
        RestTemplate restTemplate = new RestTemplate();
        StudentData[] response =
                restTemplate.postForObject(url, students, StudentData[].class);
        List<StudentData> predictedStudents = Arrays.asList(response);
        // 🔥 Save predictions into MySQL
        studentRepository.saveAll(predictedStudents);
        return predictedStudents;
    }
}