import React from 'react';
import ModalForm from './ModalForm';

const Modal = ({ showModal, setShowModal, sectionName, canteenData, onSubmit, id }) => {
  return (
    <div className={`modal ${showModal ? 'block p-6' : 'hidden'}`}>
      <div className="modal-overlay"></div>
      <div className="modal-container bg-white w-full p-6 mx-auto mt-20 rounded-lg md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Select Recipes for {sectionName}</h2>
        {/* Pass the onSubmit function to ModalForm */}
        <ModalForm onSubmit={onSubmit} sectionName={sectionName} canteenData={canteenData} id={id} />
      </div>
    </div>
  );
};

export default Modal;





