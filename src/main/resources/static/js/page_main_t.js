/* 教师用户主页-前往课程管理 */
$("#course_mgmt").click(function () {
    $(window).attr("location","course_mgmt");
});
/* 教师用户账户主页-前往新增练习题 */
$("#question_new").click(function () {
    $(window).attr("location","question_new");
});
/* 用户注销 */
$("#logoff").click(function () {
    history.go(-1);
});