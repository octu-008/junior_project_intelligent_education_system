package com.atu1117.jee_final.pojo;

import java.io.Serializable;
//测试题
public class Question implements Serializable {
    private int id;//题目id
    private String statement;//题目说明
    private String exState;//题目补充说明
    private String type;//题目类型
    private String options;//题目选项
    private String answer;//题目答案
    private int course;//题目相关课程id

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public String getExState() {
        return exState;
    }

    public void setExState(String exState) {
        this.exState = exState;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public int getCourse() {
        return course;
    }

    public void setCourse(int course) {
        this.course = course;
    }
}
