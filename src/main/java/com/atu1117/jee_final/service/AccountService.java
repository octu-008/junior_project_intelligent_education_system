package com.atu1117.jee_final.service;

import com.atu1117.jee_final.pojo.Account;
import com.atu1117.jee_final.pojo.Msg;

import java.util.List;

public interface AccountService {
    /**
     * 查询所有用户
     * @return
     */
    List<Account> findAllAccount();

    /**
     * 验证登录信息
     * @param phone
     * @param password
     * @param type
     * @return
     */
    Msg loginVerify(String phone,String password,int type);

    /**
     * 根据用户手机查询用户账号
     * @param phone
     * @return
     */
    Account findAccountByPhone(String phone);

    Msg registerVerify(Account account);
}
