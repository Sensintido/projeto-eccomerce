import React from 'react';
import './Modal.css';
import pare from '../../assets/pare.png';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-icon"><img src={pare} alt="Pare" /></div>
        <h2 className="modal-title">FIM  DA EXPERIÊNCIA</h2>
        <p className="modal-text">
          Esse site foi desenvolvido apenas para aprimorar minhas habilidades como fullstack, mas muito obrigado por ter experimentado a
          experiência.
        </p>
        <button className="modal-btn" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
};

export default Modal;