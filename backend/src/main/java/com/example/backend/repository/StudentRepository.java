package com.example.backend.repository;
import com.example.backend.model.StudentData;
import org.springframework.data.jpa.repository.JpaRepository;
public interface StudentRepository extends JpaRepository<StudentData, Long> {
}