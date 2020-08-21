package com.atu1117.jee_final.dao;

import com.atu1117.jee_final.pojo.Account;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountMapper {
    /**
     * 查询所有用户账号
     * @return
     */
    @Results(id="accountMap",value = {
            @Result(id=true,column = "id",property = "id"),
            @Result(column = "phone",property = "phone"),
            @Result(column = "password",property = "password"),
            @Result(column = "type",property = "type"),
            @Result(column = "imgpath",property = "imgPath")
    })
    @Select("select * from account")
    List<Account> findAll();
    @Select("select * from account where phone=#{phone}")
    @ResultMap(value = {"accountMap"})
    Account findAccountByPhone(@Param("phone") String phone);

    @Insert("insert into account(phone,username,password,type,imgpath) " +
            "values(#{phone},#{username},#{password},#{type},#{imgPath}) ")
    void insert(Account account);
}
