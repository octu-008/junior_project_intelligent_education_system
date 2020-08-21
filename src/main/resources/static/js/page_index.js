$(document).ready(
    function()
    {
        //登录
        $("#login").click(
            function () {
                login();
            }
        );
        //前往注册页面
        $("#register").click(
            function()
            {
                $(window).attr("location","register");
            }
        );
        //登录检测
        function login() {
            if (checkNull())
            {
                $.ajax({
                    url: "login",
                    type: "POST",
                    data: "phone="+$("#phone").val()+
                        "&password="+$("#password").val()+
                        "&type="+parseInt($("input:radio:checked").val()),
                    dataType: "json",
                    success: function (result) {
                        if(result.code==200)
                        {
                            $(window).attr("location","user/"+$("#phone").val());
                        }
                        else
                        {
                            $("#loginErrorMsg").text(result.message);
                        }
                    }
                })
            }
            else
            {
                $("#loginErrorMsg").text("*登录信息不能为空*")
            }
        }
        //查看输入框是否为空
        function checkNull()
        {
            if(($("#phone").val()=="") || ($("#password").val() == ""))
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
)
