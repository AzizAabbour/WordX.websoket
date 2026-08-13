import { useDispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { toggleFavorite, duplicateDocument, deleteDocument, renameDocument } from '../../store/slices/documentsSlice';
import { Star, MoreVertical, FileText, User, Mail, Heart, BarChart3, Receipt, Building2, FileSignature, File, Copy, Trash2, Edit3 } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { formatRelativeDate } from '../../utils/helpers';
import './DocumentCard.css';

const iconsMap = {
  document: FileText,
  cv: User,
  coverLetter: Mail,
  motivationLetter: Heart,
  report: BarChart3,
  invoice: Receipt,
  businessLetter: Building2,
  contract: FileSignature,
  blank: File,
};

export default function DocumentCard({ doc }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Icon = iconsMap[doc.type] || FileText;

  const handleCardClick = () => {
    if (doc.type === 'cv') {
      navigate(`/cv-builder/${doc.id}`);
    } else if (doc.type === 'coverLetter') {
      navigate(`/cover-letter/${doc.id}`);
    } else {
      navigate(`/editor/${doc.id}`);
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(doc.id));
  };

  const handleDuplicate = () => {
    dispatch(duplicateDocument(doc.id));
  };

  const handleDelete = () => {
    dispatch(deleteDocument(doc.id));
  };

  const handleRename = () => {
    const newName = prompt('Enter new document name:', doc.title);
    if (newName && newName.trim()) {
      dispatch(renameDocument({ id: doc.id, title: newName.trim() }));
    }
  };

  return (
    <div className="docCard" onClick={handleCardClick}>
      <div className="docCardPreview">
        <div className="docCardTypeIcon">
          <Icon size={24} />
        </div>
        <button
          className={`favoriteBtn ${doc.favorite ? 'active' : ''}`}
          onClick={handleFavorite}
          title={doc.favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star size={16} fill={doc.favorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="docCardBody">
        <div className="docCardInfo">
          <h3 className="docCardTitle" title={doc.title}>{doc.title}</h3>
          <p className="docCardMeta">
            Edited {formatRelativeDate(doc.updatedAt || doc.createdAt)}
          </p>
        </div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild onClick={(e) => e.stopPropagation()}>
            <button className="docCardActionsBtn" title="More options">
              <MoreVertical size={16} />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdownMenuContent" onClick={(e) => e.stopPropagation()}>
              <DropdownMenu.Item className="dropdownMenuItem" onClick={handleRename}>
                <Edit3 size={14} /> Rename
              </DropdownMenu.Item>
              <DropdownMenu.Item className="dropdownMenuItem" onClick={handleDuplicate}>
                <Copy size={14} /> Duplicate
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="dropdownMenuSeparator" />
              <DropdownMenu.Item className="dropdownMenuItem danger" onClick={handleDelete}>
                <Trash2 size={14} /> Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}
