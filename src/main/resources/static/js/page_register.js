//点击注册
$("#register_confirm").click(function () {
    register();
});
//返回登录页面
$("#back_login").click(function () {
    $(window).attr("location","/IEducation");
});
//检验注册信息
function register() {
    if(check())
    {
        $("#register_message").removeClass("unqualified");
        $("#register_message").text("*注册中，请稍等..");
        disableInput();
        var data=JSON.stringify({id:0,phone:$("#phone").val(),username:$("#username").val(),
                                        password:$("#password").val(),type:parseInt($("input:radio:checked").val()),
                                        imgPath:"/img/baseImg.jpg"});
        $.ajax({
            url: "newRegister",
            type: "POST",
            data: data,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                if(result.code==200)
                {
                    registerSuccess();
                }
                else
                {
                    registerFail(result);
                }
            }
        });
    }
    else
    {
        $("#register_message").addClass("unqualified");
        $("#register_message").text("*注册失败，请检查注册信息是否有误或未填写*");
    }
}
//检查注册信息是否完整
function check() {
    if($("#phone").val().length != 11 || $("#password").val().length<4 || $("#password").val().length>16
        || $("#username").val().length<1 || $("#username").val().length>25
    || $("#rPassword").val() != $("#password").val())
    {
        return false;
    }
    else
    {
        return true;
    }
}
//检查手机号码的输入
$("#phone").keyup(function () {
   if($(this).val().length == 11)
   {
       $("#phoneHelpMessage").removeClass("unqualified");
   }
   else
   {
       $("#phoneHelpMessage").addClass("unqualified");
   }
});
//检查输入密码格式是否正确
$("#password").keyup(function () {
    if($(this).val().length>=4 && $(this).val().length <=16)
    {
        $("#passwordHelpMessage").removeClass("unqualified");
    }
    else
    {
        $("#passwordHelpMessage").addClass("unqualified");
    }
});
//检查再次输入密码是否一致
$("#rPassword").keyup(function () {
    if($(this).val() == $("#password").val())
    {
        $("#rPasswordHelpMessage").removeClass("unqualified");
    }
    else
    {
        $("#rPasswordHelpMessage").addClass("unqualified");
    }
});
//检查用户名格式是否正确
$("#username").keyup(function () {
    if($(this).val().length>=1 && $(this).val().length<=25)
    {
        $("#usernameHelpMessage").removeClass("unqualified");
    }
    else
    {
        $("#usernameHelpMessage").addClass("unqualified");
    }
});
//注册成功后将所有输入框转换为disable状态
function disableInput() {
    $("#register_main").children("div.form-group").children("input").attr("disabled",true);
    $("#register_main").children("button").attr("disabled",true);
}
//去除所有输入框的disable状态
function awakenInput() {
    $("#register_main").children("div.form-group").children("input").attr("disabled",false);
    $("#register_main").children("button").attr("disabled",false);
}
//提示注册成功
function registerSuccess() {
    $("#register_message").text("*注册成功！请返回登录页面*");
}
//提示注册失败以及失败原因
function registerFail(result) {
    awakenInput();
    $("#register_message").text("*注册失败:"+result.message+"*");
}