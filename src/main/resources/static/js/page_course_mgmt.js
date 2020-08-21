//前往新增课程
$("#new_course").click(function () {
    $(window).attr("location","course_mgmt/new");
});
//前往目标课程管理
$(".target_course").click(function () {
    var course_id=$(this).attr("id");
    console.log(course_id);
    $(window).attr("location","course_mgmt/"+course_id);
})
//返回主页面
$("#backToMain").click(function () {
    var phone=$("#hidden_phone").val();
    $(window).attr("location","./"+phone);
});
//添加前往目标课程管理的图片
$("td.target_course").hover(function () {
    $(this).append("<i class='fa fa-arrow-circle-right'></i>");
},function () {
    $("td.target_course").children("i").remove();
});
$("#new_course").hover(function () {
    $("#new_course_label").fadeIn(177);
},function () {
    $("#new_course_label").fadeOut(177);
})
$(document).ready(function () {
    //表格变色显示
    $("tbody").on("mouseenter","tr","",function () {
        $(this).css("background-color","#F5F5F5");
    });
    $("tbody").on("mouseleave","tr","",function () {
        $(this).css("background-color","#FFFFFF");
    });
    $("[data-toggle='tooltip']").tooltip();
});