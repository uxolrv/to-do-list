import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete, MdBuild } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    color: #dee2e6;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        color:#ff6b6b;
        display: block;
    }
    /* display: none; */
`;

const Modify = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    color: #dee2e6;
    font-size: 20px;
    cursor: pointer;
    /* display: none; */
    &:hover {
        color: rgb(0, 156, 125);
        display: block;
    }
`;

// 투두 리스트 전체를 감싸는 블럭
const TodoItemBlock = styled.div`
    background-color: #f8f9fa;
    /* background-color: rgba(250, 250, 250); */
    display: flex;
    /* border-radius: 15px; */
    align-items: center;
    /* box-shadow: 2px 2px 3px rgb(220, 220, 220) ; */
    padding: 10px 0px;
    margin: 5px 20px;
    &:hover {
        ${Remove} {
            display: initial;
        }
    }
`

const CheckCircle = styled.div`
    width: 17px;
    height: 17px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    /* color: #ced4da; */
    /* background: rgb(230, 230, 230); */
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    margin-left: 15px;
    cursor: pointer;
    ${props =>
        props.done &&
        css`
        border: 1px solid rgb(0, 156, 125);
        color: rgb(0, 156, 125);
    `}
`;

// 인풋창
const Text = styled.input`
    flex: 1;
    font-size: 14px;
    font-family: 'Nanum Myeongjo', serif;
    color: #495057;
    border: none;
    /* outline: none; */
    background: transparent;
    &:focus {
        color: rgb(0, 156, 125);
        outline: none;
        /* border-bottom: 1px solid #ced4da; */
    }
    &:hover {
        outline: none;
    }
    ${props =>
        props.writemode &&
        css`
        border-bottom: 1px solid #ced4da;
        `
    }
    ${props =>
        props.done &&
        css`
        color: #ced4da;
    `}
`;

function TodoItem({ id, done, text }) {
    // console.log({ id })
    const [writemode, setWritemode] = useState(false);

    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({ type: 'TOGGLE', id });
    const onRemove = () => {
        fetch(`http://localhost:3001/todos/${id}`, {
            method: 'DELETE'
        })
        dispatch({ type: 'REMOVE', id })
    };
    const onUpdate = (e) => {
        if (e.key == "Enter") {

            // const todo = {
            //     text: e.target.value,
            //     ...todo,
            // }

            fetch(`http://localhost:3001/todos/${id}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: e.target.value,
                    done
                })
            })
            dispatch({ type: 'UPDATE', id, text: e.target.value })
            setWritemode(false)
        }
        // setTodo(e.target.value)
    }
    const handleWriteMode = () => {
        setWritemode(!writemode)
    }


    return (
        <TodoItemBlock>
            <CheckCircle done={done} onClick={onToggle}>
                {done && <MdDone />}
            </CheckCircle>
            <Text type="text" disabled={writemode ? "" : "disabled"} done={done} writemode={writemode} defaultValue={text} onKeyPress={onUpdate}></Text>
            <Modify>
                <MdBuild onClick={handleWriteMode} />
            </Modify>
            <Remove onClick={onRemove}>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    );
}

// 다른 항목이 업데이트될 때, 불필요한 리렌더링을 방지 ==> 성능 최적화!
export default React.memo(TodoItem);