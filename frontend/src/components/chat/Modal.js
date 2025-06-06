import "./style.css"

export default function Modal({ show, onClose, children }) {
  
  if (!show) return null;
    return (
    <div>
        <div className="chat-modal-backdrop">
            <div className="chat-modal-content">
                {children}
                <button onClick={onClose} className="close-btn">X</button>
            </div>
        </div>
    </div>
  )
}
