import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../store/slices/uiSlice';
import { addDocument } from '../../store/slices/documentsSlice';
import Modal from '../../components/Modal/Modal';
import { DOCUMENT_TYPES } from '../../utils/constants';
import { generateId } from '../../utils/helpers';
import { FileText, User, Mail, Heart, BarChart3, Receipt, Building2, FileSignature, File } from 'lucide-react';
import './CreateDocumentModal.css';

const icons = { FileText, User, Mail, Heart, BarChart3, Receipt, Building2, FileSignature, File };

export default function CreateDocumentModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeModal = useSelector(state => state.ui.activeModal);

  const isOpen = activeModal === 'createDocument';

  const handleSelectType = (typeKey) => {
    const docType = DOCUMENT_TYPES[typeKey];
    const newDoc = {
      id: generateId('doc'),
      title: `New ${docType.label}`,
      type: typeKey,
      content: null,
      favorite: false,
      deleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addDocument(newDoc));
    dispatch(closeModal());

    if (typeKey === 'cv') {
      navigate(`/cv-builder/${newDoc.id}`);
    } else if (typeKey === 'coverLetter') {
      navigate(`/cover-letter/${newDoc.id}`);
    } else {
      navigate(`/editor/${newDoc.id}`);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(closeModal())}
      title="Create New Document"
      description="Choose a document type or template to start editing"
      size="lg"
    >
      <div className="createDocGrid">
        {Object.entries(DOCUMENT_TYPES).map(([key, config]) => {
          const Icon = icons[config.icon] || FileText;
          return (
            <button
              key={key}
              className="createOptionCard"
              onClick={() => handleSelectType(key)}
            >
              <div className="optionIcon" style={{ color: config.color }}>
                <Icon size={24} />
              </div>
              <div className="optionTitle">{config.label}</div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
