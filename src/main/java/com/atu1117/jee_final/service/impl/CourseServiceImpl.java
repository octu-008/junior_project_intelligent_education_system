package com.atu1117.jee_final.service.impl;

import com.atu1117.jee_final.dao.CourseMapper;
import com.atu1117.jee_final.pojo.Course;
import com.atu1117.jee_final.pojo.Msg;
import com.atu1117.jee_final.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("courseService")
public class CourseServiceImpl implements CourseService {
    @Autowired
    CourseMapper courseMapper;
    @Override
    public Msg insertCourseVerify(Course newCourse) {
        Msg result;
        courseMapper.insert(newCourse);
        result=Msg.success();
        return result;
    }

    @Override
    public List<Course> getCourseByTeacherId(int id) {
        return courseMapper.findCourseByTeacherId(id);
    }

    @Override
    public Course getCourseById(int id) {
        return courseMapper.findCourseById(id);
    }
}
