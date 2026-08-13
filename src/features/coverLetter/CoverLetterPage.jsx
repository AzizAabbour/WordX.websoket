import { useSelector, useDispatch } from 'react-redux';
import { setPersonalInfo, setRecipient, setField } from '../../store/slices/coverLetterSlice';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { User, Building2, FileText, Download } from 'lucide-react';
import '../cv/CVBuilderPage.css';

export default function CoverLetterPage() {
  const dispatch = useDispatch();
  const letter = useSelector(state => state.coverLetter.data);

  return (
    <div className="cvBuilderPage">
      {/* Form Panel */}
      <div className="cvFormPanel">
        <div className="cvFormHeader">
          <h1>Cover Letter Builder</h1>
          <p>Create a job-winning application letter</p>
        </div>

        <section className="cvFormSection">
          <h3><User size={18} /> Your Information</h3>
          <div className="formGrid">
            <Input
              label="First Name"
              value={letter.personalInfo.firstName}
              onChange={(e) => dispatch(setPersonalInfo({ firstName: e.target.value }))}
            />
            <Input
              label="Last Name"
              value={letter.personalInfo.lastName}
              onChange={(e) => dispatch(setPersonalInfo({ lastName: e.target.value }))}
            />
            <Input
              label="Email"
              value={letter.personalInfo.email}
              onChange={(e) => dispatch(setPersonalInfo({ email: e.target.value }))}
            />
            <Input
              label="Phone"
              value={letter.personalInfo.phone}
              onChange={(e) => dispatch(setPersonalInfo({ phone: e.target.value }))}
            />
          </div>
        </section>

        <section className="cvFormSection">
          <h3><Building2 size={18} /> Recipient Information</h3>
          <div className="formGrid">
            <Input
              label="Recipient Name"
              placeholder="Hiring Manager"
              value={letter.recipient.name}
              onChange={(e) => dispatch(setRecipient({ name: e.target.value }))}
            />
            <Input
              label="Company Name"
              placeholder="Acme Corp"
              value={letter.recipient.company}
              onChange={(e) => dispatch(setRecipient({ company: e.target.value }))}
            />
          </div>
        </section>

        <section className="cvFormSection">
          <h3><FileText size={18} /> Letter Content</h3>
          <Input
            label="Position Applied For"
            placeholder="Senior Full Stack Developer"
            value={letter.position}
            onChange={(e) => dispatch(setField({ field: 'position', value: e.target.value }))}
          />
          <Input
            label="Body Paragraphs"
            type="textarea"
            placeholder="Explain why you are a great fit for this position..."
            value={letter.body}
            onChange={(e) => dispatch(setField({ field: 'body', value: e.target.value }))}
            rows={8}
          />
        </section>
      </div>

      {/* Live Preview */}
      <div className="cvPreviewPanel">
        <div className="cvPaperPreview">
          <div style={{ lineHeight: '1.6', fontSize: '13px' }}>
            <p><strong>{letter.personalInfo.firstName || 'Your'} {letter.personalInfo.lastName || 'Name'}</strong></p>
            <p>{letter.personalInfo.email}</p>
            <p>{letter.personalInfo.phone}</p>
            <hr style={{ margin: '16px 0', borderColor: '#e5e7eb' }} />
            <p>{letter.date}</p>
            <br />
            <p><strong>{letter.recipient.name || 'Hiring Manager'}</strong></p>
            <p>{letter.recipient.company}</p>
            <br />
            <p><strong>Subject: Application for {letter.position || '[Position]'}</strong></p>
            <br />
            <p>{letter.salutation}</p>
            <br />
            <p>{letter.body || 'I am writing to express my strong interest in the open position...'}</p>
            <br />
            <p>{letter.signOff}</p>
            <br />
            <p><strong>{letter.personalInfo.firstName} {letter.personalInfo.lastName}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
