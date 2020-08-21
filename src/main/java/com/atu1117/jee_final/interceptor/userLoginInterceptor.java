package com.atu1117.jee_final.interceptor;

import com.atu1117.jee_final.pojo.Account;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;

public class userLoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session=request.getSession();
        if(session.getAttribute("userOnline")==null)
        {
            return false;
        }
        else
        {
            Account userOnline=(Account)session.getAttribute("userOnline");
            Map pathVariables=(Map)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
            String pathPhone=(String)pathVariables.get("phone");
            if (userOnline.equals(pathPhone))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
