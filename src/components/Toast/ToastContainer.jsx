import { useSelector, useDispatch } from 'react';
import { removeToast } from '../../store/slices/uiSlice';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import './Toast.css';

export default function ToastContainer() {
  const dispatch = useDispatch();
  const toasts = useSelector(state => state.ui.toasts);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toastContainer">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type || 'info'}`}>
          <div className="toastContent">
            {toast.title && <div className="toastTitle">{toast.title}</div>}
            <div className="toastMessage">{toast.message}</div>
          </div>
          <button className="toastClose" onClick={() => dispatch(removeToast(toast.id))}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
