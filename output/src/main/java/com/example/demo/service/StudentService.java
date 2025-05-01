package com.example.demo.service;

import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

  @Autowired private StudentRepository studentRepository;

  // Create
  public Student createStudent(Student student) {
    return studentRepository.save(student);
  }

  // Read all
  public List<Student> getAllStudents() {
    return studentRepository.findAll();
  }

  // Read by ID
  public Optional<Student> getStudentById(Long id) {
    return studentRepository.findById(id);
  }

  // Update
  public Student updateStudent(Long id, Student updatedStudent) {
    return studentRepository
        .findById(id)
        .map(
            student -> {
              student.setFirstName(updatedStudent.getFirstName());
              student.setLastName(updatedStudent.getLastName());
              student.setEmail(updatedStudent.getEmail());
              student.setCourses(updatedStudent.getCourses());
              return studentRepository.save(student);
            })
        .orElse(null);
  }

  // Delete
  public boolean deleteStudent(Long id) {
    if (studentRepository.existsById(id)) {
      studentRepository.deleteById(id);
      return true;
    }
    return false;
  }
}
