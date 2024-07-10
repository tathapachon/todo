import React, { useState } from 'react';

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [error, setError] = useState<string>('');

  const handleEdit = () => {
    if (isEditing) {
      if (!newTitle.trim()) {
        setError('Debes ingresar una tarea');
        return;
      }
      onEdit(id, newTitle);
    }
    setIsEditing(!isEditing);
    setError('');
  };

  return (
    <div className={`Item ${completed ? 'completed' : ''}`}>
        <div>
        {!isEditing && (
          <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        )}
        </div>
       
      {isEditing ? (       
        <div>
        <input
            className='input-item'
            type="text"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
              setError('');
            }}
          />
          {error && <p className='error-message'>{error}</p>}
        </div>         
        
      ) : (
        <h3 className='title'>{title}</h3>
      )}     
     <div className='button-card'>
       <p>{completed ? '¡Listo pues!' : '¡Hacele pues!'}</p>
       <button className='button-item' onClick={handleEdit}>{isEditing ? 'Guardar' : 'Editar'}</button>
       <button className='button-item' onClick={() => onDelete(id)}>X</button>
     </div>
    </div>
  );
};

export default TodoItem;
