import { useSelector, useDispatch } from 'react-redux';
import {
  setPersonalInfo, setProfile, addExperience, updateExperience, removeExperience,
  addEducation, updateEducation, removeEducation, addSkill, removeSkill,
  setTemplate, setColorScheme
} from '../../store/slices/cvSlice';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, Sparkles } from 'lucide-react';
import './CVBuilderPage.css';

export default function CVBuilderPage() {
  const dispatch = useDispatch();
  const cv = useSelector(state => state.cv.data);

  return (
    <div className="cvBuilderPage">
      {/* Form Panel Left */}
      <div className="cvFormPanel">
        <div className="cvFormHeader">
          <h1>CV Builder</h1>
          <p>Build your professional resume step-by-step</p>
        </div>

        {/* Template & Color Selector */}
        <section className="cvFormSection">
          <h3><Sparkles size={18} /> Template & Design</h3>
          <div className="templateOptions">
            {['modern', 'minimal', 'corporate'].map(t => (
              <button
                key={t}
                className={`templateBtn ${cv.template === t ? 'active' : ''}`}
                onClick={() => dispatch(setTemplate(t))}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        {/* Personal Info */}
        <section className="cvFormSection">
          <h3><User size={18} /> Personal Information</h3>
          <div className="formGrid">
            <Input
              label="First Name"
              value={cv.personalInfo.firstName}
              onChange={(e) => dispatch(setPersonalInfo({ firstName: e.target.value }))}
            />
            <Input
              label="Last Name"
              value={cv.personalInfo.lastName}
              onChange={(e) => dispatch(setPersonalInfo({ lastName: e.target.value }))}
            />
            <Input
              label="Email"
              type="email"
              value={cv.personalInfo.email}
              onChange={(e) => dispatch(setPersonalInfo({ email: e.target.value }))}
            />
            <Input
              label="Phone"
              value={cv.personalInfo.phone}
              onChange={(e) => dispatch(setPersonalInfo({ phone: e.target.value }))}
            />
          </div>
        </section>

        {/* Profile */}
        <section className="cvFormSection">
          <h3>Professional Summary</h3>
          <Input
            type="textarea"
            placeholder="Brief summary of your background and career goals..."
            value={cv.profile}
            onChange={(e) => dispatch(setProfile(e.target.value))}
          />
        </section>

        {/* Experience */}
        <section className="cvFormSection">
          <div className="sectionTitleRow">
            <h3><Briefcase size={18} /> Experience</h3>
            <Button size="sm" variant="secondary" icon={Plus} onClick={() => dispatch(addExperience())}>
              Add
            </Button>
          </div>
          {cv.experience.map(exp => (
            <div key={exp.id} className="cvCardItem">
              <Input
                label="Job Title"
                value={exp.title}
                onChange={(e) => dispatch(updateExperience({ id: exp.id, title: e.target.value }))}
              />
              <Input
                label="Company"
                value={exp.company}
                onChange={(e) => dispatch(updateExperience({ id: exp.id, company: e.target.value }))}
              />
              <button
                className="removeCardBtn"
                onClick={() => dispatch(removeExperience(exp.id))}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="cvFormSection">
          <div className="sectionTitleRow">
            <h3><GraduationCap size={18} /> Education</h3>
            <Button size="sm" variant="secondary" icon={Plus} onClick={() => dispatch(addEducation())}>
              Add
            </Button>
          </div>
          {cv.education.map(edu => (
            <div key={edu.id} className="cvCardItem">
              <Input
                label="Degree / Certificate"
                value={edu.degree}
                onChange={(e) => dispatch(updateEducation({ id: edu.id, degree: e.target.value }))}
              />
              <Input
                label="Institution"
                value={edu.institution}
                onChange={(e) => dispatch(updateEducation({ id: edu.id, institution: e.target.value }))}
              />
              <button
                className="removeCardBtn"
                onClick={() => dispatch(removeEducation(edu.id))}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </section>
      </div>

      {/* Live Preview Panel Right */}
      <div className="cvPreviewPanel">
        <div className="cvPaperPreview">
          <div className={`cvDocTemplate ${cv.template}`}>
            <header className="cvHeader">
              <h1>{cv.personalInfo.firstName || 'Your'} {cv.personalInfo.lastName || 'Name'}</h1>
              <div className="cvContactInfo">
                {cv.personalInfo.email && <span>{cv.personalInfo.email}</span>}
                {cv.personalInfo.phone && <span>{cv.personalInfo.phone}</span>}
              </div>
            </header>

            {cv.profile && (
              <section className="cvSec">
                <h2>Profile</h2>
                <p>{cv.profile}</p>
              </section>
            )}

            {cv.experience.length > 0 && (
              <section className="cvSec">
                <h2>Experience</h2>
                {cv.experience.map(exp => (
                  <div key={exp.id} className="cvItem">
                    <strong>{exp.title}</strong> — {exp.company}
                  </div>
                ))}
              </section>
            )}

            {cv.education.length > 0 && (
              <section className="cvSec">
                <h2>Education</h2>
                {cv.education.map(edu => (
                  <div key={edu.id} className="cvItem">
                    <strong>{edu.degree}</strong> — {edu.institution}
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
