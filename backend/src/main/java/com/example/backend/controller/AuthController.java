package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")  // ⭐ ADD THIS LINE
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody User user){
        userService.register(user);
        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public Object login(@RequestBody User user){
        Optional<User> loggedUser = userService.login(user.getEmail(), user.getPassword());

        if(loggedUser.isPresent()){
            return loggedUser.get();
        } else {
            return "Invalid Email or Password";
        }
    }
}