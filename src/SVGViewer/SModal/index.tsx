import React from 'react';
import './SModal.css';

interface SModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name: string;
    summary: string;
    desTitle: string;
    description: string;
  };
}

const SModal: React.FC<SModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{data.name}</h2>
        <div className="modal-summary">{data.summary}</div>
        <div className="modal-description">
          <h3>{data.desTitle}</h3>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SModal;
