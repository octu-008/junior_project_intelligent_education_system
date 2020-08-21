package com.atu1117.jee_final.pojo;

import java.io.Serializable;
//课程资源
public class Resource implements Serializable {
    private int id;//资源id
    private String path;//资源路径
    private int course;//资源课程id
    private String group;//资源分组

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public int getCourse() {
        return course;
    }

    public void setCourse(int course) {
        this.course = course;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }
}
