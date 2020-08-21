package com.atu1117.jee_final.dao;


import com.atu1117.jee_final.pojo.Course;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseMapper {
    @Results(id="courseMap",value = {
            @Result(id=true,column = "id",property = "id"),
            @Result(column = "name",property = "name"),
            @Result(column = "department",property = "department"),
            @Result(column = "statement",property = "statement"),
            @Result(column = "teacherid",property = "teacherId")
    })
    @Select("select * from course")
    List<Course> findAll();

    @Insert("insert into course (name,department,statement,teacherid) " +
            "values(#{name},#{department},#{statement},#{teacherId})")
    void insert(Course course);
    @Select("select * from course where teacherid =#{id}")
    @ResultMap(value={"courseMap"})
    List<Course> findCourseByTeacherId(int id);
    @Select("select * from course where id=#{id}")
    @ResultMap(value={"courseMap"})
    Course findCourseById(int id);
}
