import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Modal.css';

export default function Modal({ open, onClose, title, description, children, size = 'md', showClose = true }) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose?.()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="modalOverlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className={`modalContent modal-${size}`}
                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ duration: 0.15 }}
              >
                {(title || showClose) && (
                  <div className="modalHeader">
                    <div>
                      {title && <Dialog.Title className="modalTitle">{title}</Dialog.Title>}
                      {description && <Dialog.Description className="modalDescription">{description}</Dialog.Description>}
                    </div>
                    {showClose && (
                      <Dialog.Close asChild>
                        <button className="modalClose" aria-label="Close">
                          <X size={18} />
                        </button>
                      </Dialog.Close>
                    )}
                  </div>
                )}
                <div className="modalBody">
                  {children}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
