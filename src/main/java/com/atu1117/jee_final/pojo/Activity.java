package com.atu1117.jee_final.pojo;

import java.io.Serializable;
import java.util.Date;
//课程活动
public class Activity implements Serializable {
    private int id;//活动id
    private String name;//活动名字
    private int courseId;//课程id
    private String statement;//活动描述
    private Date sDate;//课程开始时间
    private Date eDate;//课程结束时间
    private int score;//活动分数

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

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public Date getsDate() {
        return sDate;
    }

    public void setsDate(Date sDate) {
        this.sDate = sDate;
    }

    public Date geteDate() {
        return eDate;
    }

    public void seteDate(Date eDate) {
        this.eDate = eDate;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
