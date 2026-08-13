import { useSelector, useDispatch } from 'react-redux';
import DocumentCard from '../dashboard/DocumentCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { Heart } from 'lucide-react';
import '../dashboard/DashboardPage.css';

export default function FavoritesPage() {
  const documents = useSelector(state =>
    state.documents.documents.filter(d => !d.deleted && d.favorite)
  );

  return (
    <div className="dashboardPage">
      <div className="dashboardHeader">
        <div>
          <h1 className="dashTitle">Favorites</h1>
          <p className="dashSubtitle">Starred documents for quick access</p>
        </div>
      </div>

      {documents.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No favorites yet"
          description="Click the star icon on any document card to add it to your favorites."
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
