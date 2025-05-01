package com.example.demo.controller;

import com.example.demo.model.Teacher;
import com.example.demo.service.TeacherService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

  @Autowired private TeacherService teacherService;

  @PostMapping
  public Teacher createTeacher(@RequestBody Teacher teacher) {
    return teacherService.createTeacher(teacher);
  }

  @GetMapping
  public List<Teacher> getAllTeachers() {
    return teacherService.getAllTeachers();
  }

  @GetMapping("/{id}")
  public Optional<Teacher> getTeacherById(@PathVariable Long id) {
    return teacherService.getTeacherById(id);
  }

  @PutMapping("/{id}")
  public Teacher updateTeacher(@PathVariable Long id, @RequestBody Teacher teacher) {
    return teacherService.updateTeacher(id, teacher);
  }

  @DeleteMapping("/{id}")
  public void deleteTeacher(@PathVariable Long id) {
    teacherService.deleteTeacher(id);
  }
}
