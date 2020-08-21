package com.atu1117.jee_final.dao;

import com.atu1117.jee_final.pojo.Record;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecordMapper {
    @Results(id = "recordMap",value = {
            @Result(column = "action",property = "action"),
            @Result(column = "score",property = "score"),
            @Result(column = "date",property = "date"),
            @Result(column = "id",property = "id")
    })
    @Select("select * from record")
    List<Record> findAll();
}
