import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../api/authApi';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [form,     setForm]     = useState({ email: '', password: '' });
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authApi.login(form);
      login(data);
      toast.success(`Welcome back, ${data.fullName}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Reset any global margin/padding */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #030712; }
        input::placeholder { color: #6b7280; }
        input:focus { outline: none; }
        a { text-decoration: none; }
      `}</style>

      <div style={{
        width:          '100vw',
        height:         '100vh',
        backgroundColor:'#030712',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontFamily:     'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      }}>
        <div style={{
          width:   '100%',
          maxWidth:'420px',
          padding: '0 16px',
        }}>

          {/* ── Logo ── */}
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

          {/* ── Card ── */}
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
              color:      '#6b7280',
              fontSize:   '14px',
              margin:     '0 0 28px 0',
            }}>
              Sign in to your account to continue
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

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
                  required
                  style={{
                    display:         'block',
                    width:           '100%',
                    backgroundColor: '#1f2937',
                    border:          '1px solid #374151',
                    borderRadius:    '12px',
                    padding:         '11px 14px',
                    color:           '#ffffff',
                    fontSize:        '14px',
                  }}
                  onFocus={e => e.target.style.borderColor = '#10b981'}
                  onBlur={e  => e.target.style.borderColor = '#374151'}
                />
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
                    required
                    style={{
                      display:         'block',
                      width:           '100%',
                      backgroundColor: '#1f2937',
                      border:          '1px solid #374151',
                      borderRadius:    '12px',
                      padding:         '11px 42px 11px 14px',
                      color:           '#ffffff',
                      fontSize:        '14px',
                    }}
                    onFocus={e => e.target.style.borderColor = '#10b981'}
                    onBlur={e  => e.target.style.borderColor = '#374151'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(p => !p)}
                    style={{
                      position:        'absolute',
                      right:           '12px',
                      top:             '50%',
                      transform:       'translateY(-50%)',
                      background:      'none',
                      border:          'none',
                      color:           '#6b7280',
                      cursor:          'pointer',
                      fontSize:        '16px',
                      padding:         '0',
                      display:         'flex',
                      alignItems:      'center',
                      justifyContent:  'center',
                    }}
                  >
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  display:         'block',
                  width:           '100%',
                  backgroundColor: '#10b981',
                  color:           '#ffffff',
                  border:          'none',
                  borderRadius:    '12px',
                  padding:         '13px',
                  fontSize:        '15px',
                  fontWeight:      600,
                  cursor:          loading ? 'not-allowed' : 'pointer',
                  opacity:         loading ? 0.7 : 1,
                  marginTop:       '4px',
                }}
                onMouseEnter={e => { if (!loading) e.target.style.backgroundColor = '#059669'; }}
                onMouseLeave={e => { if (!loading) e.target.style.backgroundColor = '#10b981'; }}
              >
                {loading ? 'Signing in...' : 'Sign in →'}
              </button>

            </form>

            {/* Register link */}
            <p style={{
              textAlign:  'center',
              color:      '#6b7280',
              fontSize:   '14px',
              marginTop:  '20px',
            }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#10b981', fontWeight: 500 }}>
                Create one
              </Link>
            </p>

          </div>

          {/* Bottom tagline */}
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