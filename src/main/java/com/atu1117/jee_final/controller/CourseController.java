package com.atu1117.jee_final.controller;

import com.atu1117.jee_final.pojo.Account;
import com.atu1117.jee_final.pojo.Course;
import com.atu1117.jee_final.pojo.Msg;
import com.atu1117.jee_final.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class CourseController {
    @Autowired
    CourseService courseService;
    @PostMapping("/user/course_mgmt/newCourse")
    @ResponseBody
    public Msg newCourse(@RequestBody Course newCourse)
    {
        return courseService.insertCourseVerify(newCourse);
    }
    @RequestMapping("/user/course_mgmt")
    public String toCourseM(HttpSession session, Model model)
    {
        Account userOnline=(Account)session.getAttribute("userOnline");
        if(userOnline.getType()!=2)
        {
            return "index";
        }
        else
        {
            List<Course> courseList=courseService.getCourseByTeacherId(userOnline.getId());
            model.addAttribute("courseList",courseList);
            return "page/user/course_mgmt";
        }
    }
    @RequestMapping("/user/course_mgmt/{id}")
    public String TargetCourse(@PathVariable("id")int id,Model model)
    {
        String path="";
        Course target=courseService.getCourseById(id);
        model.addAttribute("targetCourse",target);
        path="/page/user/course_target_t";
        return path;
    }
    @GetMapping("/user/getCourse/{teacher}")
    @ResponseBody
    public List<Course> getCourseForSelect(@PathVariable("teacher")int teacher)
    {
        return courseService.getCourseByTeacherId(teacher);
    }
}
