package com.example.demo.service;

import com.example.demo.model.Teacher;
import com.example.demo.repository.TeacherRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {

  @Autowired private TeacherRepository teacherRepository;

  // Create
  public Teacher createTeacher(Teacher teacher) {
    return teacherRepository.save(teacher);
  }

  // Read all
  public List<Teacher> getAllTeachers() {
    return teacherRepository.findAll();
  }

  // Read by ID
  public Optional<Teacher> getTeacherById(Long id) {
    return teacherRepository.findById(id);
  }

  // Update
  public Teacher updateTeacher(Long id, Teacher updatedTeacher) {
    return teacherRepository
        .findById(id)
        .map(
            teacher -> {
              teacher.setFirstName(updatedTeacher.getFirstName());
              teacher.setLastName(updatedTeacher.getLastName());
              teacher.setEmail(updatedTeacher.getEmail());
              teacher.setCourses(updatedTeacher.getCourses());
              return teacherRepository.save(teacher);
            })
        .orElse(null);
  }

  // Delete
  public boolean deleteTeacher(Long id) {
    if (teacherRepository.existsById(id)) {
      teacherRepository.deleteById(id);
      return true;
    }
    return false;
  }
}
