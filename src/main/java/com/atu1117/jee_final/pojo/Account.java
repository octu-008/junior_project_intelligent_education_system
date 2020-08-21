package com.atu1117.jee_final.pojo;

import java.io.Serializable;
//用户账号
public class Account implements Serializable {
    private int id;//用户id
    private String phone;//用户手机号码
    private String username;//用户名
    private String password;//用户密码
    private int type;//用户类型
    private String imgPath;//用户头像图片路径

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }
}
