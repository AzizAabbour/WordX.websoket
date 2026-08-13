import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import './AuthForm.css';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@wordx.app');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      login(email, password);
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="authFormContainer">
      <div className="authFormHeader">
        <h1 className="authTitle">Welcome back</h1>
        <p className="authSubtitle">Sign in to continue to WordX</p>
      </div>

      {error && <div className="authErrorAlert">{error}</div>}

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

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
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

        <div className="authFormMeta">
          <label className="rememberMe">
            <input type="checkbox" defaultChecked />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="forgotLink">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} iconRight={ArrowRight}>
          Sign In
        </Button>
      </form>

      <div className="authFormFooter">
        Don't have an account? <Link to="/signup">Sign up for free</Link>
      </div>
    </div>
  );
}
