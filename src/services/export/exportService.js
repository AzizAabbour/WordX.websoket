import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export async function exportToPDF(editor, title = 'Document') {
  const element = document.querySelector('.editorPage');
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${title.replace(/\s+/g, '_')}.pdf`);
  } catch (err) {
    console.error('PDF Export failed:', err);
    alert('Failed to generate PDF export.');
  }
}

export async function exportToDocx(editor, title = 'Document') {
  if (!editor) return;

  const htmlText = editor.getText();
  const paragraphs = htmlText.split('\n\n').map(p => 
    new Paragraph({
      children: [new TextRun(p)],
    })
  );

  const doc = new Document({
    sections: [{
      children: paragraphs.length > 0 ? paragraphs : [new Paragraph({ children: [new TextRun(htmlText)] })],
    }],
  });

  try {
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${title.replace(/\s+/g, '_')}.docx`);
  } catch (err) {
    console.error('DOCX Export failed:', err);
    alert('Failed to generate Word document export.');
  }
}
