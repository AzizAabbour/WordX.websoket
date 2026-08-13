import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  documentId: null,
  title: 'Untitled Document',
  documentType: 'document',
  content: null, // TipTap JSON content
  zoom: 100,
  pageSize: 'a4',
  orientation: 'portrait',
  margins: { top: 25.4, right: 25.4, bottom: 25.4, left: 25.4 }, // mm
  saveStatus: 'saved', // 'saved' | 'saving' | 'unsaved' | 'error'
  lastSavedAt: null,
  editorInstance: null,
  showRuler: true,
  showPageBreaks: true,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    openDocument(state, action) {
      const { id, title, type, content } = action.payload;
      state.documentId = id;
      state.title = title || 'Untitled Document';
      state.documentType = type || 'document';
      state.content = content || null;
      state.saveStatus = 'saved';
      state.lastSavedAt = new Date().toISOString();
    },
    closeDocument(state) {
      state.documentId = null;
      state.title = 'Untitled Document';
      state.documentType = 'document';
      state.content = null;
      state.saveStatus = 'saved';
      state.editorInstance = null;
    },
    setTitle(state, action) {
      state.title = action.payload;
      state.saveStatus = 'unsaved';
    },
    setContent(state, action) {
      state.content = action.payload;
      state.saveStatus = 'unsaved';
    },
    setZoom(state, action) {
      state.zoom = Math.max(25, Math.min(300, action.payload));
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setOrientation(state, action) {
      state.orientation = action.payload;
    },
    setMargins(state, action) {
      state.margins = { ...state.margins, ...action.payload };
    },
    setSaveStatus(state, action) {
      state.saveStatus = action.payload;
      if (action.payload === 'saved') {
        state.lastSavedAt = new Date().toISOString();
      }
    },
    setEditorInstance(state, action) {
      state.editorInstance = action.payload;
    },
    toggleRuler(state) {
      state.showRuler = !state.showRuler;
    },
  },
});

export const {
  openDocument,
  closeDocument,
  setTitle,
  setContent,
  setZoom,
  setPageSize,
  setOrientation,
  setMargins,
  setSaveStatus,
  setEditorInstance,
  toggleRuler,
} = editorSlice.actions;

export default editorSlice.reducer;
