package com.atu1117.jee_final.pojo;

import java.io.Serializable;
//选课信息
public class Selection implements Serializable {
    private int courseId;//课程id
    private int stuId;//选课学生id
    private int score;//学生课程得分
    private int group;//学生分组id

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public int getStuId() {
        return stuId;
    }

    public void setStuId(int stuId) {
        this.stuId = stuId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getGroup() {
        return group;
    }

    public void setGroup(int group) {
        this.group = group;
    }
}
