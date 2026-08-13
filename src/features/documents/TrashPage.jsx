import { useSelector, useDispatch } from 'react';
import { restoreDocument, permanentlyDeleteDocument, emptyTrash } from '../../store/slices/documentsSlice';
import EmptyState from '../../components/EmptyState/EmptyState';
import Button from '../../components/Button/Button';
import { Trash2, RotateCcw, XCircle } from 'lucide-react';
import { formatRelativeDate } from '../../utils/helpers';
import '../dashboard/DashboardPage.css';
import './TrashPage.css';

export default function TrashPage() {
  const dispatch = useDispatch();
  const deletedDocs = useSelector(state =>
    state.documents.documents.filter(d => d.deleted)
  );

  return (
    <div className="dashboardPage">
      <div className="dashboardHeader">
        <div>
          <h1 className="dashTitle">Trash</h1>
          <p className="dashSubtitle">Manage deleted documents. Items can be restored or permanently removed.</p>
        </div>
        {deletedDocs.length > 0 && (
          <Button
            variant="danger"
            icon={Trash2}
            onClick={() => {
              if (confirm('Are you sure you want to permanently delete all items in trash?')) {
                dispatch(emptyTrash());
              }
            }}
          >
            Empty Trash
          </Button>
        )}
      </div>

      {deletedDocs.length === 0 ? (
        <EmptyState
          icon={Trash2}
          title="Trash is empty"
          description="Documents you delete will appear here before permanent deletion."
        />
      ) : (
        <div className="trashList">
          {deletedDocs.map(doc => (
            <div key={doc.id} className="trashRow">
              <div className="trashDocInfo">
                <span className="trashDocTitle">{doc.title}</span>
                <span className="trashDocMeta">Deleted {formatRelativeDate(doc.deletedAt)}</span>
              </div>
              <div className="trashActions">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={RotateCcw}
                  onClick={() => dispatch(restoreDocument(doc.id))}
                >
                  Restore
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="dangerText"
                  icon={XCircle}
                  onClick={() => dispatch(permanentlyDeleteDocument(doc.id))}
                >
                  Delete Forever
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
