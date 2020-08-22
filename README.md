# junior_project_intelligent_education_system————大三JEE程序设计项目-智能教育系统
###### 截止时间:2020-06-14（功能未完全完成）
## 摘要
本项目是基于后端SpringBoot框架，前端JQuery，Boostrap和fontawesome等开发技术所开发的，涉及智能教育的网页端程序。由于各种原因，到达截止日期时本项目仍处于开发中的状态，实现的内容中前端的设计与开发占有的比重更大。
## 开发配置环境
- **开发工具**：IntelliJ IDEA
- **数据库**：MySQL
- **相关技术**：SpringBoot整合SSM，MyBatis，JQuery，Bootstrap
## 已实现主要功能
- 学生用户-动态生成练习测试并自动判卷
- 教师用户-新增练习题功能
## 页面展示
### 登录页面
- 登录页面初始状态：  
 ![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p1.png)
- 发送ajax请求后，出现“未找到该用户”、“用户密码错误”、“用户类型有误”时的反馈  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p2.png)  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p3.png)  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p4.png)
### 注册页面
- 注册页面初始状态：  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p5.png)  
- 每个输入框都设置了keyup事件检查输入：  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p6.png)  
- ajax请求反馈：  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p8.png)  
### 练习题参数选择页面
- 选择参数，系统将根据参数生成练习题目  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p10.png)
- 弹窗确认  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p11.png)
### 自动判卷的题目练习测试页面
- 练习题会根据参数选择页面中的参数生成练习测试  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p12.png)
- 用户选择某一选项时，选项样式会发生改变；用户将鼠标悬挂于某一未选定的选项时也会发生样式变化（反转颜色，同时问号图标旋转）  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p13.png)
- 提交答案时，若有题目未完成则会进行提示，并且不能进行提交判卷；若已完成，则可以提交由系统进行自动判卷
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p13-1.png)  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p13-2.png)
- 提交后，系统计算成绩，页面动态发生改变，显示答题成绩  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p14.png)
- 点击图标可以查看答题详情，此处是将刚才加载后题目根据对错情况进行再次利用，无论选择正确与否，都会显示用户选择的答案和正确答案，区别是选择错误的答案选项会以红色显示
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p15.png)
### 新增题目页面
- 页面初始状态：
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p16.png)
- 不同类型的题目有不同的选项输入面板：
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p16-1.png)  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p16-2.png)  
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p16-3.png)
- keyup事件检查输入：
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p16-4.png)
- 正式提交前，会有弹窗进行二次确认：
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p16-5.png)
### 课程管理主页
- 初始状态如下，页面会加载当前登入的教师用户所属的课程：
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p19.png)
- 鼠标悬挂到列表某一项时会有样式变化和文字提示：
![image](https://github.com/octu-008/junior_project_intelligent_education_system/blob/master/screenshot/p20.png)
