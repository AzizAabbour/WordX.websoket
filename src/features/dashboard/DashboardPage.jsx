import { useSelector, useDispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../store/slices/uiSlice';
import { useAuth } from '../../hooks/useAuth';
import DocumentCard from './DocumentCard';
import CreateDocumentModal from './CreateDocumentModal';
import EmptyState from '../../components/EmptyState/EmptyState';
import { Plus, User, Mail, Sparkles, FileText, ArrowRight } from 'lucide-react';
import Button from '../../components/Button/Button';
import './DashboardPage.css';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const documents = useSelector(state => state.documents.documents.filter(d => !d.deleted));

  const recentDocs = documents.slice(0, 8);

  return (
    <div className="dashboardPage">
      <div className="dashboardHeader">
        <div>
          <h1 className="dashTitle">Welcome back, {user?.firstName || 'User'}</h1>
          <p className="dashSubtitle">Create and manage your professional documents</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          icon={Plus}
          onClick={() => dispatch(openModal('createDocument'))}
        >
          New Document
        </Button>
      </div>

      {/* Quick Start Action Cards */}
      <div className="quickActionsGrid">
        <div className="actionCard" onClick={() => dispatch(openModal('createDocument'))}>
          <div className="actionIcon docIcon"><FileText size={24} /></div>
          <div className="actionContent">
            <h3>Blank Document</h3>
            <p>Start from scratch with a clean page</p>
          </div>
        </div>

        <div className="actionCard" onClick={() => navigate('/cv-builder/new')}>
          <div className="actionIcon cvIcon"><User size={24} /></div>
          <div className="actionContent">
            <h3>Create CV</h3>
            <p>Build an ATS-friendly resume</p>
          </div>
        </div>

        <div className="actionCard" onClick={() => navigate('/cover-letter/new')}>
          <div className="actionIcon letterIcon"><Mail size={24} /></div>
          <div className="actionContent">
            <h3>Cover Letter</h3>
            <p>Write a tailored job application letter</p>
          </div>
        </div>

        <div className="actionCard" onClick={() => navigate('/templates')}>
          <div className="actionIcon templateIcon"><Sparkles size={24} /></div>
          <div className="actionContent">
            <h3>Templates</h3>
            <p>Browse pre-designed formats</p>
          </div>
        </div>
      </div>

      {/* Recent Documents Section */}
      <div className="recentSection">
        <div className="sectionHeader">
          <h2>Recent Documents</h2>
          {recentDocs.length > 0 && (
            <Button variant="ghost" size="sm" iconRight={ArrowRight} onClick={() => navigate('/documents')}>
              View All
            </Button>
          )}
        </div>

        {recentDocs.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No documents yet"
            description="Create your first professional document, CV, or cover letter to get started."
            actionLabel="Create Document"
            onAction={() => dispatch(openModal('createDocument'))}
          />
        ) : (
          <div className="documentsGrid">
            {recentDocs.map(doc => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}
      </div>

      <CreateDocumentModal />
    </div>
  );
}
