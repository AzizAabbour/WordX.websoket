import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToast } from '../../store/slices/uiSlice';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Toast.css';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

function ToastItem({ toast }) {
  const dispatch = useDispatch();
  const Icon = icons[toast.type] || Info;

  const dismiss = useCallback(() => {
    dispatch(removeToast(toast.id));
  }, [dispatch, toast.id]);

  useEffect(() => {
    const timer = setTimeout(dismiss, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [dismiss, toast.duration]);

  return (
    <motion.div
      className={`toast toast-${toast.type || 'info'}`}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Icon size={18} className="toastIcon" />
      <div className="toastContent">
        {toast.title && <p className="toastTitle">{toast.title}</p>}
        <p className="toastMessage">{toast.message}</p>
      </div>
      <button className="toastClose" onClick={dismiss} aria-label="Close notification">
        <X size={14} />
      </button>
    </motion.div>
  );
}

export default function ToastContainer() {
  const toasts = useSelector(state => state.ui.toasts);

  return (
    <div className="toastContainer" role="alert" aria-live="polite">
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
