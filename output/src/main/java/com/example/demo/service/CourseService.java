package com.example.demo.service;

import com.example.demo.model.Course;
import com.example.demo.repository.CourseRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService {

  @Autowired private CourseRepository courseRepository;

  // Create
  public Course createCourse(Course course) {
    return courseRepository.save(course);
  }

  // Read all
  public List<Course> getAllCourses() {
    return courseRepository.findAll();
  }

  // Read by ID
  public Optional<Course> getCourseById(Long id) {
    return courseRepository.findById(id);
  }

  // Update
  public Course updateCourse(Long id, Course updatedCourse) {
    return courseRepository
        .findById(id)
        .map(
            course -> {
              course.setTitle(updatedCourse.getTitle());
              course.setDescription(updatedCourse.getDescription());
              return courseRepository.save(course);
            })
        .orElse(null);
  }

  // Delete
  public boolean deleteCourse(Long id) {
    if (courseRepository.existsById(id)) {
      courseRepository.deleteById(id);
      return true;
    }
    return false;
  }
}
