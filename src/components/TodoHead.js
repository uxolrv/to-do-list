// 오늘의 날짜, 요일, 남은 할일 개수
import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';

const TodoHeadBlock = styled.div`
    padding: 48px 32px 24px 32px;
    border-bottom: 1px solid #e9ecef;
    font-family: 'DM Serif Display', serif;
    h1 {
        margin: 0;
        font-size: 60px;
        color: #EEF2E6;
        text-align: center;
        line-height: 50px;
        
    }
    .year {
        color: #D6CDA4;
        margin-top: 15px;
        font-size: 85px;
        font-style: italic;
    }
    .day {
        font-style: italic;
        /* color: #D6CDA4; */
        line-height: 35px;
        font-size: 45px;
        margin-right: 10px;
        text-align: center;
    }
    .tasks-left {
        color: #FDFDBD;
        font-size: 22px;
        margin: 30px 5px 0px 5px;
    }
`;

function TodoHead() {
    const todos = useTodoState();
    const undoneTasks = todos.filter(todo => !todo.done); // 할 일 개수

    const today = new Date();
    const dateString = today.toLocaleDateString('en-EN', {
        // year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const yearString = today.toLocaleDateString('en-EN', {
        year: 'numeric'
    })
    const dayName = today.toLocaleDateString('en-EN', { weekday: 'long' });


    return (
        <TodoHeadBlock>
            <h1 className='year'>{yearString}</h1>
            <h1>{dateString}</h1>
            <h1 className='day'>{dayName}</h1>
            <div className='tasks-left'>{undoneTasks.length} tasks</div>
        </TodoHeadBlock>
    )
}

export default TodoHead;