import { createSlice } from '@reduxjs/toolkit';

const createEmptyCV = () => ({
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    website: '',
    linkedin: '',
    photo: null,
  },
  profile: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  interests: [],
  references: [],
  sectionOrder: [
    'profile',
    'experience',
    'education',
    'skills',
    'languages',
    'certifications',
    'projects',
    'interests',
    'references',
  ],
  template: 'modern',
  colorScheme: {
    primary: '#2563eb',
    secondary: '#1e40af',
    text: '#1f2937',
    background: '#ffffff',
    accent: '#3b82f6',
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    fontSize: 10,
  },
  spacing: 'normal',
});

const initialState = {
  data: createEmptyCV(),
  activeSectionId: null,
  previewMode: false,
};

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    setCVData(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
    setPersonalInfo(state, action) {
      state.data.personalInfo = { ...state.data.personalInfo, ...action.payload };
    },
    setProfile(state, action) {
      state.data.profile = action.payload;
    },
    addExperience(state) {
      state.data.experience.push({
        id: 'exp_' + Date.now(),
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      });
    },
    updateExperience(state, action) {
      const idx = state.data.experience.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) state.data.experience[idx] = { ...state.data.experience[idx], ...action.payload };
    },
    removeExperience(state, action) {
      state.data.experience = state.data.experience.filter(e => e.id !== action.payload);
    },
    addEducation(state) {
      state.data.education.push({
        id: 'edu_' + Date.now(),
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    },
    updateEducation(state, action) {
      const idx = state.data.education.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) state.data.education[idx] = { ...state.data.education[idx], ...action.payload };
    },
    removeEducation(state, action) {
      state.data.education = state.data.education.filter(e => e.id !== action.payload);
    },
    setSkills(state, action) {
      state.data.skills = action.payload;
    },
    addSkill(state, action) {
      state.data.skills.push(action.payload);
    },
    removeSkill(state, action) {
      state.data.skills = state.data.skills.filter((_, i) => i !== action.payload);
    },
    setLanguages(state, action) {
      state.data.languages = action.payload;
    },
    addLanguage(state) {
      state.data.languages.push({ name: '', level: 'Intermediate' });
    },
    updateLanguage(state, action) {
      const { index, ...rest } = action.payload;
      state.data.languages[index] = { ...state.data.languages[index], ...rest };
    },
    removeLanguage(state, action) {
      state.data.languages = state.data.languages.filter((_, i) => i !== action.payload);
    },
    addCertification(state) {
      state.data.certifications.push({
        id: 'cert_' + Date.now(),
        name: '',
        issuer: '',
        date: '',
      });
    },
    updateCertification(state, action) {
      const idx = state.data.certifications.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) state.data.certifications[idx] = { ...state.data.certifications[idx], ...action.payload };
    },
    removeCertification(state, action) {
      state.data.certifications = state.data.certifications.filter(c => c.id !== action.payload);
    },
    addProject(state) {
      state.data.projects.push({
        id: 'proj_' + Date.now(),
        name: '',
        description: '',
        url: '',
      });
    },
    updateProject(state, action) {
      const idx = state.data.projects.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) state.data.projects[idx] = { ...state.data.projects[idx], ...action.payload };
    },
    removeProject(state, action) {
      state.data.projects = state.data.projects.filter(p => p.id !== action.payload);
    },
    setTemplate(state, action) {
      state.data.template = action.payload;
    },
    setColorScheme(state, action) {
      state.data.colorScheme = { ...state.data.colorScheme, ...action.payload };
    },
    setTypography(state, action) {
      state.data.typography = { ...state.data.typography, ...action.payload };
    },
    setSectionOrder(state, action) {
      state.data.sectionOrder = action.payload;
    },
    setActiveSectionId(state, action) {
      state.activeSectionId = action.payload;
    },
    resetCV(state) {
      state.data = createEmptyCV();
    },
    loadCV(state, action) {
      state.data = action.payload;
    },
  },
});

export const {
  setCVData, setPersonalInfo, setProfile,
  addExperience, updateExperience, removeExperience,
  addEducation, updateEducation, removeEducation,
  setSkills, addSkill, removeSkill,
  setLanguages, addLanguage, updateLanguage, removeLanguage,
  addCertification, updateCertification, removeCertification,
  addProject, updateProject, removeProject,
  setTemplate, setColorScheme, setTypography,
  setSectionOrder, setActiveSectionId,
  resetCV, loadCV,
} = cvSlice.actions;

export default cvSlice.reducer;
