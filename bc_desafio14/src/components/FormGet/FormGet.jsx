import React, { useState, useEffect } from 'react';
import { ref, onValue, remove, set } from 'firebase/database';
import db from '../../Bd/FireBase';
import ModalForm from '../ModalForm/ModalForm';
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import './styles.css';

function FormGet() {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);

    useEffect(() => {
        const todosRef = ref(db, 'todos');
        onValue(todosRef, (snapshot) => {
            const data = snapshot.val();
            const loadedTodos = [];
            for (const key in data) {
                loadedTodos.push({ id: key, ...data[key] });
            }
            //   fav
            loadedTodos.sort((a, b) => b.isFavorite - a.isFavorite);
            setTodos(loadedTodos);
        });
    }, []);

    const handleEdit = (todo) => {
        setCurrentTodo(todo);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        const todoRef = ref(db, 'todos/' + id);
        remove(todoRef);
    };

    const handleFavorite = (todo) => {
        const todoRef = ref(db, 'todos/' + todo.id);
        set(todoRef, { ...todo, isFavorite: !todo.isFavorite });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTodo(null);
    };

    return (
        <div className='formget'>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <div className='favname'>
                            <button onClick={() => handleFavorite(todo)}>
                                {todo.isFavorite ? <FaStar /> : <FaRegStar />}
                                {todo.isFavorite ? '' : ''}
                            </button>
                        </div>
                        <div className='description'>
                            <h2>{todo.title}</h2><br />
                            <p className={`priority ${todo.priority}`}>Prioridad: {todo.priority}</p><br />
                            <p>{todo.description}</p>
                        </div>
                        <div className='editdelete'>
                            <button onClick={() => handleEdit(todo)}><FiEdit /></button>
                            <button onClick={() => handleDelete(todo.id)}><RiDeleteBin6Line /></button>
                        </div>
                    </li>
                ))}
            </ul>
            {currentTodo && (
                <ModalForm
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    todo={currentTodo}
                />
            )}
        </div>
    );
}

export default FormGet;
