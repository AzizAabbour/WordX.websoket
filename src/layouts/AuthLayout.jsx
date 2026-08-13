import { Outlet } from 'react-router-dom';
import { FileText } from 'lucide-react';
import './AuthLayout.css';

export default function AuthLayout() {
  return (
    <div className="authLayout">
      <div className="authLeft">
        <div className="authBrand">
          <div className="authLogo">
            <FileText size={28} />
          </div>
          <span className="authBrandName">WordX</span>
        </div>
        <div className="authFormArea">
          <Outlet />
        </div>
        <p className="authFooter">© 2026 WordX. All rights reserved.</p>
      </div>
      <div className="authRight">
        <div className="authRightContent">
          <h2 className="authRightTitle">Create Professional Documents in Minutes</h2>
          <p className="authRightDesc">
            Build stunning CVs, cover letters, reports, and professional documents with our powerful real-time editor.
          </p>
          <div className="authRightFeatures">
            <div className="authFeature">
              <span className="authFeatureDot" />
              Real-time editing with live preview
            </div>
            <div className="authFeature">
              <span className="authFeatureDot" />
              Professional templates for every need
            </div>
            <div className="authFeature">
              <span className="authFeatureDot" />
              Export to PDF and Word formats
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
