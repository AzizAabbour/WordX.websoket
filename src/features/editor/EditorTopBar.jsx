import { useSelector, useDispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTitle } from '../../store/slices/editorSlice';
import { ArrowLeft, CheckCircle2, RefreshCw, AlertCircle, Download, Share2, Printer, ZoomIn, ZoomOut } from 'lucide-react';
import { setZoom } from '../../store/slices/editorSlice';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { exportToPDF, exportToDocx } from '../../services/export/exportService';
import Button from '../../components/Button/Button';
import './EditorTopBar.css';

export default function EditorTopBar({ editor }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, saveStatus, zoom } = useSelector(state => state.editor);

  const handleTitleChange = (e) => {
    dispatch(setTitle(e.target.value));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="editorHeader">
      <div className="editorHeaderLeft">
        <button className="backBtn" onClick={() => navigate('/dashboard')} title="Back to dashboard">
          <ArrowLeft size={18} />
        </button>
        <input
          type="text"
          className="documentTitleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled Document"
        />

        <div className="saveStatusIndicator">
          {saveStatus === 'saving' && (
            <span className="statusSaving"><RefreshCw size={14} className="spin" /> Saving...</span>
          )}
          {saveStatus === 'saved' && (
            <span className="statusSaved"><CheckCircle2 size={14} /> Saved</span>
          )}
          {saveStatus === 'unsaved' && (
            <span className="statusUnsaved"><AlertCircle size={14} /> Unsaved</span>
          )}
        </div>
      </div>

      <div className="editorHeaderRight">
        {/* Zoom Controls */}
        <div className="zoomControls">
          <button onClick={() => dispatch(setZoom(zoom - 10))} title="Zoom Out"><ZoomOut size={16} /></button>
          <span className="zoomLabel">{zoom}%</span>
          <button onClick={() => dispatch(setZoom(zoom + 10))} title="Zoom In"><ZoomIn size={16} /></button>
        </div>

        <button className="topBarBtn" onClick={handlePrint} title="Print Document">
          <Printer size={18} />
        </button>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="primary" size="sm" icon={Download}>
              Export
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdownMenuContent">
              <DropdownMenu.Item className="dropdownMenuItem" onClick={() => exportToPDF(editor, title)}>
                PDF Document (.pdf)
              </DropdownMenu.Item>
              <DropdownMenu.Item className="dropdownMenuItem" onClick={() => exportToDocx(editor, title)}>
                Word Document (.docx)
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
