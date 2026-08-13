import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEMPLATES } from '../../utils/constants';
import Button from '../../components/Button/Button';
import { Sparkles, Eye, Check } from 'lucide-react';
import '../dashboard/DashboardPage.css';
import './TemplatesPage.css';

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('cv');

  const templatesList = TEMPLATES[activeCategory] || [];

  return (
    <div className="dashboardPage">
      <div className="dashboardHeader">
        <div>
          <h1 className="dashTitle">Template Library</h1>
          <p className="dashSubtitle">Choose a professionally crafted template to jumpstart your document</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="templateCategories">
        {['cv', 'coverLetter'].map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'primary' : 'secondary'}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'cv' ? 'CV & Resumes' : 'Cover Letters'}
          </Button>
        ))}
      </div>

      <div className="templatesGrid">
        {templatesList.map(tpl => (
          <div key={tpl.id} className="templateCard">
            <div className="templateBadge">
              {tpl.premium ? <span className="premiumBadge">PRO</span> : <span className="freeBadge">FREE</span>}
            </div>
            <div className="templatePreviewPlaceholder">
              <Sparkles size={36} className="tplIcon" />
            </div>
            <div className="templateInfo">
              <h3>{tpl.name}</h3>
              <p>{tpl.description}</p>
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => {
                  if (activeCategory === 'cv') navigate(`/cv-builder/new?template=${tpl.id}`);
                  else navigate(`/cover-letter/new?template=${tpl.id}`);
                }}
              >
                Use Template
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
