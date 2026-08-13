import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import documentsReducer from './slices/documentsSlice';
import editorReducer from './slices/editorSlice';
import uiReducer from './slices/uiSlice';
import cvReducer from './slices/cvSlice';
import coverLetterReducer from './slices/coverLetterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    documents: documentsReducer,
    editor: editorReducer,
    ui: uiReducer,
    cv: cvReducer,
    coverLetter: coverLetterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['editor/setEditorInstance'],
        ignoredPaths: ['editor.editorInstance'],
      },
    }),
});
