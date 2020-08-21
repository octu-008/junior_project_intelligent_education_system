/**
 * 通过教师Id获得教师担任的课程
 */
$(document).ready(function () {
    getCourseById();
});
/**
 * 点击触发确认题目信息弹窗
 */
$("#new_question").click(function () {
    $("#new_question_confirm").bind("click",newQuestionReady);
    $("#new_question_confirm").removeAttr("disabled");
    $("#modalHelpMessage").text("");
    $("#new_question_dismiss").text("等等，未确认");
    resetConfirmMessage();
});
$("#new_question_dismiss").click(function () {
   $("#new_question_confirm").unbind("click");
});
/**
 * 根据题目选项切换选项面板
 */
$("#select_question_type").change(function () {
    var select_value=$(this).val();
    if(select_value == 0)
    {
        //未选择题目类型提示
        $("#selectQuestionHelpMessage").addClass("unqualified");
        default_show();
    }
    else
    {
        if(select_value ==1)
        {
            //切换至判断题内容面板
            $("#selectQuestionHelpMessage").removeClass("unqualified");
            show_judge_panel();
        }
        else if(select_value == 2)
        {
            //切换至单选题内容面板
            $("#selectQuestionHelpMessage").removeClass("unqualified");
            show_single_panel();
        }
        else
        {
            //切换至多选题内容面板
            $("#selectQuestionHelpMessage").removeClass("unqualified");
            show_multiple_panel();
        }
    }
});
/**
 * 选定多选
 */
$(".multiple_answer").click(function () {
    if(!$(this).attr("checked"))
    {
        $(this).attr("checked","checked");
    }
    else
    {
        $(this).removeAttr("checked");
    }
});
/**
 * 检查题目描述
 */
$("#statement").keyup(function () {
    if($(this).val().length<1)
    {
        $("#statementHelpMessage").addClass("unqualified");
    }
    else
    {
        $("#statementHelpMessage").removeClass("unqualified");
    }
});
/**
 * 检查单选题-选项1的输入内容-改变提示信息
 */
$("#option_single_1").keyup(function () {
    if($(this).val().length<1 || $("#option_single_2").val().length<1)
    {
        $("#option_singleHelpMessage").addClass("unqualified");
    }
    else
    {
        $("#option_singleHelpMessage").removeClass("unqualified");
    }
});
/**
 * 检查单选题-选项2的输入内容-改变提示信息
 */
$("#option_single_2").keyup(function () {
    if($(this).val().length<1 || $("#option_single_1").val().length<1)
    {
        $("#option_singleHelpMessage").addClass("unqualified");
    }
    else
    {
        $("#option_singleHelpMessage").removeClass("unqualified");
    }
});
/**
 * 检查单选题-选项3的输入内容-改变提示信息
 */
$("#option_single_3").keyup(function () {
    if ($(this).val().length < 1)
    {
        $("#single_answer_3").attr("disabled","disabled");
    }
    else
    {
        $("#single_answer_3").removeAttr("disabled");
    }
});
/**
 * 检查单选题-选项4的输入内容-改变提示信息
 */
$("#option_single_4").keyup(function () {
    if ($(this).val().length < 1)
    {
        $("#single_answer_4").attr("disabled","disabled");
    }
    else
    {
        $("#single_answer_4").removeAttr("disabled");
    }
});
/**
 * 检查多选题-选项1的输入内容-改变提示信息
 */
$("#option_multiple_1").keyup(function () {
    if($(this).val().length<1 || $("#option_multiple_2").val().length<1 || $("#option_multiple_3").val().length<1)
    {
        $("#option_multipleHelpMessage").addClass("unqualified");
    }
    else
    {
        $("#option_multipleHelpMessage").removeClass("unqualified");
    }
});
/**
 * 检查多选题-选项2的输入内容-改变提示信息
 */
$("#option_multiple_2").keyup(function () {
    if($(this).val().length<1 || $("#option_multiple_1").val().length<1 || $("#option_multiple_3").val().length<1)
    {
        $("#option_multipleHelpMessage").addClass("unqualified");
    }
    else
    {
        $("#option_multipleHelpMessage").removeClass("unqualified");
    }
});
/**
 * 检查多选题-选项3的输入内容-改变提示信息
 */
$("#option_multiple_3").keyup(function () {
    if($(this).val().length<1 || $("#option_multiple_1").val().length<1 || $("#option_multiple_2").val().length<1)
    {
        $("#option_multipleHelpMessage").addClass("unqualified");
    }
    else
    {
        $("#option_multipleHelpMessage").removeClass("unqualified");
    }
});
/**
 * 检查多选题-选项4的输入内容-改变提示信息
 */
$("#option_multiple_4").keyup(function () {
    if($(this).val().length<1)
    {
        $("#multiple_answer_4").attr("disabled","disabled");
    }
    else
    {
        $("#multiple_answer_4").removeAttr("disabled");
    }
});
/**
 * 检查题目是否选中所属科目
 */
$("#select_course").change(function () {
    if($(this).val()==0)
    {
        $("#select_courseHelpMessage").addClass("unqualified");
    }
    else
    {
        $("#select_courseHelpMessage").removeClass("unqualified");
    }
});
/**
 * 返回主页
 */
$("#backMain").click(function () {
   history.go(-1);
});

/**
 * 动态加载教师教授科目
 */
function getCourseById()
{
    var id=$("#user_id").text();
    $.ajax({
        url: "getCourse/"+id,
        type: "GET",
        dataType: "json",
        success: function (course) {
            setUpSelectCourse(course);
        }
    }
    );
}

/**
 * 新增题目请求
 */
function newQuestionReady() {
    if(checkStatementNull())
    {
        if(checkQuestionType() && checkCourseSelected())
        {
            if($("#select_question_type").val()==1)
            {
                var options=$(".judge_answer:checked").attr("id");
                if(options)
                {
                    var questionData={id:0,statement:$("#statement").val(),exState:"无",
                                      type:"判断题",options:"是,否",
                                      answer:options.substr(options.length-1,1),
                                      course:parseInt($("#select_course").val())
                    };
                    newQuestion(questionData);
                }
                else
                {
                    $("#modalHelpMessage").text("*您尚未选择该判断题的正确选项*");
                }
            }
            else if($("#select_question_type").val()==2)
            {
                if(checkSingleOption())
                {
                    var options=$("#option_single_1").val()+","+$("#option_single_2").val();
                    var answer=$(".single_answer:checked").attr("id");
                    if($("#option_single_3").val().length>=1)
                    {
                        options+=(","+$("#option_single_3").val());
                    }
                    if ($("#option_single_4").val().length>=1)
                    {
                        options+=(","+$("#option_single_4").val());
                    }
                    var questionData={id:0,statement:$("#statement").val(),exState:"无",
                        type:"单选题",options:options,
                        answer:answer.substr(answer.length-1,1),
                        course:parseInt($("#select_course").val())};
                    newQuestion(questionData);
                }
            }
            else if($("#select_question_type").val()==3)
            {
                if(checkMultipleAnswer() && checkMultipleOption())
                {
                    var options=$("#option_multiple_1").val()+","+$("#option_multiple_2").val()+"," +
                        $("#option_multiple_3").val();
                    var answers=$(".multiple_answer");
                    var answersArr=new Array();
                    for(var i=0;i<answers.length;i++)
                    {
                        if($(answers[i]).attr("checked")=="checked")
                        {
                            answersArr.push($(answers[i]).attr("id").substr($(answers[i]).attr("id").length-1,1));
                        }
                    }
                    var answersStr=answersArr.join(",");
                    if($("#option_multiple_4").val().length>=1)
                    {
                        options+=(","+$("#option_multiple_4").val());
                    }
                    var questionData={id:0,statement:$("#statement").val(),exState:"无",
                    type:"多选题",options:options,
                    answer:answersStr,course:parseInt($("#select_course").val())};
                    newQuestion(questionData)
                }
            }
        }
        else
        {
            $("#modalHelpMessage").text("*请先选择题目类型和题目所属课程*");
        }
    }
    else
    {
        $("#modalHelpMessage").text("*题目描述不能为空，请返回填写描述*");
    }
}

/**
 * 获得题目数据后发送新增题目ajax请求
 * @param questionData
 */
function newQuestion(questionData) {
    var data=JSON.stringify(questionData);
    console.log(data);
    $.ajax(
        {
            url: "newQuestion",
            type: "POST",
            data: data,
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success:function (result) {
                if(result.code==200)
                {
                    newQuestionSuccess();
                }
            }
        }
    )
}

/**
 * 提示新增题目成功
 */
function newQuestionSuccess() {
    $("#modalHelpMessage").text("*新增题目成功，请返回继续*");
    $("#new_question_confirm").unbind("click");
    $("#new_question_dismiss").text("返回继续");
    $("#new_question_confirm").attr("disabled","disabled");
}

/**
 * 切换单选题选项输入面板
 */
function show_single_panel() {
    restInputContent();
    $(".multiple_choice_answer_panel").hide();
    $(".judge_answer_panel").hide();
    $(".single_choice_answer_panel").show();
}
/**
 * 切换判断题选项输入面板
 */
function show_judge_panel() {
    restInputContent();
    $(".multiple_choice_answer_panel").hide();
    $(".judge_answer_panel").show();
    $(".single_choice_answer_panel").hide();
}
/**
 * 切换多选题选项输入面板
 */
function show_multiple_panel() {
    restInputContent();
    $(".multiple_choice_answer_panel").show();
    $(".judge_answer_panel").hide();
    $(".single_choice_answer_panel").hide();
}

/**
 * 默认展示的面板
 */
function default_show() {
    restInputContent();
    $(".multiple_choice_answer_panel").hide();
    $(".judge_answer_panel").hide();
    $(".single_choice_answer_panel").hide();
}

/**
 * 重置多选题和单选题的选项内容
 */
function restInputContent() {
    $(".single_choice_answer_panel").children("input").val("");
    $(".multiple_choice_answer_panel").children("input").val("");
}

/**
 * 重置对话框中的题目信息
 */
function resetConfirmMessage()
{
    $("#modal_body").empty();
    var statement=$("<p></p>").text("题目描述："+$("#statement").val());
    $("#modal_body").append(statement);
    if($("#select_question_type").val()==1)
    {
        setJudgeMessage();
    }
     else if($("#select_question_type").val()==2)
    {
        setSingleMessage();
    }
     else if($("#select_question_type").val()==3)
    {
        setMultipleMessage();
    }
}

/**
 * 对话框-显示判断题的确认信息
 */
function setJudgeMessage() {
    var type=$("<p></p>").text("题目类型："+$("#select_question_type").children()[1].text);
    var options=$(".judge_answer:checked").attr("id");
    var answer=$("<p></p>").text("答案选项：");
    var judge_yes=$("<p></p>").text("是");
    var judge_no=$("<p></p>").text("否");
    if(options.substr(options.length-1,1)==1)
    {
        judge_yes.addClass("answer_text");
    }
    else
    {
        judge_no.addClass("answer_text");
    }
    var selectedCourse=$("#select_course").val();
    var selectedCourseText=$("<p></p>").text("题目所属课程："+$("#select_course_"+selectedCourse).text());
    $("#modal_body").append(type,answer,judge_yes,judge_no,selectedCourseText);
}

/**
 * 对话框-显示单选题的确认信息
 */
function setSingleMessage() {
    var type=$("<p></p>").text("题目类型："+$("#select_question_type").children()[2].text);
    var options=$(".single_answer:checked").attr("id");
    var answer=$("<p></p>").text("答案选项：");
    var single_answer_1=$("<p></p>").text($("#option_single_1").val());
    var single_answer_2=$("<p></p>").text($("#option_single_2").val());
    if($("#option_single_3").val().length>=1)
    {
        var single_answer_3=$("<p></p>").text($("#option_single_3").val());
    }
    if($("#option_single_4").val().length>=1)
    {
        var single_answer_4=$("<p></p>").text($("#option_single_4").val());
    }
    if(options.substr(options.length-1,1)==1)
    {
        single_answer_1.addClass("answer_text");
    }
    else if(options.substr(options.length-1,1)==2)
    {
        single_answer_2.addClass("answer_text");
    }
    else if(single_answer_3 && options.substr(options.length-1,1)==3)
    {
        single_answer_3.addClass("answer_text");
    }
    else if(single_answer_4 && options.substr(options.length-1,1)==4)
    {
        single_answer_4.addClass("answer_text");
    }
    var selectedCourse=$("#select_course").val();
    var selectedCourseText=$("<p></p>").text("题目所属课程："+$("#select_course_"+selectedCourse).text());

    $("#modal_body").append(type,answer,single_answer_1,single_answer_2);
    if(single_answer_3 !=undefined)
    {
        $("#modal_body").append(single_answer_3);
    }
    if(single_answer_4 != undefined)
    {
        $("#modal_body").append((single_answer_4));
    }
    console.log($("#option_single_3").val().length+","+$("#option_single_4").val().length);
    $("#modal_body").append(selectedCourseText);
}
/**
 * 对话框-显示多选题的确认信息
 */
function setMultipleMessage() {
    var type=$("<p></p>").text("题目类型："+$("#select_question_type").children()[3].text);
    var options=$(".multiple_answer");
    var answer=$("<p></p>").text("答案选项：");
    var multiple_answer__1=$("<p></p>").text($("#option_multiple_1").val());
    var multiple_answer__2=$("<p></p>").text($("#option_multiple_2").val());
    var multiple_answer__3=$("<p></p>").text($("#option_multiple_3").val());
    if($("#option_multiple_4").val().length>=1)
    {
        var multiple_answer__4=$("<p></p>").text($("#option_multiple_4").val());
    }
    if($(options[0]).attr("checked")=="checked")
    {
        multiple_answer__1.addClass("answer_text");
    }
    if($(options[1]).attr("checked")=="checked")
    {
        multiple_answer__2.addClass("answer_text");
    }
    if($(options[2]).attr("checked")=="checked")
    {
        multiple_answer__3.addClass("answer_text");
    }
    if(multiple_answer__4 && $(options[3]).attr("checked")=="checked")
    {
        multiple_answer__4.addClass("answer_text");
    }
    var selectedCourse=$("#select_course").val();
    var selectedCourseText=$("<p></p>").text("题目所属课程："+$("#select_course_"+selectedCourse).text());
    $("#modal_body").append(type,answer,multiple_answer__1,multiple_answer__2,multiple_answer__3);
    if(multiple_answer__4)
    {
        $("#modal_body").append(multiple_answer__4);
    }
    $("#modal_body").append(selectedCourseText);
}

/**
 * 添加可选择的题目所属课程
 * @param courses
 */
function setUpSelectCourse(courses) {
    var courseList=courses;
    var tar;
    for(var i=0;i<courseList.length;i++)
    {
        tar=$("<option></option>").text(courseList[i].id+":"+courseList[i].name);
        tar.attr("id","select_course_"+courseList[i].id)
        tar.attr("value",courseList[i].id);
        $("select#select_course").append(tar);
    }
}

/**
 * 检查题目描述是否为空
 * @returns {boolean}
 */
function checkStatementNull() {
    if($("#statement").val().length<1)
    {
        return false;
    }
    else
    {
        return true;
    }
}

/**
 * 检查问题类型
 * @returns {boolean}
 */
function checkQuestionType() {
    if($("#select_question_type").val() == 0)
    {
        return false;
    }
    else
    {
        return true;
    }
}

/**
 * 检查单选题选项输入内容
 * @returns {boolean}
 */
function checkSingleOption()
{
    if($("#option_single_1").val().length<1 || $("#option_single_2").val().length<1)
    {
        return false;
    }
    else
    {
        return true;
    }
}

/**
 * 检查多选题选项输入内容
 * @returns {boolean}
 */
function checkMultipleOption() {
    if($("#option_multiple_1").val().length<1 || $("#option_multiple_2").val().length<1 || $("#option_multiple_3").val().length<1)
    {
        return false;
    }
    else
    {
        return true;
    }
}

/**
 * 检查多选题答案的选择
 * @returns {boolean}
 */
function checkMultipleAnswer() {
    var options=$(".multiple_answer");
    var count=0;
    for(var i=0;i<options.length;i++)
    {
        if ($(options[i]).attr("checked"))
        {
            count++;
        }
    }
    if(count<2)
    {
        return false;
    }
    else
    {
        return true;
    }
}

/**
 * 检查课程是否已经选择
 * @returns {boolean}
 */
function checkCourseSelected() {
    if($("#select_course").val()==0)
    {
        return false;
    }
    else
    {
        return true;
    }
}