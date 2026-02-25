package com.example.backend.controller;

import com.example.backend.model.StudentData;
import com.example.backend.service.MLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PredictionController {

    @Autowired
    private MLService mlService;

    @PostMapping("/predict")
    public List<StudentData> predict(@RequestBody List<StudentData> students){
        return mlService.getPrediction(students);
    }
}