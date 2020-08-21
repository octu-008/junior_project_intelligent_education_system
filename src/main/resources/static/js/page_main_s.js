/* 学生用户主页-前往练习 */
$("#to_practice").click(function () {
    $(window).attr("location","ready_practice");
});
/* 用户注销 */
$("#logoff").click(function () {
   history.go(-1);
});
