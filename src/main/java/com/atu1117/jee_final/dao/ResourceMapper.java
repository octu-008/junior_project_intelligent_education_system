package com.atu1117.jee_final.dao;

import com.atu1117.jee_final.pojo.Resource;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceMapper {
    @Results(id="resourceMap",value = {
            @Result(id = true,column = "id",property = "id"),
            @Result(column = "path",property = "path"),
            @Result(column = "course",property = "course"),
            @Result(column = "group",property = "group")
    })
    @Select("select * from resource")
    List<Resource> findAll();
}
