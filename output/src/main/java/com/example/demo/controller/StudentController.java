package com.example.demo.controller;

import com.example.demo.model.Student;
import com.example.demo.service.StudentService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {

  @Autowired private StudentService studentService;

  @PostMapping
  public Student createStudent(@RequestBody Student student) {
    return studentService.createStudent(student);
  }

  @GetMapping
  public List<Student> getAllStudents() {
    return studentService.getAllStudents();
  }

  @GetMapping("/{id}")
  public Optional<Student> getStudentById(@PathVariable Long id) {
    return studentService.getStudentById(id);
  }

  @PutMapping("/{id}")
  public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
    return studentService.updateStudent(id, student);
  }

  @DeleteMapping("/{id}")
  public void deleteStudent(@PathVariable Long id) {
    studentService.deleteStudent(id);
  }
}
