import './Ccsreset/reset.css';
import './Ccsreset/normalizer.css';
import './App.css';
import React, { useState } from 'react';
import ModalForm from './components/ModalForm/ModalForm';
import FormGet from './components/FormGet/FormGet';
import { SlNote } from "react-icons/sl";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='header'>
        <h1>To-do</h1>
        <button onClick={handleOpenModal}><SlNote /></button>
      </div>
      <ModalForm isOpen={isModalOpen} onRequestClose={handleCloseModal} />
      <FormGet />
    </div>
  );
}

export default App;
