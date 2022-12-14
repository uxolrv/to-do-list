// todo list의 레이아웃
import React from 'react';
import styled from 'styled-components';

const TodoTemplateBlock = styled.div`
    width: 650px;
    height: 650px;
    position: relative;
    background: #1C6758;
    /* border-radius: 16px; */
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.4);

    /* margin: 0 auto; */

    /* margin-top: 96px;
    margin-bottom: 32px; */
    display: flex;
    flex-direction: column;
`

function TodoTemplate({ children }) {
    return <TodoTemplateBlock>{children}</TodoTemplateBlock>
}

export default TodoTemplate;