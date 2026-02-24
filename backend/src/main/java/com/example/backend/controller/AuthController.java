package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.security.JwtUtil;
import com.example.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired   // ⭐ VERY IMPORTANT (you missed this)
    private UserService userService;

    // 🔷 REGISTER
    @PostMapping("/register")
    public String register(@RequestBody User user){
        userService.register(user);
        return "User Registered Successfully";
    }

    // 🔷 LOGIN WITH JWT
    @PostMapping("/login")
    public Object login(@RequestBody User user) {

        Optional<User> loggedUser =
                userService.login(user.getEmail(), user.getPassword());

        if (loggedUser.isPresent()) {

            String token = jwtUtil.generateToken(user.getEmail());

            return Map.of(
                    "token", token,
                    "email", loggedUser.get().getEmail(),
                    "name", loggedUser.get().getName()
            );
        }

        return "Invalid Email or Password";
    }
}