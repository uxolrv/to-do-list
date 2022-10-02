import React from 'react';
import styled from 'styled-components';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px 80px 32px;
    overflow-y: auto;
`;

function TodoList() {
    return <TodoListBlock>TodoList</TodoListBlock>
}

export default TodoList;