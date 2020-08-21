/* 学生用户-返回主页 */
$("#backMain").click(function () {
    history.go(-1);
});
/* 练习题参数选择检查 */
$("#generate_practice").click(function () {
        if($("#rfp_number").val()=="" || $("#rfp_eachScore").val()=="")
        {
            $("#modal_body_message").text("*请先填写题目数量和题目分数*");
        }
        else
        {
            $("#modal_body_message").text("*确定生成练习*");
            $("#generate_practice_confirm").removeAttr("disabled");
        }
}
);