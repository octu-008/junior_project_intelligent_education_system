package com.atu1117.jee_final.service;

import com.atu1117.jee_final.pojo.Msg;
import com.atu1117.jee_final.pojo.PracticeInfo;
import com.atu1117.jee_final.pojo.Question;

import java.util.List;

public interface QuestionService {
    Msg insertQuestionVerify(Question question);
    List<Question> getQuestionAll(int number);
    PracticeInfo getAnswer(PracticeInfo practiceInfo);
}
