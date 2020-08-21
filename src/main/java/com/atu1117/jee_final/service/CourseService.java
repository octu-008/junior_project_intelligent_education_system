package com.atu1117.jee_final.service;

import com.atu1117.jee_final.pojo.Course;
import com.atu1117.jee_final.pojo.Msg;

import java.util.List;

public interface CourseService {
    Msg insertCourseVerify(Course newCourse);
    List<Course> getCourseByTeacherId(int id);
    Course getCourseById(int id);
}
