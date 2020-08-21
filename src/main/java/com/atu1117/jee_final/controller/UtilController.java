package com.atu1117.jee_final.controller;

import com.atu1117.jee_final.pojo.Account;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
public class UtilController {
    @RequestMapping("/register")
    public String register()
    {
        return "page/user/register";
    }
    @RequestMapping("/")
    public String backLogin()
    {
        return "index";
    }

    @RequestMapping("/user/course_mgmt/new")
    public String toNewCourse()
    {
        return "page/user/new_course";
    }
    @RequestMapping("/user/question_new")
    public String toNewQuestion()
    {
        return "page/user/question_new";
    }
    @RequestMapping("/user/ready_practice")
    public String toReadyPractice()
    {
        return "page/user/ready_for_practice";
    }
    @PostMapping("/user/practice")
    public String toPractice(String type,String time, int number, int eachScore,Model model)
    {
        model.addAttribute("type",type);
        model.addAttribute("time",time);
        model.addAttribute("number",number);
        model.addAttribute("eachScore",eachScore);
        return "page/user/practice";
    }
}
