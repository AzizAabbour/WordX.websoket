import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
    recipient: {
      name: '',
      title: '',
      company: '',
      address: '',
    },
    position: '',
    date: new Date().toISOString().split('T')[0],
    subject: '',
    salutation: 'Dear Hiring Manager,',
    opening: '',
    body: '',
    closing: '',
    signOff: 'Sincerely,',
  },
  template: 'professional',
};

const coverLetterSlice = createSlice({
  name: 'coverLetter',
  initialState,
  reducers: {
    setCoverLetterData(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
    setPersonalInfo(state, action) {
      state.data.personalInfo = { ...state.data.personalInfo, ...action.payload };
    },
    setRecipient(state, action) {
      state.data.recipient = { ...state.data.recipient, ...action.payload };
    },
    setField(state, action) {
      const { field, value } = action.payload;
      state.data[field] = value;
    },
    setTemplate(state, action) {
      state.template = action.payload;
    },
    resetCoverLetter(state) {
      Object.assign(state, initialState);
    },
    loadCoverLetter(state, action) {
      state.data = action.payload.data || action.payload;
      state.template = action.payload.template || 'professional';
    },
  },
});

export const {
  setCoverLetterData,
  setPersonalInfo,
  setRecipient,
  setField,
  setTemplate,
  resetCoverLetter,
  loadCoverLetter,
} = coverLetterSlice.actions;

export default coverLetterSlice.reducer;
