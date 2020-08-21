package com.atu1117.jee_final.controller;

import com.atu1117.jee_final.pojo.Msg;
import com.atu1117.jee_final.pojo.PracticeInfo;
import com.atu1117.jee_final.pojo.Question;
import com.atu1117.jee_final.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @PostMapping("/user/newQuestion")
    @ResponseBody
    public Msg newQuestion(@RequestBody Question question)
    {
        questionService.insertQuestionVerify(question);
        return Msg.success();
    }
    @PostMapping("/user/getPractice")
    @ResponseBody
    public List<Question> getQuestions(String type, int number)
    {
        List<Question> questions=new ArrayList<>();
        if(type.equals("all"))
        {
            questions=questionService.getQuestionAll(number);
        }
        return questions;
    }
    @PostMapping("/user/getAnswer")
    @ResponseBody
    public PracticeInfo getAnswer(@RequestBody PracticeInfo practiceInfo)
    {
        return questionService.getAnswer(practiceInfo);
    }
}
