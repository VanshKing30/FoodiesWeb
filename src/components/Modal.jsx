import React from 'react';
import ModalForm from './ModalForm';

const Modal = ({ showModal, setShowModal, sectionName, canteenData, onSubmit, id }) => {
  return (
    <div className={`modal ${showModal ? 'block' : 'hidden'}`}>
      <div className="modal-overlay"></div>
      <div className="modal-container bg-white w-1/2 mx-auto mt-20 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Select Recipes for {sectionName}</h2>
        {/* Pass the onSubmit function to ModalForm */}
        <ModalForm onSubmit={onSubmit} sectionName={sectionName} canteenData={canteenData} id={id} />
      </div>
    </div>
  );
};

export default Modal;





