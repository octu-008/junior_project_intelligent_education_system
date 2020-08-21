/* 更新课程按钮-鼠标悬挂事件 */
$("#update_course").hover(function () {
   $("#update_course_label").fadeIn(377);
   $("#update_course_i").addClass("fa-spin");
},function () {
    $("#update_course_label").fadeOut(277);
    $("#update_course_i").removeClass("fa-spin");
});
/* 更新课程按钮-设置提示弹窗 */
$("#update_course").click(function () {
    $("#updateName").attr("value",$("#courseName").text());
    $("#updateDepartment").attr("value",$("#courseDepartment").text());
    $("#updateState").text($("#courseStatement").text());
});
/* 取消更新按钮-清空弹窗内容 */
$("#updateOff").click(function () {
    $("#updateName").attr("value","");
    $("#updateDepartment").attr("value","");
    $("#updateState").text("");
});
/* 检测课程名字更新是否符合标准 */
$("#updateName").keyup(function () {
        if ($(this).val().length >= 1 && $(this).val().length <= 50) {
            $("#updateNameHelpMessage").removeClass("unqualified");
        } else {
            $("#updateNameHelpMessage").addClass("unqualified");
        }
    }
);
/* 检测课程所属院系是否符合标准 */
$("#updateDepartment").keyup(function () {
    if($(this).val().length>=1 && $(this).val().length <= 36 )
    {
        $("#updateDHelpMessage").removeClass("unqualified");
    }
    else
    {
        $("#updateDHelpMessage").addClass("unqualified");
    }
});
/* 正式提交修改课程信息请求按钮 */
$("#updateConfirm").click(function () {

});
/* 提交修改课程信息请求 */
function update_course_confirm() {
    if(check())
    {
        $("#resultMessage").text("*更新中*");
        $("#updateConfirm").attr("disabled","disabled");
        $("#updateOff").attr("disabled","disabled");
        var data=JSON.stringify({id:parseInt($("#courseId").val()),name:$("#updateName").val(),
                                        department:$("#updateDepartment").val(),statement:$("#statement").val(),
                                        teacherId:parseInt($("#user_id").text())});
        $.ajax({
            url:"updateCourse",
            type:"POST",
            data:data,
            contentType: "application/json;charset=UTF-8",
            dataType:"json",
            success:function (result) {
                if(result.code==200)
                {
                    updateCourseSuccess();
                }
                else
                {
                    updateCourseFail();
                }
            }
        });
    }
    else
    {

    }
}
/* 检测课程信息是否符合标准 */
function check() {
    if($("#updateName").val().length <1 || $("#updateName").val().length>50 || $("#updateDepartment").val().length<1
    || $("#updateDepartment").val().length>36 || $("#user_id").val()==null)
    {
        return false;
    }
    else
    {
        return true;
    }
}
/* 修改课程信息成功-显示成功提示 */
function updateCourseSuccess() {
    $("#resultMessage").text("*更新成功*");
    $("#updateOff").removeAttr("disabled");
    $("#courseName").text($("#updateName"));
    $("#courseDepartment").text($("#updateDepartment"));
    $("#courseStatement").text($("#updateState"));
}
/* 修改课程信息失败-显示失败提示 */
function updateCourseFail() {
    $("#resultMessage").text("*更新失败*");
    $("#updateConfirm").removeAttr("disabled");
    $("#updateOff").removeAttr("disabled");
}
