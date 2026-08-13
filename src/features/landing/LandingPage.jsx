import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { FileText, Sparkles, Check, ArrowRight, Shield, Zap, Layers } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landingPage">
      {/* Navbar */}
      <nav className="landingNav">
        <div className="landingBrand">
          <div className="landingLogo"><FileText size={22} /></div>
          <span>WordX</span>
        </div>

        <div className="landingNavLinks">
          <a href="#features">Features</a>
          <a href="#templates">Templates</a>
          <a href="#pricing">Pricing</a>
        </div>

        <div className="landingNavActions">
          <Button variant="ghost" onClick={() => navigate('/login')}>Log In</Button>
          <Button variant="primary" onClick={() => navigate('/signup')}>Get Started Free</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="landingHero">
        <div className="heroBadge">
          <Sparkles size={14} /> Next-Gen SaaS Document Editor
        </div>
        <h1 className="heroTitle">Create Professional Documents in Minutes</h1>
        <p className="heroSubtitle">
          Build ATS-friendly CVs, cover letters, reports, and business letters directly in your browser with real-time editing and pixel-perfect export.
        </p>
        <div className="heroActions">
          <Button variant="primary" size="xl" iconRight={ArrowRight} onClick={() => navigate('/signup')}>
            Start Creating Free
          </Button>
          <Button variant="secondary" size="xl" onClick={() => navigate('/login')}>
            View Live Demo
          </Button>
        </div>

        {/* Editor Mockup */}
        <div className="heroMockup">
          <div className="mockupTopBar">
            <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
            <span className="mockupTitle">WordX Editor — Annual Report 2026.docx</span>
          </div>
          <div className="mockupContent">
            <div className="mockupToolbar" />
            <div className="mockupPage">
              <h2>Executive Summary</h2>
              <p>WordX is a modern document editor combining real-time formatting with professional design system templates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="landingFeatures">
        <div className="sectionHeaderCenter">
          <h2>Everything You Need for Document Creation</h2>
          <p>Designed for professionals, job seekers, and business teams.</p>
        </div>
        <div className="featuresGrid">
          <div className="featureCard">
            <Zap size={28} className="fIcon" />
            <h3>Real-Time Preview</h3>
            <p>Every keystroke, formatting tweak, and margin adjustment renders live on your document A4 canvas.</p>
          </div>
          <div className="featureCard">
            <Layers size={28} className="fIcon" />
            <h3>Curated Templates</h3>
            <p>Select from CV, cover letter, invoice, and business report templates built by expert designers.</p>
          </div>
          <div className="featureCard">
            <Shield size={28} className="fIcon" />
            <h3>Instant Export</h3>
            <p>Download clean, editable Word documents (.docx) or print-ready vector PDF files with one click.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landingFooter">
        <div className="landingBrand">
          <div className="landingLogo"><FileText size={18} /></div>
          <span>WordX</span>
        </div>
        <p>© 2026 WordX SaaS Platform. Built for professional performance.</p>
      </footer>
    </div>
  );
}
