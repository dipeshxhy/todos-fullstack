const Toast = ({ type = true, message }) => {
  return (
    <div>
      <div className="toast toast-top toast-end">
        <div className={`alert alert-${type ? 'success' : 'error'}`}>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};
export default Toast;
