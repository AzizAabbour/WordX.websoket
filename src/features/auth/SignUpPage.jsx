import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import './AuthForm.css';

export default function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      signup({ firstName, lastName, email });
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="authFormContainer">
      <div className="authFormHeader">
        <h1 className="authTitle">Create account</h1>
        <p className="authSubtitle">Start creating professional documents today</p>
      </div>

      {error && <div className="authErrorAlert">{error}</div>}

      <form onSubmit={handleSubmit} className="authForm">
        <div className="formRow">
          <Input
            label="First name"
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            icon={User}
            required
          />
          <Input
            label="Last name"
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <Input
          label="Email address"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          required
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
          rightElement={
            <button
              type="button"
              className="passwordToggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          required
        />

        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} iconRight={ArrowRight}>
          Create Account
        </Button>
      </form>

      <div className="authFormFooter">
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
}
