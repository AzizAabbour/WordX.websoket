import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DocumentCard from '../dashboard/DocumentCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { openModal } from '../../store/slices/uiSlice';
import { Search, FileText, Plus, Filter } from 'lucide-react';
import '../dashboard/DashboardPage.css';

export default function MyDocumentsPage({ typeFilter = 'all' }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState(typeFilter);

  const documents = useSelector(state =>
    state.documents.documents.filter(d => {
      if (d.deleted) return false;
      if (filterType !== 'all' && d.type !== filterType) return false;
      if (query && !d.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    })
  );

  return (
    <div className="dashboardPage">
      <div className="dashboardHeader">
        <div>
          <h1 className="dashTitle">My Documents</h1>
          <p className="dashSubtitle">All your created documents in one place</p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => dispatch(openModal('createDocument'))}
        >
          New Document
        </Button>
      </div>

      <div className="sectionHeader" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <Input
            placeholder="Filter documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={Search}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'document', 'cv', 'coverLetter', 'report'].map(t => (
            <Button
              key={t}
              variant={filterType === t ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterType(t)}
            >
              {t === 'all' ? 'All' : t.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {documents.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No documents found"
          description={query ? "No documents match your search criteria." : "Create your first document to get started."}
          actionLabel="Create Document"
          onAction={() => dispatch(openModal('createDocument'))}
        />
      ) : (
        <div className="documentsGrid">
          {documents.map(doc => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
