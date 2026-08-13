import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openDocument } from '../../store/slices/editorSlice';
import Editor from './Editor';
import { useAutoSave } from '../../hooks/useAutoSave';

export default function EditorPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const document = useSelector(state =>
    state.documents.documents.find(d => d.id === id)
  );

  const content = useSelector(state => state.editor.content);
  useAutoSave(content);

  useEffect(() => {
    if (id && document) {
      dispatch(openDocument({
        id: document.id,
        title: document.title,
        type: document.type,
        content: document.content,
      }));
    } else if (id && !document) {
      // Create new doc if accessed directly
      const newDoc = {
        id,
        title: 'New Document',
        type: 'document',
        content: null,
      };
      dispatch(openDocument(newDoc));
    }
  }, [id, document, dispatch]);

  return <Editor initialContent={document?.content} />;
}
