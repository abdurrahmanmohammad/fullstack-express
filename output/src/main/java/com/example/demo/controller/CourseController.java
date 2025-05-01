package com.example.demo.controller;

import com.example.demo.model.Course;
import com.example.demo.service.CourseService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

  @Autowired private CourseService courseService;

  @PostMapping
  public Course createCourse(@RequestBody Course course) {
    return courseService.createCourse(course);
  }

  @GetMapping
  public List<Course> getAllCourses() {
    return courseService.getAllCourses();
  }

  @GetMapping("/{id}")
  public Optional<Course> getCourseById(@PathVariable Long id) {
    return courseService.getCourseById(id);
  }

  @PutMapping("/{id}")
  public Course updateCourse(@PathVariable Long id, @RequestBody Course course) {
    return courseService.updateCourse(id, course);
  }

  @DeleteMapping("/{id}")
  public void deleteCourse(@PathVariable Long id) {
    courseService.deleteCourse(id);
  }
}
