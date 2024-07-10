import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addTodo, toggleTodo, editTodo, deleteTodo } from '../redux/todoSlice';
import TodoItem from './TodoItem';
import './todoList.css'; 

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTodo.trim()) {
      setError('Debes agregar una tarea');
      return;
    }
    dispatch(addTodo(newTodo));
    setNewTodo('');
    setError('');
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleEditTodo = (id: number, title: string) => {
    dispatch(editTodo({ id, title }));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className='card-list'>
      <h1>¿Que hay pa' hacer hoy?</h1>
      <div className='error'>
        <form onSubmit={handleAddTodo}>
          <input
            className='input-item'
            type="text"
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
              setError('');
            }}
            placeholder="Nueva Tarea"
           
          />
          <button className='button-item' type="submit">Agregar</button>

        </form>
        {error && <p className='error-message'>{error}</p>}
      </div>
      <div className='todo-item'>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
