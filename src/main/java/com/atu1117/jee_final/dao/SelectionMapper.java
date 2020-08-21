package com.atu1117.jee_final.dao;

import com.atu1117.jee_final.pojo.Selection;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SelectionMapper {
    @Results(id="selectionMap",value = {
            @Result(column = "courseid",property = "courseId"),
            @Result(column = "stuid",property = "stuId"),
            @Result(column = "score",property = "score"),
            @Result(column = "group",property = "group")
    })
    @Select("select * from selection")
    List<Selection> findAll();
}
