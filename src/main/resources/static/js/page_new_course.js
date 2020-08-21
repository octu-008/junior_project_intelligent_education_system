//执行新增课程
$("#new_course_confirm").click(function () {
    new_course();
});
//返回课程管理页面
$("#backMMain").click(function () {
    $(window).attr("location","../course_mgmt");
});
//检验并发送新增课程请求
function new_course() {
    if (check()) {
        $("#new_course_message").removeClass("unqualified");
        $("#new_course_message").text("*新增中，请稍等..*");
        disableInput();
        var data=JSON.stringify({id:0,name:$("#name").val(),
                                             department:$("#department").val(),
                                             statement:$("#statement").val(),
                                             teacherId:parseInt($("#user_id").text())
                                             });
        $.ajax({
            url: "newCourse",
            type: "POST",
            data: data,
            contentType: "application/json;charset=UTF-8",
            dataType:"json",
            success:function (result) {
                if(result.code==200)
                {
                    newCourseSuccess();
                }
                else
                {
                    newCourseFail();
                }
            }
            }
        );
    }
    else
    {
        $("#new_course_message").addClass("unqualified");
        $("#new_course_message").text("*新增课程失败，请检查课程信息是否有误或未填写*")
    }
}
//检测课程信息的输入是否达标
function check () {
    if( $("#name").val().length<1 || $("#name").val().length>50 || $("#department").val().length<1
    || $("#department").val().length>36 || $("#user_id").val()== null )
    {
        return false;
    }
    else
    {
        return true;
    }
}
//实时检查-课程名称输入是否达标
$("#name").keyup(function () {
        if ($(this).val().length >= 1 && $(this).val().length <= 50) {
            $("#nameHelpMessage").removeClass("unqualified");
        } else {
            $("#nameHelpMessage").addClass("unqualified");
        }
    }
);
//实时检查-课程所属院系输入是否达标
    $("#department").keyup(function () {
        if($(this).val().length>=1 && $(this).val().length <= 36 )
        {
            $("#departmentHelpMessage").removeClass("unqualified");
        }
        else
        {
            $("#departmentHelpMessage").addClass("unqualified");
        }
});
    //进行新增课程请求操作时将所有输入框设置为disable状态
    function disableInput() {
        $("#new_course_form").children("div.form-group").children("input").attr("disabled",true);
        $("#statement").attr("disabled",true);
        $("#new_course").attr("disabled",true);
    }
    //新增课程失败后将所有输入框去除disable状态
    function awakenInput() {
        $("#new_course_form").children("div.form-group").children("input").attr("disabled",false);
        $("#statement").attr("disabled",false);
        $("#new_course").attr("disabled",false);
    }
    //新增课程成功文字提示
    function newCourseSuccess() {
        $("#new_course_message").text("*新增课程成功！请返回进行管理*");
    }
    //新增课程失败文字提示
    function newCourseFail() {
        awakenInput();
        $("#new_course_message").text("*新增失败！*");
    }