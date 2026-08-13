import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSaveStatus } from '../store/slices/editorSlice';
import { updateDocument } from '../store/slices/documentsSlice';

export function useAutoSave(content, delay = 1500) {
  const dispatch = useDispatch();
  const { documentId, title, documentType, saveStatus } = useSelector(state => state.editor);
  const timerRef = useRef(null);
  const contentRef = useRef(content);

  contentRef.current = content;

  const save = useCallback(() => {
    if (!documentId) return;

    dispatch(setSaveStatus('saving'));

    // Simulate network delay
    setTimeout(() => {
      dispatch(updateDocument({
        id: documentId,
        title,
        type: documentType,
        content: contentRef.current,
        updatedAt: new Date().toISOString(),
      }));
      dispatch(setSaveStatus('saved'));
    }, 400);
  }, [documentId, title, documentType, dispatch]);

  useEffect(() => {
    if (saveStatus !== 'unsaved') return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(save, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [saveStatus, save, delay]);

  return { save, saveStatus };
}
