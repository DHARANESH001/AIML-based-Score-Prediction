package com.example.backend.service;

import com.example.backend.model.StudentData;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class MLService {

    public List<StudentData> getPrediction(List<StudentData> students){

        String url = "http://localhost:5000/predict"; // Python ML API

        RestTemplate restTemplate = new RestTemplate();

        StudentData[] response =
                restTemplate.postForObject(url, students, StudentData[].class);

        return Arrays.asList(response);
    }
}