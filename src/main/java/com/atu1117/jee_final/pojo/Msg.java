package com.atu1117.jee_final.pojo;
//通用消息类
public class Msg {
    private int code;//状态码，200成功，100失败
    private String message;//提示信息

    public static Msg success()
    {
        Msg result=new Msg();
        result.setCode(200);
        result.setMessage("处理成功");
        return result;
    }
    public static Msg fail()
    {
        Msg result=new Msg();
        result.setCode(100);
        result.setMessage("处理失败");
        return result;
    }
    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
