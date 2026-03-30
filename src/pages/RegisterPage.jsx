import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../api/authApi';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [form, setForm] = useState({
    fullName: '', email: '', password: ''
  });
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const [errors,      setErrors]      = useState({});
  const [globalError, setGlobalError] = useState('');

const validate = () => {
  const newErrors = {};
  if (!form.fullName.trim())
    newErrors.fullName = 'Full name is required';
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
    const { data } = await authApi.register(form);
    login(data);
    toast.success('Account created! Welcome aboard.');
    navigate('/dashboard');
  } catch (err) {
    const status  = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 409) {
      setGlobalError('An account with this email already exists.');
      setErrors({ email: 'Email already registered' });
    } else if (status === 400) {
      setGlobalError(message || 'Please check your input and try again.');
    } else if (!err.response) {
      setGlobalError('Cannot connect to server. Please try again later.');
    } else {
      setGlobalError(message || 'Something went wrong. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

  const inputStyle = {
    display:         'block',
    width:           '100%',
    backgroundColor: '#1f2937',
    border:          '1px solid #374151',
    borderRadius:    '12px',
    padding:         '11px 14px',
    color:           '#ffffff',
    fontSize:        '14px',
  };

  const labelStyle = {
    display:      'block',
    color:        '#d1d5db',
    fontSize:     '14px',
    fontWeight:   500,
    marginBottom: '6px',
  };

  const fields = [
    { name: 'fullName', label: 'Full name',     type: 'text',  placeholder: 'John Doe'           },
    { name: 'email',    label: 'Email address', type: 'email', placeholder: 'john@example.com'   },
  ];

  
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: #030712; }
        input::placeholder { color: #6b7280; }
        input:focus { outline: none; }
        a { text-decoration: none; }
      `}</style>

      <div style={{
        width:           '100vw',
        height:          '100vh',
        backgroundColor: '#030712',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        fontFamily:      'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        padding:         '0 16px',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

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
              Create account
            </h1>
            <p style={{
              color:   '#6b7280',
              fontSize:'14px',
              margin:  '0 0 28px 0',
            }}>
              Start tracking your finances today
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >

              {/* Full Name + Email */}
              {fields.map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label style={labelStyle}>{label}</label>
                  <input
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#10b981'}
                    onBlur={e  => e.target.style.borderColor = '#374151'}
                  />
                </div>
              ))}

              {/* Password */}
              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    required
                    style={{ ...inputStyle, paddingRight: '42px' }}
                    onFocus={e => e.target.style.borderColor = '#10b981'}
                    onBlur={e  => e.target.style.borderColor = '#374151'}
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
                <p style={{
                  color:     '#6b7280',
                  fontSize:  '12px',
                  marginTop: '5px',
                }}>
                  Must be at least 8 characters
                </p>
              </div>

              {/* Submit */}
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
                {loading ? 'Creating account...' : 'Create account →'}
              </button>

            </form>

            {/* Login link */}
            <p style={{
              textAlign: 'center',
              color:     '#6b7280',
              fontSize:  '14px',
              marginTop: '20px',
            }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#10b981', fontWeight: 500 }}>
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;