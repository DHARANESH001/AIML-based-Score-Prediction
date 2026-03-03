package com.example.backend.controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.backend.model.StudentData;
import com.example.backend.repository.StudentRepository;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PredictionController {
    @Autowired
    private StudentRepository studentRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    // 🔥 PREDICTION ENDPOINT
    @PostMapping("/predict")
    public List<StudentData> predict(@RequestBody List<StudentData> students) {
        String flaskUrl = "http://127.0.0.1:5000/predict";
        ResponseEntity<Map> response =
                restTemplate.postForEntity(flaskUrl, students, Map.class);
        Map<String, Object> body = response.getBody();
        if (body == null || body.get("predictions") == null) {
            throw new RuntimeException("Flask API returned invalid response");
        }
        List<Map<String, Object>> predictions =
                (List<Map<String, Object>>) body.get("predictions");
        for (int i = 0; i < students.size(); i++) {
            Double predictedScore =
                    Double.valueOf(predictions.get(i)
                            .get("predictedScore").toString());
            students.get(i).setPredictedScore(predictedScore);
            studentRepository.save(students.get(i));
        }
        return students;
    }
    // 🔥 FETCH ALL PREDICTIONS
    @GetMapping("/predictions")
    public List<StudentData> getAllPredictions() {
        return studentRepository.findAll();
    }
    // 🔥 FETCH MODEL R2 (NEW FIXED ENDPOINT)
    @GetMapping("/model-r2")
    public Map<String, Double> getModelR2() {
        String flaskUrl = "http://127.0.0.1:5000/model-r2";
        ResponseEntity<Map> response =
                restTemplate.getForEntity(flaskUrl, Map.class);
        Map<String, Object> body = response.getBody();
        if (body == null || body.get("r2") == null) {
            throw new RuntimeException("Unable to fetch R2 from Flask");
        }
        Double r2 =
                Double.valueOf(body.get("r2").toString());
        return Map.of("r2", r2);
    }
}