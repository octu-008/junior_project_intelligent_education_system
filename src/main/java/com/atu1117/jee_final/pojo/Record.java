package com.atu1117.jee_final.pojo;

import java.io.Serializable;
import java.util.Date;
//活动记录
public class Record implements Serializable {
    private String action;//活动内容
    private int score;//活动分数
    private Date date;//活动日期
    private int id;//活动人id

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
