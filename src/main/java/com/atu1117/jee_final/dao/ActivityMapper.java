package com.atu1117.jee_final.dao;

import com.atu1117.jee_final.pojo.Activity;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityMapper {
    @Results(id="activityMap",value = {
            @Result(id=true,column = "id",property = "id"),
            @Result(column = "name",property = "name"),
            @Result(column = "courseid",property = "courseId"),
            @Result(column = "statement",property = "statement"),
            @Result(column = "sdate",property = "sDate"),
            @Result(column = "edate",property = "eDate"),
            @Result(column = "score",property = "score")
    })
    @Select("select * from activity")
    List<Activity> findAll();
}
