import { useState }          from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth }           from '../hooks/useAuth';
import { authApi }           from '../api/authApi';
import toast                 from 'react-hot-toast';

const LoginPage = () => {
  const [form,       setForm]       = useState({ email: '', password: '' });
  const [loading,    setLoading]    = useState(false);
  const [showPass,   setShowPass]   = useState(false);
  const [errors,     setErrors]     = useState({});       // ← field errors
  const [globalError, setGlobalError] = useState('');     // ← general error

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error on typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
    if (globalError) setGlobalError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim())
      newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Enter a valid email address';
    if (!form.password)
      newErrors.password = 'Password is required';
    else if (form.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');

    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await authApi.login(form);
      login(data);
      toast.success(`Welcome back, ${data.fullName}!`);
      navigate('/dashboard');
    // In handleSubmit catch block — add 429 case
} catch (err) {
  const status  = err.response?.status;
  const message = err.response?.data?.message;

  if (status === 429) {
    setGlobalError(
      message || 'Too many attempts. Please wait before trying again.'
    );
    // Optional: disable the button for a few seconds
    setLoading(true);
    setTimeout(() => setLoading(false), 5000);
  } else if (status === 401) {
    setGlobalError('Invalid email or password. Please try again.');
    setErrors({ email: ' ', password: ' ' });
  } else if (status === 409) {
    setGlobalError('An account with this email already exists.');
    setErrors({ email: 'Email already registered' });
  } else if (!err.response) {
    setGlobalError('Cannot connect to server. Please try again later.');
  } else {
    setGlobalError(message || 'Something went wrong. Please try again.');
  }
} finally {
      setLoading(false);
    }
  };

  const inputStyle = (fieldName) => ({
    display:         'block',
    width:           '100%',
    backgroundColor: '#1f2937',
    border:          `1px solid ${
      errors[fieldName] && errors[fieldName].trim()
        ? '#ef4444'
        : '#374151'
    }`,
    borderRadius:    '12px',
    padding:         '11px 14px',
    color:           '#ffffff',
    fontSize:        '14px',
    outline:         'none',
    boxSizing:       'border-box',
    fontFamily:      'Inter, sans-serif',
    transition:      'border-color 0.2s',
  });

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #030712; }
        input::placeholder { color: #6b7280; }
        input:focus { outline: none; }
        a { text-decoration: none; }
        @keyframes shake {
          0%, 100% { transform: translateX(0);   }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px);  }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px);  }
        }
        .shake { animation: shake 0.4s ease; }
      `}</style>

      <div style={{
        width:           '100vw',
        height:          '100vh',
        backgroundColor: '#030712',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        fontFamily:      'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      }}>
        <div style={{ width: '100%', maxWidth: '420px', padding: '0 16px' }}>

          {/* Logo */}
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '12px',
            marginBottom:   '32px',
          }}>
            <div style={{
              width:           '44px',
              height:          '44px',
              backgroundColor: '#10b981',
              borderRadius:    '12px',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              fontSize:        '22px',
              flexShrink:      0,
            }}>
              💰
            </div>
            <span style={{
              color:         '#ffffff',
              fontWeight:    700,
              fontSize:      '22px',
              letterSpacing: '-0.5px',
            }}>
              WealthTrack
            </span>
          </div>

          {/* Card */}
          <div style={{
            backgroundColor: '#111827',
            border:          '1px solid #1f2937',
            borderRadius:    '20px',
            padding:         '32px',
          }}>

            <h1 style={{
              color:      '#ffffff',
              fontSize:   '24px',
              fontWeight: 700,
              margin:     '0 0 6px 0',
            }}>
              Welcome back
            </h1>
            <p style={{
              color:   '#6b7280',
              fontSize:'14px',
              margin:  '0 0 24px 0',
            }}>
              Sign in to your account to continue
            </p>

            {/* Global error banner */}
            {globalError && (
              <div
                className="shake"
                style={{
                  backgroundColor: 'rgba(239,68,68,0.08)',
                  border:          '1px solid rgba(239,68,68,0.25)',
                  borderRadius:    '12px',
                  padding:         '12px 14px',
                  marginBottom:    '20px',
                  display:         'flex',
                  alignItems:      'flex-start',
                  gap:             '10px',
                }}
              >
                <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
                <p style={{
                  color:      '#f87171',
                  fontSize:   '13px',
                  margin:     0,
                  lineHeight: 1.5,
                }}>
                  {globalError}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >

              {/* Email */}
              <div>
                <label style={{
                  display:      'block',
                  color:        '#d1d5db',
                  fontSize:     '14px',
                  fontWeight:   500,
                  marginBottom: '6px',
                }}>
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  style={inputStyle('email')}
                  onFocus={e => {
                    if (!errors.email || !errors.email.trim())
                      e.target.style.borderColor = '#10b981';
                  }}
                  onBlur={e => {
                    if (!errors.email || !errors.email.trim())
                      e.target.style.borderColor = '#374151';
                  }}
                />
                {errors.email && errors.email.trim() && (
                  <p style={{
                    color:     '#ef4444',
                    fontSize:  '12px',
                    marginTop: '5px',
                    display:   'flex',
                    alignItems:'center',
                    gap:       '4px',
                  }}>
                    <span>✕</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label style={{
                  display:      'block',
                  color:        '#d1d5db',
                  fontSize:     '14px',
                  fontWeight:   500,
                  marginBottom: '6px',
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    style={{ ...inputStyle('password'), paddingRight: '42px' }}
                    onFocus={e => {
                      if (!errors.password || !errors.password.trim())
                        e.target.style.borderColor = '#10b981';
                    }}
                    onBlur={e => {
                      if (!errors.password || !errors.password.trim())
                        e.target.style.borderColor = '#374151';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(p => !p)}
                    style={{
                      position:       'absolute',
                      right:          '12px',
                      top:            '50%',
                      transform:      'translateY(-50%)',
                      background:     'none',
                      border:         'none',
                      color:          '#6b7280',
                      cursor:         'pointer',
                      fontSize:       '16px',
                      padding:        '0',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                    }}
                  >
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && errors.password.trim() && (
                  <p style={{
                    color:     '#ef4444',
                    fontSize:  '12px',
                    marginTop: '5px',
                    display:   'flex',
                    alignItems:'center',
                    gap:       '4px',
                  }}>
                    <span>✕</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  display:         'block',
                  width:           '100%',
                  backgroundColor: loading ? '#059669' : '#10b981',
                  color:           '#ffffff',
                  border:          'none',
                  borderRadius:    '12px',
                  padding:         '13px',
                  fontSize:        '15px',
                  fontWeight:      600,
                  cursor:          loading ? 'not-allowed' : 'pointer',
                  opacity:         loading ? 0.7 : 1,
                  marginTop:       '4px',
                  fontFamily:      'Inter, sans-serif',
                  transition:      'background-color 0.2s',
                }}
                onMouseEnter={e => {
                  if (!loading) e.target.style.backgroundColor = '#059669';
                }}
                onMouseLeave={e => {
                  if (!loading) e.target.style.backgroundColor = '#10b981';
                }}
              >
                {loading ? 'Signing in...' : 'Sign in →'}
              </button>

            </form>

            {/* Register link */}
            <p style={{
              textAlign: 'center',
              color:     '#6b7280',
              fontSize:  '14px',
              marginTop: '20px',
            }}>
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{ color: '#10b981', fontWeight: 500 }}
              >
                Create one
              </Link>
            </p>

          </div>

          {/* Footer */}
          <p style={{
            textAlign:  'center',
            color:      '#374151',
            fontSize:   '12px',
            marginTop:  '24px',
          }}>
            Secure · Private · Yours
          </p>

        </div>
      </div>
    </>
  );
};

export default LoginPage;