import React, { useReducer, createContext, useContext, useRef, useEffect, useState } from 'react';

// let initialTodos = [];
// console.log("initialTodos", initialTodos)

function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        case 'UPDATE':
            console.log("action.text", action.text)
            console.log("action.id", action.id)
            console.log("state", state)
            return state.map(todo =>
                // console.log(action.todo.text)
                todo.id === action.id ? { text: action.text } : todo
            );
        case 'FETCH_SUCCESS':
            return action.data
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}


const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();


export function TodoProvider({ children }) {


    const [state, dispatch] = useReducer(todoReducer, []);
    const nextId = useRef(1); // 새로운 항목을 추가할 때 사용할 고유 ID

    useEffect(() => {
        fetch(`http://localhost:3001/todos/`)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json()
            })
            .then(data => {
                // setList(data)
                console.log(data)
                dispatch({
                    type: 'FETCH_SUCCESS', data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    // 만약 TodoProvider 로 감싸져있지 않다면 에러 발생
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return useContext(TodoStateContext);
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}