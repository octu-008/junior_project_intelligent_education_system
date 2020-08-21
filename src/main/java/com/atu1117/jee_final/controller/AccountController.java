package com.atu1117.jee_final.controller;

import com.atu1117.jee_final.pojo.Account;
import com.atu1117.jee_final.pojo.Msg;
import com.atu1117.jee_final.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class AccountController {
    @Autowired
    private AccountService accountService;

    @PostMapping("/login")
    @ResponseBody
    public Msg loginVerify(String phone,String password,int type)
    {
        Msg result=accountService.loginVerify(phone, password, type);
        return result;
    }
    @RequestMapping("/user/{phone}")
    public String login(@PathVariable("phone") String phone, HttpSession session)
    {
        String path="";
        Account userOnline=accountService.findAccountByPhone(phone);
        if(userOnline.getType()==1)
        {
                path="page/user/main_s";
                session.setAttribute("userOnline",userOnline);
                return path;
        }
        else
        {
                path="page/user/main_t";
                session.setAttribute("userOnline",userOnline);
                return path;
        }
    }
    @PostMapping("/newRegister")
    @ResponseBody
    public Msg register(@RequestBody Account regAccount)
    {
        Msg result=accountService.registerVerify(regAccount);
        return result;
    }
}
