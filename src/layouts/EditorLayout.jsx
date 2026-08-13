import { Outlet } from 'react-router-dom';
import TopBar from '../features/dashboard/TopBar';
import './EditorLayout.css';

export default function EditorLayout() {
  return (
    <div className="editorLayout">
      <main className="editorMain">
        <Outlet />
      </main>
    </div>
  );
}
