export const DOCUMENT_TYPES = {
  document: { label: 'Document', icon: 'FileText', color: '#3b82f6' },
  cv: { label: 'CV / Resume', icon: 'User', color: '#8b5cf6' },
  coverLetter: { label: 'Cover Letter', icon: 'Mail', color: '#10b981' },
  motivationLetter: { label: 'Motivation Letter', icon: 'Heart', color: '#f43f5e' },
  report: { label: 'Report', icon: 'BarChart3', color: '#f59e0b' },
  invoice: { label: 'Invoice', icon: 'Receipt', color: '#06b6d4' },
  businessLetter: { label: 'Business Letter', icon: 'Building2', color: '#6366f1' },
  contract: { label: 'Contract', icon: 'FileSignature', color: '#84cc16' },
  blank: { label: 'Blank Document', icon: 'File', color: '#6b7280' },
};

export const FONT_FAMILIES = [
  'Inter',
  'Arial',
  'Times New Roman',
  'Georgia',
  'Helvetica',
  'Verdana',
  'Trebuchet MS',
  'Courier New',
  'Palatino',
  'Garamond',
  'Cambria',
  'Calibri',
];

export const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 36, 42, 48, 56, 64, 72];

export const LINE_SPACINGS = [
  { label: 'Single', value: 1 },
  { label: '1.15', value: 1.15 },
  { label: '1.5', value: 1.5 },
  { label: 'Double', value: 2 },
  { label: '2.5', value: 2.5 },
  { label: '3.0', value: 3 },
];

export const TEXT_COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
  '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
  '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd',
  '#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0',
  '#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79',
];

export const HIGHLIGHT_COLORS = [
  '#ffffff', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24',
  '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399',
  '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa',
  '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa',
  '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6',
  '#fee2e2', '#fecaca', '#fca5a5', '#f87171',
];

export const TEMPLATES = {
  cv: [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary design', premium: false },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant layout', premium: false },
    { id: 'corporate', name: 'Corporate', description: 'Traditional professional style', premium: false },
    { id: 'creative', name: 'Creative', description: 'Bold and artistic design', premium: true },
    { id: 'executive', name: 'Executive', description: 'Senior leadership style', premium: true },
    { id: 'ats', name: 'ATS-Friendly', description: 'Optimized for applicant tracking systems', premium: false },
  ],
  coverLetter: [
    { id: 'professional', name: 'Professional', description: 'Classic business format', premium: false },
    { id: 'modern', name: 'Modern', description: 'Contemporary clean style', premium: false },
    { id: 'creative', name: 'Creative', description: 'Stand-out design', premium: true },
  ],
};

export const KEYBOARD_SHORTCUTS = {
  save: { key: 's', ctrl: true, label: 'Save' },
  undo: { key: 'z', ctrl: true, label: 'Undo' },
  redo: { key: 'y', ctrl: true, label: 'Redo' },
  bold: { key: 'b', ctrl: true, label: 'Bold' },
  italic: { key: 'i', ctrl: true, label: 'Italic' },
  underline: { key: 'u', ctrl: true, label: 'Underline' },
  print: { key: 'p', ctrl: true, label: 'Print' },
};
