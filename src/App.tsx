import React from 'react';
import TodoList from './components/List';
import "./App.css"

const App: React.FC = () => {
  return (
    <div className='todo_list'>      
      <TodoList />
    </div>
  );
};

export default App;
