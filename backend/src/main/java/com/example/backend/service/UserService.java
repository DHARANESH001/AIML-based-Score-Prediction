package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register user
    public User register(User user) {
        return userRepository.save(user);
    }

    // Login check
    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent() && user.get().getPassword().equals(password)){
            return user;
        }
        return Optional.empty();
    }
}