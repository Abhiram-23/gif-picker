interface ToastProps {
  message: string;
}

const Toast = ({ message }: ToastProps) => {
  return (
    <div className="toast">
      <span className="toast-dot"></span>
      {message}
    </div>
  );
};

export default Toast;
