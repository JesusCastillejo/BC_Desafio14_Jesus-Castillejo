import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ref, push, set } from 'firebase/database';
import db from '../../Bd/FireBase';
import './styles.css';

Modal.setAppElement('#root');

function ModalForm({ isOpen, onRequestClose, todo }) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('baja');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setPriority(todo.priority);
            setDescription(todo.description);
        }
    }, [todo]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title === '' || priority === '' || description === '') {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }
        if (todo) {
            const todoRef = ref(db, 'todos/' + todo.id);
            set(todoRef, { title, priority, description }).then(() => {
                onRequestClose();
                setTitle('');
                setPriority('baja');
                setDescription('');
            });
        } else {
            push(ref(db, 'todos'), { title, priority, description }).then(() => {
                onRequestClose();
                setTitle('');
                setPriority('baja');
                setDescription('');
            });
        }
    };



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                content: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: '25px',
                    padding: '20px',
                    width: '400px',
                    height: '500px',
                    margin: 'auto'
                }
            }}
        >
            <div className='modal'>
                <h2>{todo ? 'Editar tarea' : 'Nueva tarea'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Título:
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label>
                        Prioridad:
                        <select value={priority} onChange={e => setPriority(e.target.value)}>
                            <option value="baja">Baja</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                        </select>
                    </label>
                    <label>
                        Descripción:
                        <textarea value={description} onChange={e => setDescription(e.target.value)} />
                    </label>
                    <div className='buttondiv'>
                        <button type="submit">{todo ? 'Actualizar' : 'Crear'}</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default ModalForm;
