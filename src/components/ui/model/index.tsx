"use client";
import React, { useState } from "react";
import "./style.css";
import Login from "@/components/popup/signin";
import Register from "@/components/popup/signup";
import { RxCross1 } from "react-icons/rx";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [showLogin, setShowLogin] = useState(true);

  if (!isOpen) return null;

  const toggleForm = () => setShowLogin((prev) => !prev);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Close"
        >
          <RxCross1 size={20} />
        </button>

        {showLogin ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Register toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default Modal;