import {
  Undo, Redo, Bold, Italic, Underline, Strikethrough, AlignLeft,
  AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Table, Image,
  Minus, Link, Highlighter
} from 'lucide-react';
import { FONT_FAMILIES, FONT_SIZES, TEXT_COLORS } from '../../utils/constants';
import * as Popover from '@radix-ui/react-popover';
import './EditorToolbar.css';

export default function EditorToolbar({ editor }) {
  if (!editor) return null;

  const addImage = () => {
    const url = prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const setLink = () => {
    const url = prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="editorToolbar">
      {/* Undo / Redo */}
      <div className="toolbarGroup">
        <button
          className="tbBtn"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <Undo size={16} />
        </button>
        <button
          className="tbBtn"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <Redo size={16} />
        </button>
      </div>

      <div className="tbDivider" />

      {/* Font Family */}
      <select
        className="tbSelect"
        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
      >
        {FONT_FAMILIES.map(font => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>

      <div className="tbDivider" />

      {/* Text Formatting */}
      <div className="toolbarGroup">
        <button
          className={`tbBtn ${editor.isActive('bold') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </button>
        <button
          className={`tbBtn ${editor.isActive('italic') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic (Ctrl+I)"
        >
          <Italic size={16} />
        </button>
        <button
          className={`tbBtn ${editor.isActive('underline') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline (Ctrl+U)"
        >
          <Underline size={16} />
        </button>
        <button
          className={`tbBtn ${editor.isActive('strike') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>
      </div>

      <div className="tbDivider" />

      {/* Text Colors */}
      <div className="toolbarGroup">
        <input
          type="color"
          className="colorPickerInput"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          title="Text Color"
        />
      </div>

      <div className="tbDivider" />

      {/* Alignments */}
      <div className="toolbarGroup">
        <button
          className={`tbBtn ${editor.isActive({ textAlign: 'left' }) ? 'active' : ''}`}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          className={`tbBtn ${editor.isActive({ textAlign: 'center' }) ? 'active' : ''}`}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          className={`tbBtn ${editor.isActive({ textAlign: 'right' }) ? 'active' : ''}`}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
        <button
          className={`tbBtn ${editor.isActive({ textAlign: 'justify' }) ? 'active' : ''}`}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          title="Justify"
        >
          <AlignJustify size={16} />
        </button>
      </div>

      <div className="tbDivider" />

      {/* Lists */}
      <div className="toolbarGroup">
        <button
          className={`tbBtn ${editor.isActive('bulletList') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          className={`tbBtn ${editor.isActive('orderedList') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
      </div>

      <div className="tbDivider" />

      {/* Insert elements */}
      <div className="toolbarGroup">
        <button className="tbBtn" onClick={addTable} title="Insert Table">
          <Table size={16} />
        </button>
        <button className="tbBtn" onClick={addImage} title="Insert Image">
          <Image size={16} />
        </button>
        <button className="tbBtn" onClick={setLink} title="Insert Link">
          <Link size={16} />
        </button>
        <button
          className="tbBtn"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Line"
        >
          <Minus size={16} />
        </button>
      </div>
    </div>
  );
}
