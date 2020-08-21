package com.atu1117.jee_final.pojo;

import java.io.Serializable;
//课程
public class Course implements Serializable {
    private int id;//课程id
    private String name;//课程名字
    private String department;//课程所属院系
    private String statement;//课程简介
    private int teacherId;//课程老师

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public int getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(int teacherId) {
        this.teacherId = teacherId;
    }
}
