package com.atu1117.jee_final.dao;

import com.atu1117.jee_final.pojo.Question;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionMapper {
    @Results(id = "questionMap",value = {
            @Result(id=true,column = "id",property = "id"),
            @Result(column = "statement",property = "statement"),
            @Result(column = "exstate",property = "exState"),
            @Result(column = "type",property = "type"),
            @Result(column = "options",property = "options"),
            @Result(column = "answer",property = "answer"),
            @Result(column = "course",property = "course")
    })
    @Select("select * from question")
    List<Question> findAll();
    @Insert("insert into question(statement,exstate,type,options,answer,course)" +
            "values(#{statement},#{exState},#{type},#{options},#{answer},#{course})")
    void insert(Question question);
    @Select("select * from question where id=#{id}")
    @ResultMap(value = {"questionMap"})
    Question findById(int id);
}
