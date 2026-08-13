import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './AuthForm.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="authFormContainer">
      {!submitted ? (
        <>
          <div className="authFormHeader">
            <h1 className="authTitle">Reset password</h1>
            <p className="authSubtitle">Enter your email and we'll send you a link to reset your password.</p>
          </div>

          <form onSubmit={handleSubmit} className="authForm">
            <Input
              label="Email address"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
            />

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              Send Reset Link
            </Button>
          </form>
        </>
      ) : (
        <div className="authSuccessMessage">
          <CheckCircle size={48} className="successIcon" />
          <h2 className="authTitle">Check your email</h2>
          <p className="authSubtitle">
            We sent a password reset link to <strong>{email}</strong>
          </p>
        </div>
      )}

      <div className="authFormFooter">
        <Link to="/login" className="backToLogin">
          <ArrowLeft size={16} /> Back to Sign in
        </Link>
      </div>
    </div>
  );
}
