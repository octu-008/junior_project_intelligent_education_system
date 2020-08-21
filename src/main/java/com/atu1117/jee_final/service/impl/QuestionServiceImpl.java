package com.atu1117.jee_final.service.impl;

import com.atu1117.jee_final.dao.QuestionMapper;
import com.atu1117.jee_final.pojo.Msg;
import com.atu1117.jee_final.pojo.PracticeInfo;
import com.atu1117.jee_final.pojo.Question;
import com.atu1117.jee_final.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service("questionServiceImpl")
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionMapper questionMapper;

    @Override
    public Msg insertQuestionVerify(Question question) {
        questionMapper.insert(question);
        return Msg.success();
    }

    @Override
    public List<Question> getQuestionAll(int number) {
        List<Question> allQuestion=questionMapper.findAll();
        return getTargetQuestions(allQuestion,number);
    }

    @Override
    public PracticeInfo getAnswer(PracticeInfo practiceInfo) {
        PracticeInfo pInfo=practiceInfo;
        int idInt=0;
        Question target;
        String[] questionId=practiceInfo.getQid();
        String[] answer=new String[questionId.length];
        for(int i=0;i<questionId.length;i++)
        {
            idInt=Integer.parseInt(questionId[i]);
            target=questionMapper.findById(idInt);
            answer[i]=target.getAnswer();
        }
        pInfo.setAnswer(answer);
        return pInfo;
    }

    List<Question> getTargetQuestions(List<Question> questionSelected, int targetNumber)
    {
        List<Question> selectedQuestion=questionSelected;
        List<Question> targetQuestions=new ArrayList<>();
        List<Integer> indexHasSelected=new ArrayList<>();
        int selectedId=0;
        boolean flag=true;
        Random random=new Random();
        for(int i=0;i<targetNumber;i++)
        {
            selectedId=random.nextInt(selectedQuestion.size());
            if(indexHasSelected.size()>=1)
            {
                for(int j=0;j<indexHasSelected.size();j++)
                {
                    if(selectedId==indexHasSelected.get(j))
                    {
                        flag=false;
                        break;
                    }
                }
            }
            if(flag)
            {
                indexHasSelected.add(selectedId);
                targetQuestions.add(selectedQuestion.get(selectedId));
            }
            else
            {
                i--;
                flag=true;
            }
        }
        return targetQuestions;
    }
}
