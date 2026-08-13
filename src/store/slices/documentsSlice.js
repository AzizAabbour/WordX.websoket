import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'wordx_documents';

const loadDocuments = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveDocuments = (documents) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
};

const initialState = {
  documents: loadDocuments(),
  searchQuery: '',
  searchFilters: { type: 'all', sort: 'updated' },
  loading: false,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument(state, action) {
      state.documents.unshift(action.payload);
      saveDocuments(state.documents);
    },
    updateDocument(state, action) {
      const idx = state.documents.findIndex(d => d.id === action.payload.id);
      if (idx !== -1) {
        state.documents[idx] = { ...state.documents[idx], ...action.payload, updatedAt: new Date().toISOString() };
        saveDocuments(state.documents);
      }
    },
    deleteDocument(state, action) {
      const idx = state.documents.findIndex(d => d.id === action.payload);
      if (idx !== -1) {
        state.documents[idx].deleted = true;
        state.documents[idx].deletedAt = new Date().toISOString();
        saveDocuments(state.documents);
      }
    },
    restoreDocument(state, action) {
      const idx = state.documents.findIndex(d => d.id === action.payload);
      if (idx !== -1) {
        state.documents[idx].deleted = false;
        state.documents[idx].deletedAt = null;
        saveDocuments(state.documents);
      }
    },
    permanentlyDeleteDocument(state, action) {
      state.documents = state.documents.filter(d => d.id !== action.payload);
      saveDocuments(state.documents);
    },
    duplicateDocument(state, action) {
      const original = state.documents.find(d => d.id === action.payload);
      if (original) {
        const copy = {
          ...JSON.parse(JSON.stringify(original)),
          id: 'doc_' + Date.now(),
          title: `${original.title} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deleted: false,
          favorite: false,
        };
        state.documents.unshift(copy);
        saveDocuments(state.documents);
      }
    },
    renameDocument(state, action) {
      const idx = state.documents.findIndex(d => d.id === action.payload.id);
      if (idx !== -1) {
        state.documents[idx].title = action.payload.title;
        state.documents[idx].updatedAt = new Date().toISOString();
        saveDocuments(state.documents);
      }
    },
    toggleFavorite(state, action) {
      const idx = state.documents.findIndex(d => d.id === action.payload);
      if (idx !== -1) {
        state.documents[idx].favorite = !state.documents[idx].favorite;
        saveDocuments(state.documents);
      }
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSearchFilters(state, action) {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    emptyTrash(state) {
      state.documents = state.documents.filter(d => !d.deleted);
      saveDocuments(state.documents);
    },
  },
});

export const {
  addDocument,
  updateDocument,
  deleteDocument,
  restoreDocument,
  permanentlyDeleteDocument,
  duplicateDocument,
  renameDocument,
  toggleFavorite,
  setSearchQuery,
  setSearchFilters,
  emptyTrash,
} = documentsSlice.actions;

export default documentsSlice.reducer;
