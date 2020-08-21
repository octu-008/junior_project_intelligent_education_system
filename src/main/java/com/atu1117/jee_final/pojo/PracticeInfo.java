package com.atu1117.jee_final.pojo;

import java.io.Serializable;

public class PracticeInfo implements Serializable {
    private String[] qid;
    private String[] o_p;
    private String[] answer;

    public String[] getQid() {
        return qid;
    }

    public void setQid(String[] qid) {
        this.qid = qid;
    }

    public String[] getO_p() {
        return o_p;
    }

    public void setO_p(String[] o_p) {
        this.o_p = o_p;
    }

    public String[] getAnswer() {
        return answer;
    }

    public void setAnswer(String[] answer) {
        this.answer = answer;
    }
}
