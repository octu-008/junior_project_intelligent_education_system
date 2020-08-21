//返回顶部按钮
$("#back_to_top").click(function () {
    $("html,body").animate({scrollTop: 0}, 500);
});
$("#back_to_previously").click(function () {
    history.go(-1);
});
//页面加载完成进行题目的加载，并对选项进行复数事件绑定
$(window).ready(function () {
    getQuestions();
    //题目选项-鼠标进入事件
    $(document).on("mouseenter", ".option_div", "", function () {
        if ($(this).hasClass("selected_option")) {
            //若被已经被选中不会改变样式
        } else {
            //改变背景和文字样式
            $(this).addClass("in_mouse");
            //图标旋转
            $(this).children("i").addClass("fa-spin");
        }
    });
    //题目选项-鼠标移出事件
    $(document).on("mouseleave", ".option_div", "", function () {
        if ($(this).hasClass("selected_option")) {
            //若被已经被选中不会改变样式
        } else {
            //返回初始状态
            $(this).removeClass("in_mouse");
            //停止旋转
            $(this).children("i").removeClass("fa-spin");
        }
    });
    //题目选项-鼠标点击事件
    $(document).on("click", ".option_div", "", function () {
        if ($(this).hasClass("selected_option")) {
            //撤销该选择
            $(this).addClass("in_mouse");
            $(this).removeClass("selected_option");
            $(this).children("i").addClass("fa-spin");
            $(this).children("i").addClass("fa-question-circle");
            $(this).children("i").removeClass("fa-check-circle");
        } else if ($(this).parent().parent().hasClass("single_choice_question")) {
            //单选题
            //选定该选项
            $(this).removeClass("in_mouse");
            $(this).addClass("selected_option");
            $(this).children("i").removeClass("fa-spin");
            $(this).children("i").removeClass("fa-question-circle");
            $(this).children("i").addClass("fa-check-circle");
            //将其他选项变为待选状态_不同行
            var otherOption_otherLine = $(this).parent().siblings().children(".selected_option");
            $(otherOption_otherLine).removeClass("selected_option");
            $(otherOption_otherLine).children("i").removeClass("fa-check-circle");
            $(otherOption_otherLine).children("i").addClass("fa-question-circle");
            //将其他选项变为待选状态_同行
            var otherOption_sameLine = $(this).siblings(".col-5");
            $(otherOption_sameLine).removeClass("selected_option");
            $(otherOption_sameLine).children("i").removeClass("fa-check-circle");
            $(otherOption_sameLine).children("i").addClass("fa-question-circle");
        } else if ($(this).parent().parent().hasClass("judge_question")) {
            //判断题
            //选定该选项
            $(this).removeClass("in_mouse");
            $(this).addClass("selected_option");
            $(this).children("i").removeClass("fa-spin");
            $(this).children("i").removeClass("fa-question-circle");
            $(this).children("i").addClass("fa-check-circle");
            //另一个选项变为待选状态
            var otherOption = $(this).siblings(".col-5");
            $(otherOption).removeClass("selected_option");
            $(otherOption).children("i").removeClass("fa-check-circle");
            $(otherOption).children("i").addClass("fa-question-circle");
        } else {
            //多选题
            //选定该选项
            $(this).removeClass("in_mouse");
            $(this).addClass("selected_option");
            $(this).children("i").removeClass("fa-spin");
            $(this).children("i").removeClass("fa-question-circle");
            $(this).children("i").addClass("fa-check-circle");
        }
    });
    $("#loading_question").fadeOut(777);
});
//确认提交
$("#submit_confirm_confirm").click(function () {
    var question_content=$(".question_options_content");
    var id_question=new Array();
    var options_question=new Array();
    for(var i=0;i<question_content.length;i++)
    {
        if($(question_content[i]).hasClass("judge_question") || $(question_content[i]).hasClass("single_choice_question"))
        {
            var optionSelected=$(question_content[i]).children(".row").children(".selected_option");
            var optionId=$(optionSelected).children("label").attr("id");
            var optionIdArr=optionId.split("_");
            id_question.push(optionIdArr[1]);
            options_question.push(optionIdArr[2]);
        }
        else
        {
            var optionSelected=$(question_content[i]).children(".row").children(".selected_option");
            var multiple_option=new Array();
            for(var j=0;j<optionSelected.length;j++)
            {
                var optionId=$(optionSelected[j]).children("label").attr("id");
                var optionIdArr=optionId.split("_");
                if(j==0)
                {
                    id_question.push(optionIdArr[1]);
                }
                multiple_option.push(optionIdArr[2]);
            }
            var multiple_option_str=multiple_option.join(",");
            options_question.push(multiple_option_str);
        }
    }

    verifyAnswer(id_question,options_question);
});
//提交前检查所有题目是否已完并显示检查结果
$("#submit_button").click(function () {
    var check=checkQuestionSelected();
    if(check=="allDone")
    {
        $("#modal_body_i").removeClass("fa-spin");
        $("#modal_body_i").removeClass("fa-spinner");
        $("#modal_body_i").addClass("fa-check-circle");
        $("#modal_body_i").addClass("pass");
        $("#modal_body_message").text("*已完成所有题目*");
        $("#modal_body_message").addClass("pass");
        $("#submit_confirm_confirm").removeAttr("disabled");
    }
    else
    {
        $("#modal_body_i").removeClass("fa-spin");
        $("#modal_body_i").removeClass("fa-spinner")
        $("#modal_body_i").addClass("fa-times-circle");
        $("#modal_body_i").addClass("unqualified");
        $("#modal_body_message").text("*"+check+" 未完成*");
        $("#modal_body_message").addClass("unqualified");
    }
});
$("#submit_confirm_dismiss").click(function () {
    if( $("#modal_body_i").hasClass("fa-check-circle"))
    {
        $("#modal_body_i").addClass("fa-spin");
        $("#modal_body_i").addClass("fa-spinner");
        $("#modal_body_i").removeClass("fa-check-circle");
        $("#modal_body_i").removeClass("pass");
        $("#modal_body_message").text("*等待检测题目*");
        $("#modal_body_message").removeClass("pass");
        $("#submit_confirm_confirm").attr("disabled","disabled");
    }
    else
    {
        $("#modal_body_i").addClass("fa-spin");
        $("#modal_body_i").addClass("fa-spinner")
        $("#modal_body_i").removeClass("fa-times-circle");
        $("#modal_body_i").removeClass("unqualified");
        $("#modal_body_message").text("*等待检测题目*");
        $("#modal_body_message").removeClass("unqualified");
    }
});
//检查题目是否有未选择的
function checkQuestionSelected() {
    var question_options_content_list = $(".question_options_content");
    var option_target_option="";
    var flag = false;
    for (var i = 0; i < question_options_content_list.length; i++) {
      if($(question_options_content_list[i]).hasClass("judge_question"))
      {
          //判断题检查是否已选择
          var judge_options=$(question_options_content_list[i]).children(".row").children(".col-5");
          if($(judge_options[0]).hasClass("selected_option") || $(judge_options[1]).hasClass("selected_option"))
          {
              flag=true;
          }
      }
      else if($(question_options_content_list[i]).hasClass("single_choice_question"))
      {
          //单选题检查是否已选择
          var single_options=$(question_options_content_list[i]).children(".row").children(".col-5");
          if(single_options.length==4)
          {
              if($(single_options[0]).hasClass("selected_option") || $(single_options[1]).hasClass("selected_option")
              || $(single_options[2]).hasClass("selected_option") || $(single_options[3]).hasClass("selected_option"))
              {
                  flag=true;
              }
          }
          else
          {
              if($(single_options[0]).hasClass("selected_option") || $(single_options[1]).hasClass("selected_option"))
              {
                  flag=true;
              }
          }
      }
      else
      {
          //多选题检查是否已选择
          var multiple_options=$(question_options_content_list[i]).children(".row").children(".col-5");
          if($(multiple_options[0]).hasClass("selected_option") || $(multiple_options[1]).hasClass("selected_option")
              || $(multiple_options[2]).hasClass("selected_option") || $(multiple_options[3]).hasClass("selected_option"))
          {
              flag=true;
          }
      }
      if(flag)
      {
          flag=false;
          continue;
      }
      else
      {
          flag=true;
          option_target_option=$(question_options_content_list[i]).siblings(".question_tittle").children().text();
          break;
      }
    }
    if (flag) {
        return option_target_option;
    } else {
        return "allDone";
    }
}
//通过练习参数利用ajax获得对应数量的随机排序的题目
function getQuestions() {
    //获取练习测试范围
    var type = $("#practice_type").text();
    //获取练习测试题目数量
    var number = parseInt($("#practice_number").text());
    if (type == "全部课程") {
        type = "all";
    }
    //发送ajax请求获取题目
    var data = "type=" + type + "&number=" + number;
    $.ajax({
        url: "getPractice",
        type: "POST",
        data: data,
        dataType: "json",
        success: function (questions) {
            //生成题目内容
            loadQuestions(questions);
        }
    });
}
//动态加载题目
function loadQuestions(questions) {
    //获得后端提供的题目信息
    var questions_ = questions;
    //根据题目类型分别加载题目
    for (var i = 0; questions_.length; i++) {
        if (questions_[i].type === "判断题") {
            //加载判断题
            loadJudgeQuestion(questions_[i], i + 1);
        } else if (questions_[i].type === "单选题") {
            //加载单选题
            loadSingleQuestion(questions_[i], i + 1);
        } else {
            //加载多选题
            loadMultipleQuestion(questions_[i], i + 1);
        }
    }
}

//加载单选题
function loadSingleQuestion(question, count) {
    //题目编号
    var number = parseInt(count);
    //构建判断题
    //最外层
    var div_outside = $("<div></div>");
    div_outside.addClass("mt-2 mr-5 ml-5 pr-5 pl-5 mb-4 bg-white border-bottom shadow-sm info_radius question_form");
    //题目标题div
    var div_title = $("<div></div>");
    div_title.addClass("row mt-1 question_tittle");
    //题目标题内容
    var div_title_label = $("<label></label>").text("题目_" + number + "_单选题");
    div_title_label.addClass("question_tittle_text");
    div_title.append(div_title_label);
    //题目描述div
    var div_statement = $("<div></div>");
    div_statement.addClass("row mt-1 mb-1");
    var div_statement_empty_col_left = $("<div></div>");
    var div_statement_empty_col_right = $("<div></div>");
    div_statement_empty_col_left.addClass("col-1");
    div_statement_empty_col_right.addClass("col-1");
    var div_statement_content_col = $("<div></div>");
    div_statement_content_col.addClass("col-10");
    var div_statement_content_label = $("<label></label>").text(question.statement);
    div_statement_content_label.addClass("question_statement");
    div_statement_content_col.append(div_statement_content_label);
    div_statement.append(div_statement_empty_col_left, div_statement_content_col, div_statement_empty_col_right);
    //获得选项内容
    var single_options = question.options
    var single_options_split = single_options.split(",");
    //题目选项div_第一行选项
    var div_options_outside = $("<div></div>");
    div_options_outside.addClass("single_choice_question question_options_content");
    var div_options_content_line1 = $("<div></div>");
    div_options_content_line1.addClass("row mt-1 mb-2");
    //题目选项div_第一行选项_左填充col
    var div_options_content_line1_empty_col_left = $("<div></div>");
    div_options_content_line1_empty_col_left.addClass("col-1");
    //题目选项div_第一行选项_A选项
    var div_options_content_A_choice = $("<div></div>");
    div_options_content_A_choice.addClass("col-5 mr-1 option_div border-bottom shadow-sm");
    var div_options_content_A_choice_label = $("<label></label>").text(single_options_split[0]);
    div_options_content_A_choice_label.addClass("question_option");
    div_options_content_A_choice_label.attr("id", "question_" + question.id + "_1");
    var div_options_content_A_choice_i = $("<i></i>");
    div_options_content_A_choice_i.addClass("fa fa-question-circle float_mark");
    div_options_content_A_choice_i.css("font-size", "23px");
    div_options_content_A_choice.append(div_options_content_A_choice_label, div_options_content_A_choice_i);
    //题目选项div_第一行选项_B选项
    var div_options_content_B_choice = $("<div></div>");
    div_options_content_B_choice.addClass("col-5 mr-1 option_div border-bottom shadow-sm");
    var div_options_content_B_choice_label = $("<label></label>").text(single_options_split[1]);
    div_options_content_B_choice_label.addClass("question_option");
    div_options_content_B_choice_label.attr("id", "question_" + question.id + "_2")
    var div_options_content_B_choice_i = $("<i></i>");
    div_options_content_B_choice_i.addClass("fa fa-question-circle float_mark");
    div_options_content_B_choice_i.css("font-size", "23px");
    div_options_content_B_choice.append(div_options_content_B_choice_label, div_options_content_B_choice_i);
    //题目选项div_第一行选项_右填充col
    var div_options_content_line1_empty_col_right = $("<div></div>");
    div_options_content_line1_empty_col_right.addClass("col-1");
    //题目选项div_第一行选项_组合
    div_options_content_line1.append(div_options_content_line1_empty_col_left, div_options_content_A_choice,
        div_options_content_B_choice, div_options_content_line1_empty_col_right);
    //如果有三个以上的选项，添加第二行选项内容
    if (single_options_split.length >= 3) {
        //题目选项div_第二行选项
        var div_options_content_line2 = $("<div></div>");
        div_options_content_line2.addClass("row mt-1 mb-2");
        //题目选项div_第二行选项_左填充col
        var div_options_content_line2_empty_col_left = $("<div></div>");
        div_options_content_line2_empty_col_left.addClass("col-1");
        //题目选项div_第二行选项_C选项
        var div_options_content_C_choice = $("<div></div>");
        div_options_content_C_choice.addClass("col-5 mr-1 option_div border-bottom shadow-sm");
        var div_options_content_C_choice_label = $("<label></label>").text(single_options_split[2]);
        div_options_content_C_choice_label.addClass("question_option");
        div_options_content_C_choice_label.attr("id", "question_" + question.id + "_3");
        var div_options_content_C_choice_i = $("<i></i>");
        div_options_content_C_choice_i.addClass("fa fa-question-circle float_mark");
        div_options_content_C_choice_i.css("font-size", "23px");
        div_options_content_C_choice.append(div_options_content_C_choice_label, div_options_content_C_choice_i);
        //题目选项div_第二行选项_右填充col
        var div_options_content_line2_empty_col_right = $("<div></div>");
        div_options_content_line2_empty_col_right.addClass("col-1");
        if (single_options_split.length >= 4) {
            //如果有四个选项则添加该选项
            var div_options_content_D_choice = $("<div></div>");
            div_options_content_D_choice.addClass("col-5 mr-1 option_div border-bottom shadow-sm");
            var div_options_content_D_choice_label = $("<label></label>").text(single_options_split[3]);
            div_options_content_D_choice_label.addClass("question_option");
            div_options_content_D_choice_label.attr("id", "question_" + question.id + "_4");
            var div_options_content_D_choice_i = $("<i></i>");
            div_options_content_D_choice_i.addClass("fa fa-question-circle float_mark");
            div_options_content_D_choice_i.css("font-size", "23px");
            div_options_content_D_choice.append(div_options_content_D_choice_label, div_options_content_D_choice_i);
            //题目选项div_第二行选项_组合
            div_options_content_line2.append(div_options_content_line2_empty_col_left, div_options_content_C_choice,
                div_options_content_D_choice, div_options_content_line2_empty_col_right);
            div_options_outside.append(div_options_content_line1, div_options_content_line2);
        } else {
            var div_options_content_D_empty = $("<div></div>");
            div_options_content_D_empty.addClass("col-5 mr-1");
            //题目选项div_第二行选项_组合
            div_options_content_line2.append(div_options_content_line2_empty_col_left, div_options_content_C_choice,
                div_options_content_D_empty, div_options_content_line2_empty_col_right);
            div_options_outside.append(div_options_content_line1, div_options_content_line2);
        }
        //填充所有内容
        div_outside.append(div_title, div_statement, div_options_outside);
    } else {
        div_options_outside.append(div_options_content_line1);
        //填充所有内容
        div_outside.append(div_title, div_statement, div_options_outside);
    }
    //添加到页面中
    $("#practice_content").append(div_outside);
}

//加载判断题
function loadJudgeQuestion(question, count) {
    //题目编号
    var number = parseInt(count);
    //构建判断题
    //最外层
    var div_outside = $("<div></div>");
    div_outside.addClass("mt-2 mr-5 ml-5 pr-5 pl-5 mb-4 bg-white border-bottom shadow-sm info_radius question_form");
    //题目标题div
    var div_title = $("<div></div>");
    div_title.addClass("row mt-1 question_tittle");
    //题目标题内容
    var div_title_label = $("<label></label>").text("题目_" + number + "_判断题");
    div_title_label.addClass("question_tittle_text");
    div_title.append(div_title_label);
    //题目描述div
    var div_statement = $("<div></div>");
    div_statement.addClass("row mt-1 mb-1");
    var div_statement_empty_col_left = $("<div></div>");
    var div_statement_empty_col_right = $("<div></div>");
    div_statement_empty_col_left.addClass("col-1");
    div_statement_empty_col_right.addClass("col-1");
    var div_statement_content_col = $("<div></div>");
    div_statement_content_col.addClass("col-10");
    var div_statement_content_label = $("<label></label>").text(question.statement);
    div_statement_content_label.addClass("question_statement");
    div_statement_content_col.append(div_statement_content_label);
    div_statement.append(div_statement_empty_col_left, div_statement_content_col, div_statement_empty_col_right);
    //题目选项div
    var div_options_outside = $("<div></div>");
    div_options_outside.addClass("judge_question question_options_content");
    var div_options_content = $("<div></div>");
    div_options_content.addClass("row mt-1 mb-2");
    //题目选项div_左填充col
    var div_options_content_empty_col_left = $("<div></div>");
    div_options_content_empty_col_left.addClass("col-1");
    //题目选项div_是选项
    var div_options_content_yes_choice = $("<div></div>");
    div_options_content_yes_choice.addClass("col-5 mr-1 option_div border-bottom shadow-sm");
    var div_options_content_yes_choice_label = $("<label></label>").text("是");
    div_options_content_yes_choice_label.addClass("question_option");
    div_options_content_yes_choice_label.attr("id", "question_" + question.id + "_1");
    var div_options_content_yes_choice_i = $("<i></i>");
    div_options_content_yes_choice_i.addClass("fa fa-question-circle float_mark");
    div_options_content_yes_choice_i.css("font-size", "23px");
    div_options_content_yes_choice.append(div_options_content_yes_choice_label, div_options_content_yes_choice_i);
    //题目选项div_否选项
    var div_options_content_no_choice = $("<div></div>");
    div_options_content_no_choice.addClass("col-5 mr-1 option_div border-bottom shadow-sm");
    var div_options_content_no_choice_label = $("<label></label>").text("否");
    div_options_content_no_choice_label.addClass("question_option");
    div_options_content_no_choice_label.attr("id", "question_" + question.id + "_2")
    var div_options_content_no_choice_i = $("<i></i>");
    div_options_content_no_choice_i.addClass("fa fa-question-circle float_mark");
    div_options_content_no_choice_i.css("font-size", "23px");
    div_options_content_no_choice.append(div_options_content_no_choice_label, div_options_content_no_choice_i);
    //题目选项div_右填充col
    var div_options_content_empty_col_right = $("<div></div>");
    div_options_content_empty_col_right.addClass("col-1");
    //题目选项div_填充内容
    div_options_content.append(div_options_content_empty_col_left, div_options_content_yes_choice,
        div_options_content_no_choice, div_options_content_empty_col_right);
    div_options_outside.append(div_options_content);
    //填充所有内容
    div_outside.append(div_title, div_statement, div_options_outside);
    //添加到页面中
    $("#practice_content").append(div_outside);
}

//加载多选题
function loadMultipleQuestion(question, count) {
    //题目编号
    var number = parseInt(count);
    //构建判断题
    //最外层
    var div_outside = $("<div></div>");
    div_outside.addClass("mt-2 mr-5 ml-5 pr-5 pl-5 mb-4 bg-white border-bottom shadow-sm info_radius question_form");
    //题目标题div
    var div_title = $("<div></div>");
    div_title.addClass("row mt-1 question_tittle");
    //题目标题内容
    var div_title_label = $("<label></label>").text("题目_" + number + "_多选题");
    div_title_label.addClass("question_tittle_text");
    div_title.append(div_title_label);
    //题目描述div
    var div_statement = $("<div></div>");
    div_statement.addClass("row mt-1 mb-1");
    var div_statement_empty_col_left = $("<div></div>");
    var div_statement_empty_col_right = $("<div></div>");
    div_statement_empty_col_left.addClass("col-1");
    div_statement_empty_col_right.addClass("col-1");
    var div_statement_content_col = $("<div></div>");
    div_statement_content_col.addClass("col-10");
    var div_statement_content_label = $("<label></label>").text(question.statement);
    div_statement_content_label.addClass("question_statement");
    div_statement_content_col.append(div_statement_content_label);
    div_statement.append(div_statement_empty_col_left, div_statement_content_col, div_statement_empty_col_right);
    //获得选项内容
    var multiple_options = question.options
    var multiple_options_split = multiple_options.split(",");
    //题目选项div_第一行选项
    var div_options_outside = $("<div></div>");
    div_options_outside.addClass("multiple_choice_question question_options_content");
    var div_options_content_line1 = $("<div></div>");
    div_options_content_line1.addClass("row mt-1 mb-2");
    //题目选项div_第一行选项_左填充col
    var div_options_content_line1_empty_col_left = $("<div></div>");
    div_options_content_line1_empty_col_left.addClass("col-1");
    //题目选项div_第一行选项_A选项
    var div_options_content_A_choice = $("<div></div>");
    div_options_content_A_choice.addClass("col-5 mr-1 option_div border-bottom shadow-sm");
    var div_options_content_A_choice_label = $("<label></label>").text(multiple_options_split[0]);
    div_options_content_A_choice_label.addClass("question_option");
    div_options_content_A_choice_label.attr("id", "question_" + question.id + "_1");
    var div_options_content_A_choice_i = $("<i></i>");
    div_options_content_A_choice_i.addClass("fa fa-question-circle float_mark");
    div_options_content_A_choice_i.css("font-size", "23px");
    div_options_content_A_choice.append(div_options_content_A_choice_label, div_options_content_A_choice_i);
    //题目选项div_第一行选项_B选项
    var div_options_content_B_choice = $("<div></div>");
    div_options_content_B_choice.addClass("col-5 mr-1 option_div border-bottom shadow-sm");
    var div_options_content_B_choice_label = $("<label></label>").text(multiple_options_split[1]);
    div_options_content_B_choice_label.addClass("question_option");
    div_options_content_B_choice_label.attr("id", "question_" + question.id + "_2")
    var div_options_content_B_choice_i = $("<i></i>");
    div_options_content_B_choice_i.addClass("fa fa-question-circle float_mark");
    div_options_content_B_choice_i.css("font-size", "23px");
    div_options_content_B_choice.append(div_options_content_B_choice_label, div_options_content_B_choice_i);
    //题目选项div_第一行选项_右填充col
    var div_options_content_line1_empty_col_right = $("<div></div>");
    div_options_content_line1_empty_col_right.addClass("col-1");
    //题目选项div_第一行选项_组合
    div_options_content_line1.append(div_options_content_line1_empty_col_left, div_options_content_A_choice,
        div_options_content_B_choice, div_options_content_line1_empty_col_right);
    //题目选项div_第二行选项
    var div_options_content_line2 = $("<div></div>");
    div_options_content_line2.addClass("row mt-1 mb-2");
    //题目选项div_第二行选项_左填充col
    var div_options_content_line2_empty_col_left = $("<div></div>");
    div_options_content_line2_empty_col_left.addClass("col-1");
    //题目选项div_第二行选项_C选项
    var div_options_content_C_choice = $("<div></div>");
    div_options_content_C_choice.addClass("col-5 mr-1 option_div border-bottom shadow-sm");
    var div_options_content_C_choice_label = $("<label></label>").text(multiple_options_split[2]);
    div_options_content_C_choice_label.addClass("question_option");
    div_options_content_C_choice_label.attr("id", "question_" + question.id + "_3");
    var div_options_content_C_choice_i = $("<i></i>");
    div_options_content_C_choice_i.addClass("fa fa-question-circle float_mark");
    div_options_content_C_choice_i.css("font-size", "23px");
    div_options_content_C_choice.append(div_options_content_C_choice_label, div_options_content_C_choice_i);
    //题目选项div_第二行选项_右填充col
    var div_options_content_line2_empty_col_right = $("<div></div>");
    div_options_content_line2_empty_col_right.addClass("col-1");
    //如果有四个选项则添加该选项
    if (multiple_options_split.length >= 4) {
        //如果有四个选项则添加该选项
        var div_options_content_D_choice = $("<div></div>");
        div_options_content_D_choice.addClass("col-5 mr-1 option_div border-bottom shadow-sm");
        var div_options_content_D_choice_label = $("<label></label>").text(multiple_options_split[3]);
        div_options_content_D_choice_label.addClass("question_option");
        div_options_content_D_choice_label.attr("id", "question_" + question.id + "_4");
        var div_options_content_D_choice_i = $("<i></i>");
        div_options_content_D_choice_i.addClass("fa fa-question-circle float_mark");
        div_options_content_D_choice_i.css("font-size", "23px");
        div_options_content_D_choice.append(div_options_content_D_choice_label, div_options_content_D_choice_i);
        //题目选项div_第二行选项_组合
        div_options_content_line2.append(div_options_content_line2_empty_col_left, div_options_content_C_choice,
            div_options_content_D_choice, div_options_content_line2_empty_col_right);
    } else {
        var div_options_content_D_empty = $("<div></div>");
        div_options_content_D_empty.addClass("col-5 mr-1");
        //题目选项div_第二行选项_组合
        div_options_content_line2.append(div_options_content_line2_empty_col_left, div_options_content_C_choice,
            div_options_content_D_empty, div_options_content_line2_empty_col_right);
    }
    div_options_outside.append(div_options_content_line1, div_options_content_line2);
    //填充所有内容
    div_outside.append(div_title, div_statement, div_options_outside);
    //添加到页面中
    $("#practice_content").append(div_outside);
}

//验证答案
function verifyAnswer(id_question,options_question) {
    var p_i={"qid":id_question,"o_p":options_question,"answer":[1,2]};
    var p_i_json=JSON.stringify(p_i);
    $.ajax({
        url:"getAnswer",
        type: "POST",
        data: p_i_json,
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success:function (practiceInfo) {
            settlement(practiceInfo);
        }
    });
}
//计算成绩
function settlement(practiceInfo) {
    $("#practice_content").fadeOut(777);
    $("#submit_practice").fadeOut(777);
    //解绑事件
    $(document).off("mouseenter mouseleave click",".option_div");
    //去除图标
    $(".fa-question-circle").remove();
    //检测答题情况
    var right_count=0;
    for(var i=0;i<practiceInfo.qid.length;i++)
    {
        var questionId=practiceInfo.qid[i];
        var choice=practiceInfo.o_p[i];
        var answer=practiceInfo.answer[i];
        if(choice == answer && answer.length==1)
        {
            var target_id="question_"+questionId+"_"+answer;
            answer_right(target_id);
            right_count++;
        }
        else if(choice == answer && answer.length>1)
        {
            var answers=answer.split(",");
            var answers_id=new Array();
            for (var j=0;j<answers.length;j++)
            {
                answers_id.push("question_"+questionId+"_"+answers[j]);
            }
            answer_multiple_right(answers_id);
            right_count++;
        }
        else if(choice != answer && answer.length>1)
        {
            var answers=answer.split(",");
            var answers_id=new Array();
            for (var j=0;j<answers.length;j++)
            {
                answers_id.push("question_"+questionId+"_"+answers[j]);
            }
            if(choice.length>1)
            {
                var choices=choice.split(",");
                var choices_id=new Array();
                for(var z=0;z<choices.length;z++)
                {
                    choices_id.push("question_"+questionId+"_"+choices[z]);
                }
                answer_multiple_wrong(choices_id,answers_id);
            }
            else
            {
                var choices_id=new Array();
                choices_id.push("question_"+questionId+"_"+choice);
                answer_multiple_wrong(choices_id,answers_id);
            }
        }
        else if(choice != answer && answer.length==1)
        {
            var choice_target_id="question_"+questionId+"_"+choice;
            var answer_target_id="question_"+questionId+"_"+answer;
            answer_wrong(choice_target_id,answer_target_id);
        }
    }

    //构建新页面内容
    var settlement_outside=$("<div></div>");
    settlement_outside.addClass("mt-2 mr-5 ml-5 mb-1 pl-5 pr-5");
    var settlement_form=$("<div></div>");
    settlement_form.addClass("mt-2 mr-5 ml-5 pr-5 pl-5 mb-3 bg-white border-bottom shadow info_radius");
    var settlement_form_row_1=$("<div></div>");
    settlement_form_row_1.addClass("row mt-1 mb-2");
    var settlement_form_row_1_label=$("<label></label>");
    settlement_form_row_1_label.text("成绩计算")
    settlement_form_row_1_label.css("font-size","27px");
    var settlement_form_row_1_i=$("<i></i>");
    settlement_form_row_1_i.addClass("fa fa-list-ul mt-2 ml-2");
    settlement_form_row_1_i.css("font-size","31px");
    settlement_form_row_1.append(settlement_form_row_1_label,settlement_form_row_1_i);

    var settlement_form_row_2=$("<div></div>");
    settlement_form_row_2.addClass("row mt-1 mb-1");
    var settlement_form_row_2_col_left=$("<div></div>");
    settlement_form_row_2_col_left.addClass("col-3");
    var settlement_form_row_2_col_right=$("<div></div>");
    settlement_form_row_2_col_right.addClass(("col-3"));

    var settlement_form_row_2_col_tab=$("<div></div>");
    settlement_form_row_2_col_tab.addClass("col-3 bg-dark text-center info_lab");
    var settlement_form_row_2_col_tab_i=$("<i></i>");
    settlement_form_row_2_col_tab_i.addClass("fa fa-dot-circle-o");
    settlement_form_row_2_col_tab_i.css("color","#e9ecef");
    var settlement_form_row_2_col_tab_label=$("<label></label>").text("正确题目");
    settlement_form_row_2_col_tab_label.addClass("ml-1 text-white mt-1");
    settlement_form_row_2_col_tab.append(settlement_form_row_2_col_tab_i,settlement_form_row_2_col_tab_label);

    var settlement_form_row_2_col_content=$("<div></div>");
    settlement_form_row_2_col_content.addClass("col-3 text-center");
    var settlement_form_row_2_col_content_label=$("<label></label>").text(right_count+" / "+practiceInfo.answer.length);
    settlement_form_row_2_col_content_label.addClass("mt-1");
    settlement_form_row_2_col_content.append(settlement_form_row_2_col_content_label);

    settlement_form_row_2.append(settlement_form_row_2_col_left,settlement_form_row_2_col_tab,settlement_form_row_2_col_content
    ,settlement_form_row_2_col_right);

    var settlement_form_row_3=$("<div></div>");
    settlement_form_row_3.addClass("row mt-1 mb-3");
    var settlement_form_row_3_col_left=$("<div></div>");
    settlement_form_row_3_col_left.addClass("col-3");
    var settlement_form_row_3_col_right=$("<div></div>");
    settlement_form_row_3_col_right.addClass(("col-3"));

    var settlement_form_row_3_col_tab=$("<div></div>");
    settlement_form_row_3_col_tab.addClass("col-3 bg-dark text-center info_lab");
    var settlement_form_row_3_col_tab_i=$("<i></i>");
    settlement_form_row_3_col_tab_i.addClass("fa fa-dot-circle-o");
    settlement_form_row_3_col_tab_i.css("color","#e9ecef");
    var settlement_form_row_3_col_tab_label=$("<label></label>").text("分数");
    settlement_form_row_3_col_tab_label.addClass("ml-1 text-white mt-1");
    settlement_form_row_3_col_tab.append(settlement_form_row_3_col_tab_i,settlement_form_row_3_col_tab_label);

    var settlement_form_row_3_col_content=$("<div></div>");
    settlement_form_row_3_col_content.addClass("col-3 text-center");
    var settlement_form_row_3_col_content_label=$("<label></label>").text(parseInt($("#each_score").text())*right_count);
    settlement_form_row_3_col_content_label.addClass("mt-1")
    settlement_form_row_3_col_content.append(settlement_form_row_3_col_content_label);

    settlement_form_row_3.append(settlement_form_row_3_col_left,settlement_form_row_3_col_tab,settlement_form_row_3_col_content
        ,settlement_form_row_3_col_right);
    settlement_form.append(settlement_form_row_1,settlement_form_row_2,settlement_form_row_3);
    settlement_outside.append(settlement_form);
    $("header").after(settlement_outside);

    var down_div=$("<div></div>");
    down_div.attr("id","down_answers_form");

    var down_i_div=$("<div></div>");
    down_i_div.addClass("row");
    var down_i_div_col=$("<div></div>");
    down_i_div_col.addClass("col text-center");
    var down_i_div_col_i=$("<i></i>");
    down_i_div_col_i.addClass("fa fa-arrow-circle-down");
    down_i_div_col_i.css("font-size","35px");
    down_i_div_col_i.attr("id","down_i_id");
    down_i_div_col.append(down_i_div_col_i);
    down_i_div.append(down_i_div_col);

    var down_label_div=$("<div></div>");
    down_label_div.addClass("row");
    var down_label_div_col=$("<div></div>");
    down_label_div_col.addClass("col text-center");
    var down_label_col_label=$("<label></label>").text("点击查看答题详情");
    down_label_col_label.css("font-size","17px");
    down_label_div_col.append(down_label_col_label);
    down_label_div.append(down_label_div_col);

    down_div.append(down_label_div,down_i_div);
    $(settlement_form).after(down_div);
    $("#practice_content").removeClass("mt-2 mr-5 ml-5 mb-1 pl-5 pr-5");
    $("#practice_info").remove();
    $(down_div).after($("#practice_content"));
    $(down_div).click(function () {
        if($("#down_i_id").hasClass("fa-arrow-circle-down"))
        {
            $("#down_i_id").removeClass("fa-arrow-circle-down");
            $("#down_i_id").addClass("fa-arrow-circle-up");
        }
        else
        {
            $("#down_i_id").addClass("fa-arrow-circle-down");
            $("#down_i_id").removeClass("fa-arrow-circle-up");
        }
        $("#practice_content").slideToggle(777);
    });
    $("#modal_body_message").text("*已完成成绩结算，请点击弹窗外返回*");
    $("#submit_confirm_dismiss").removeClass("btn-danger");
    $("#submit_confirm_dismiss").addClass("btn-success");
    $("#submit_confirm_dismiss").text("返回")
    $("#submit_confirm_confirm").remove();
}

//显示结果-正确答案
function answer_right(id) {
    var options_content=$("#"+id).parent().parent().parent();
    var answer_statement_div=$("<div></div>");
    answer_statement_div.addClass("row mt-2 mb-2");
    var answer_statement_div_col_left=$("<div></div>");
    answer_statement_div_col_left.addClass("col-1");
    var answer_statement_div_col_right=$("<div></div>");
    answer_statement_div_col_right.addClass("col-1");
    var answer_statement_div_option=$("<div></div>");
    answer_statement_div_option.addClass("col-5 question_statement pass");
    answer_statement_div_option.text("你的答案:"+$("#"+id).text());
    var answer_statement_div_answer=$("<div></div>");
    answer_statement_div_answer.addClass("col-5 question_statement pass");
    answer_statement_div_answer.text("正确答案："+$("#"+id).text());
    answer_statement_div.append(answer_statement_div_col_left,answer_statement_div_option,answer_statement_div_answer,
        answer_statement_div_col_right);
    options_content.before(answer_statement_div);
}
//显示结果-错误答案
function answer_wrong(choice_target_id,answer_target_id) {
    var options_content=$("#"+choice_target_id).parent().parent().parent();
    var answer_statement_div=$("<div></div>");
    answer_statement_div.addClass("row mt-2 mb-2");
    var answer_statement_div_col_left=$("<div></div>");
    answer_statement_div_col_left.addClass("col-1");
    var answer_statement_div_col_right=$("<div></div>");
    answer_statement_div_col_right.addClass("col-1");
    var answer_statement_div_option=$("<div></div>");
    answer_statement_div_option.addClass("col-5 question_statement unqualified");
    answer_statement_div_option.text("你的答案:"+$("#"+choice_target_id).text());
    var answer_statement_div_answer=$("<div></div>");
    answer_statement_div_answer.addClass("col-5 question_statement pass");
    answer_statement_div_answer.text("正确答案："+$("#"+answer_target_id).text());
    answer_statement_div.append(answer_statement_div_col_left,answer_statement_div_option,answer_statement_div_answer,
        answer_statement_div_col_right);
    options_content.before(answer_statement_div);
    $("#"+choice_target_id).parent().removeClass("selected_option");
    $("#"+choice_target_id).parent().addClass("wrong_option");
    $("#"+choice_target_id).siblings("i").removeClass("fa-check-circle");
    $("#"+choice_target_id).siblings("i").addClass("fa-times-circle");
    $("#"+answer_target_id).parent().addClass("selected_option");
    $("#"+answer_target_id).siblings("i").removeClass("fa-question-circle");
    $("#"+answer_target_id).siblings("i").addClass("fa-check-circle");
}
//显示结果-正确多选答案
function answer_multiple_right(answers_id){
    var answerText="";
    for(var i=0;i<answers_id.length;i++)
    {
        answerText+=($("#"+answers_id[i]).text()+" ");
    }
    var answer_statement_div=$("<div></div>");
    answer_statement_div.addClass("row mt-2 mb-2");
    var answer_statement_div_col_left=$("<div></div>");
    answer_statement_div_col_left.addClass("col-1");
    var answer_statement_div_col_right=$("<div></div>");
    answer_statement_div_col_right.addClass("col-1");
    var answer_statement_div_option=$("<div></div>");
    answer_statement_div_option.addClass("col-5 question_statement pass");
    answer_statement_div_option.text("你的答案:"+answerText);
    var answer_statement_div_answer=$("<div></div>");
    answer_statement_div_answer.addClass("col-5 question_statement pass");
    answer_statement_div_answer.text("正确答案："+answerText);
    answer_statement_div.append(answer_statement_div_col_left,answer_statement_div_option,answer_statement_div_answer,
        answer_statement_div_col_right);
    var options_content=$("#"+answers_id[0]).parent().parent().parent();
    options_content.before(answer_statement_div);
};
//显示结果-错误多选答案
function answer_multiple_wrong(choice_target_id,answer_target_id) {
    var answerText="";
    var optionsText="";
    for(var i=0;i<answer_target_id.length;i++)
    {
        answerText+=($("#"+answer_target_id[i]).text()+" ");
    }
    for(var i=0;i<choice_target_id.length;i++)
    {
        optionsText+=($("#"+choice_target_id[i]).text()+" ");
    }
    var answer_statement_div=$("<div></div>");
    answer_statement_div.addClass("row mt-2 mb-2");
    var answer_statement_div_col_left=$("<div></div>");
    answer_statement_div_col_left.addClass("col-1");
    var answer_statement_div_col_right=$("<div></div>");
    answer_statement_div_col_right.addClass("col-1");
    var answer_statement_div_option=$("<div></div>");
    answer_statement_div_option.addClass("col-5 question_statement unqualified");
    answer_statement_div_option.text("你的答案:"+optionsText);
    var answer_statement_div_answer=$("<div></div>");
    answer_statement_div_answer.addClass("col-5 question_statement pass");
    answer_statement_div_answer.text("正确答案："+answerText);
    answer_statement_div.append(answer_statement_div_col_left,answer_statement_div_option,answer_statement_div_answer,
        answer_statement_div_col_right);
    var options_content=$("#"+answer_target_id[0]).parent().parent().parent();
    options_content.before(answer_statement_div);
}

