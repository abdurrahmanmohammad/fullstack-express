package com.example.demo.model;

import jakarta.persistence.*;
import java.util.List;
import lombok.Data;

@Data
@Entity
public class Teacher {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String firstName;
  private String lastName;
  private String email;
  @ManyToMany private List<Course> courses;
}
