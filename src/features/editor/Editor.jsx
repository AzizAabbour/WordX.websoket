import { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Link } from '@tiptap/extension-link';

import { useDispatch, useSelector } from 'react-redux';
import { setEditorInstance, setContent, setSaveStatus } from '../../store/slices/editorSlice';
import EditorToolbar from './EditorToolbar';
import EditorTopBar from './EditorTopBar';
import './Editor.css';

export default function Editor({ initialContent }) {
  const dispatch = useDispatch();
  const { zoom, pageSize, orientation, margins } = useSelector(state => state.editor);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      TextStyle,
      Color,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ inline: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start typing your document...' }),
    ],
    content: initialContent || `<h1>Untitled Document</h1><p>Start editing your document here...</p>`,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      dispatch(setContent(json));
      dispatch(setSaveStatus('unsaved'));
    },
  });

  useEffect(() => {
    if (editor) {
      dispatch(setEditorInstance(editor));
    }
  }, [editor, dispatch]);

  if (!editor) return null;

  return (
    <div className="editorWrapper">
      <EditorTopBar editor={editor} />
      <EditorToolbar editor={editor} />
      
      <div className="editorWorkspace">
        <div 
          className={`editorPageContainer ${pageSize} ${orientation}`}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
          }}
        >
          <div 
            className="editorPage"
            style={{
              paddingTop: `${margins.top}mm`,
              paddingRight: `${margins.right}mm`,
              paddingBottom: `${margins.bottom}mm`,
              paddingLeft: `${margins.left}mm`,
            }}
          >
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}
