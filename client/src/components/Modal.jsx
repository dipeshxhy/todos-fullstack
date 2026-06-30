const Modal = ({ id, children }) => {
  return (
    <div>
      <dialog className="modal" id={id}>
        <div className="modal-action">{children}</div>
      </dialog>
    </div>
  );
};
export default Modal;
