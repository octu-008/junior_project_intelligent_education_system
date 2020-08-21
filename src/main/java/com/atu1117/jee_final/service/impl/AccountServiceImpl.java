package com.atu1117.jee_final.service.impl;

import com.atu1117.jee_final.dao.AccountMapper;
import com.atu1117.jee_final.pojo.Account;
import com.atu1117.jee_final.pojo.Msg;
import com.atu1117.jee_final.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service("accountService")
public class AccountServiceImpl implements AccountService {
    @Autowired
    AccountMapper accountMapper;
    @Override
    public List<Account> findAllAccount() {
        return accountMapper.findAll();
    }

    @Override
    public Msg loginVerify(String phone, String password,int type) {
        Account target=accountMapper.findAccountByPhone(phone);
        if(target !=null)
        {
            if (target.getType() == type )
            {
                if(target.getPassword().equals(password))
                {
                    Msg result=Msg.success();
                    return result;
                }
                else
                {
                    Msg result=Msg.fail();
                    result.setMessage("用户密码错误");
                    return result;
                }
            }
            else {
                Msg result=Msg.fail();
                result.setMessage("用户类型有误");
                return result;
            }
        }
        else
        {
            Msg result=Msg.fail();
            result.setMessage("未找到该用户");
         return result;
        }
    }

    @Override
    public Account findAccountByPhone(String phone) {
        return accountMapper.findAccountByPhone(phone);
    }

    @Override
    public Msg registerVerify(Account account) {
        Msg result;
        Account exist=accountMapper.findAccountByPhone(account.getPhone());
        if(exist == null)
        {
            accountMapper.insert(account);
            result=Msg.success();
            return result;
        }
        else
        {
            result=Msg.fail();
            result.setMessage("该手机已被注册");
            return result;
        }
    }
}
