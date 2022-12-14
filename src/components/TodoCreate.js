import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button`
    background: #1C6758;
    &:hover {
        background: #3D8361;
    }
    &:active {
        background: #D6CDA4;
    }

    z-index: 5;
    cursor: pointer;
    width: 60px;
    height: 60px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.125s all ease-in;
    ${props =>
        props.open &&
        css`
        background: #D6CDA4;
        &:hover {
            background: #3D8361;
        }
        &:active {
            background: #D6CDA4;
        }
        transform: translate(-50%, 50%) rotate(45deg);
      `}
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    padding: 32px 32px 50px 32px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: none;
    width: 100%;
    outline: none;
    font-size: 13px;
    box-sizing: border-box;
`;

function TodoCreate() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onToggle = () => setOpen(!open);
    const onChange = e => setValue(e.target.value)
    const onSubmit = e => {

        const todo = {
            text: value,
            done: false
        }

        fetch(`http://localhost:3001/todos/`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo)
        })

        e.preventDefault();
        dispatch({
            type: 'CREATE',
            todo: {
                // id: nextId.current,
                text: value,
                done: false
            }
        });
        setValue('');
        setOpen(false);
        // nextId.current += 1;
    }

    return (
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input
                            autoFocus
                            placeholder="??? ?????? ?????? ???, Enter??? ????????????"
                            onChange={onChange}
                            value={value}
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    );
}

// TodoContext?????? ???????????? ?????? state??? ?????? ??? TodoCreate???; ???????????? ??????????????? ??????
export default React.memo(TodoCreate);