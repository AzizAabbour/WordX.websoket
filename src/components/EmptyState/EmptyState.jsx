import Button from '../../components/Button/Button';
import './EmptyState.css';

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="emptyState">
      {Icon && (
        <div className="emptyStateIcon">
          <Icon size={36} />
        </div>
      )}
      <h3 className="emptyStateTitle">{title}</h3>
      {description && <p className="emptyStateDesc">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
