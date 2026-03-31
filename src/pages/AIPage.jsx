import { useState, useEffect } from 'react';
import { aiApi }               from '../api/aiApi';
import PageWrapper             from '../components/common/PageWrapper';
import toast                   from 'react-hot-toast';

// ── Severity config ──────────────────────────────────────
const SEVERITY = {
  SUCCESS: {
    bg:     'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    icon:   '✅',
    title:  '#34d399',
    text:   'rgba(52,211,153,0.8)',
    badge:  { bg: 'rgba(16,185,129,0.15)', color: '#34d399' },
  },
  INFO: {
    bg:     'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
    icon:   '💡',
    title:  '#60a5fa',
    text:   'rgba(96,165,250,0.8)',
    badge:  { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
  },
  WARNING: {
    bg:     'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
    icon:   '⚠️',
    title:  '#fbbf24',
    text:   'rgba(251,191,36,0.8)',
    badge:  { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24' },
  },
  DANGER: {
    bg:     'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.2)',
    icon:   '🚨',
    title:  '#f87171',
    text:   'rgba(248,113,113,0.8)',
    badge:  { bg: 'rgba(239,68,68,0.15)', color: '#f87171' },
  },
};

// ── Health config ─────────────────────────────────────────
const HEALTH = {
  EXCELLENT: { color: '#34d399', bg: 'rgba(16,185,129,0.1)',  label: 'Excellent' },
  GOOD:      { color: '#60a5fa', bg: 'rgba(59,130,246,0.1)',  label: 'Good'      },
  WARNING:   { color: '#fbbf24', bg: 'rgba(245,158,11,0.1)',  label: 'Warning'   },
  CRITICAL:  { color: '#f87171', bg: 'rgba(239,68,68,0.1)',   label: 'Critical'  },
};

// ── Reusable card ─────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{
    backgroundColor: '#0f172a',
    border:          '1px solid #1e293b',
    borderRadius:    '16px',
    padding:         '22px',
    ...style,
  }}>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 style={{
    color:        '#ffffff',
    fontSize:     '15px',
    fontWeight:   600,
    margin:       '0 0 16px 0',
    paddingBottom:'12px',
    borderBottom: '1px solid #1e293b',
  }}>
    {children}
  </h3>
);

// ─────────────────────────────────────────────────────────
const AIPage = () => {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await aiApi.getRecommendations();
        setData(res.data);
      } catch {
        toast.error('Failed to load AI recommendations');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const health = data ? HEALTH[data.overallHealth] || HEALTH.GOOD : null;

  return (
    <PageWrapper
      title="AI Insights"
      subtitle="Personalised financial recommendations"
    >
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}>
          <div style={{
            width: '36px', height: '36px',
            border: '3px solid #10b981',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : !data ? (
        <Card>
          <p style={{ color: '#64748b', textAlign: 'center', fontSize: '14px' }}>
            No data available. Add some income and expenses first.
          </p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* ── Health Score ── */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1fr 2fr',
            gap:                 '16px',
          }}>

            {/* Score circle */}
            <Card style={{ display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{
                width:           '110px',
                height:          '110px',
                borderRadius:    '50%',
                border:          `6px solid ${health.color}`,
                backgroundColor: health.bg,
                display:         'flex',
                flexDirection:   'column',
                alignItems:      'center',
                justifyContent:  'center',
                boxShadow:       `0 0 24px ${health.bg}`,
              }}>
                <span style={{
                  color:      health.color,
                  fontSize:   '32px',
                  fontWeight: 800,
                  lineHeight: 1,
                }}>
                  {data.healthScore}
                </span>
                <span style={{ color: '#64748b', fontSize: '11px' }}>/ 100</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  color:      health.color,
                  fontSize:   '14px',
                  fontWeight: 700,
                  margin:     '0 0 2px 0',
                }}>
                  {health.label}
                </p>
                <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>
                  Financial Health Score
                </p>
              </div>
            </Card>

            {/* Savings Plan */}
            <Card>
              <SectionTitle>💰 Savings Plan</SectionTitle>
              <div style={{
                display:             'grid',
                gridTemplateColumns: '1fr 1fr',
                gap:                 '12px',
              }}>
                {[
                  {
                    label: 'Current Monthly Savings',
                    value: `$${Number(data.savingsPlan?.currentMonthlySavings ?? 0).toFixed(2)}`,
                    color: '#34d399',
                  },
                  {
                    label: 'Recommended Monthly',
                    value: `$${Number(data.savingsPlan?.recommendedMonthlySavings ?? 0).toFixed(2)}`,
                    color: '#60a5fa',
                  },
                  {
                    label: 'Current Savings Rate',
                    value: `${(data.savingsPlan?.currentSavingsRate ?? 0).toFixed(1)}%`,
                    color: '#fbbf24',
                  },
                  {
                    label: 'Target Savings Rate',
                    value: `${(data.savingsPlan?.targetSavingsRate ?? 0).toFixed(1)}%`,
                    color: '#a78bfa',
                  },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{
                    backgroundColor: '#1e293b',
                    borderRadius:    '12px',
                    padding:         '14px',
                  }}>
                    <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 6px 0' }}>
                      {label}
                    </p>
                    <p style={{ color, fontSize: '20px', fontWeight: 700, margin: 0 }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Annual potential */}
              <div style={{
                marginTop:       '12px',
                backgroundColor: 'rgba(16,185,129,0.06)',
                border:          '1px solid rgba(16,185,129,0.15)',
                borderRadius:    '12px',
                padding:         '12px 16px',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'space-between',
              }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                  Potential Annual Savings
                </span>
                <span style={{ color: '#34d399', fontSize: '18px', fontWeight: 700 }}>
                  ${Number(data.savingsPlan?.potentialAnnualSavings ?? 0).toFixed(2)}
                </span>
              </div>
            </Card>
          </div>

          {/* ── Recommendations ── */}
          <Card>
            <SectionTitle>
              ✦ Recommendations ({data.recommendations?.length ?? 0})
            </SectionTitle>
            {data.recommendations?.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center',
                padding: '20px 0' }}>
                No recommendations at this time. Keep up the great work!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.recommendations.map((rec, i) => {
                  const s = SEVERITY[rec.severity] || SEVERITY.INFO;
                  return (
                    <div key={i} style={{
                      backgroundColor: s.bg,
                      border:          `1px solid ${s.border}`,
                      borderRadius:    '14px',
                      padding:         '16px 18px',
                    }}>
                      <div style={{
                        display:        'flex',
                        alignItems:     'flex-start',
                        justifyContent: 'space-between',
                        gap:            '12px',
                        marginBottom:   '8px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '18px', flexShrink: 0 }}>
                            {s.icon}
                          </span>
                          <p style={{
                            color:      s.title,
                            fontSize:   '14px',
                            fontWeight: 600,
                            margin:     0,
                          }}>
                            {rec.title}
                          </p>
                        </div>
                        <span style={{
                          backgroundColor: s.badge.bg,
                          color:           s.badge.color,
                          fontSize:        '10px',
                          fontWeight:      700,
                          padding:         '3px 8px',
                          borderRadius:    '20px',
                          whiteSpace:      'nowrap',
                          flexShrink:      0,
                          textTransform:   'uppercase',
                          letterSpacing:   '0.05em',
                        }}>
                          {rec.type}
                        </span>
                      </div>

                      <p style={{
                        color:       s.text,
                        fontSize:    '13px',
                        margin:      '0 0 10px 28px',
                        lineHeight:  1.6,
                      }}>
                        {rec.message}
                      </p>

                      <div style={{
                        display:         'flex',
                        alignItems:      'center',
                        gap:             '8px',
                        marginLeft:      '28px',
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        borderRadius:    '8px',
                        padding:         '8px 12px',
                      }}>
                        <span style={{ color: '#475569', fontSize: '12px' }}>→</span>
                        <p style={{
                          color:    '#94a3b8',
                          fontSize: '12px',
                          margin:   0,
                        }}>
                          {rec.action}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* ── Goal Projections ── */}
          {data.goalProjections?.length > 0 && (
            <Card>
              <SectionTitle>🎯 Goal Projections</SectionTitle>
              <div style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap:                 '12px',
              }}>
                {data.goalProjections.map((goal, i) => (
                  <div key={i} style={{
                    backgroundColor: '#1e293b',
                    borderRadius:    '14px',
                    padding:         '16px',
                    border:          '1px solid #334155',
                  }}>
                    {/* Goal name */}
                    <div style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'space-between',
                      marginBottom:   '12px',
                    }}>
                      <p style={{
                        color:        '#ffffff',
                        fontSize:     '14px',
                        fontWeight:   600,
                        margin:       0,
                        overflow:     'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace:   'nowrap',
                      }}>
                        {goal.goalName}
                      </p>
                      <span style={{
                        color:           '#10b981',
                        fontSize:        '12px',
                        fontWeight:      600,
                        backgroundColor: 'rgba(16,185,129,0.1)',
                        padding:         '2px 8px',
                        borderRadius:    '20px',
                        flexShrink:      0,
                        marginLeft:      '8px',
                      }}>
                        {goal.progressPercentage.toFixed(0)}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div style={{
                      height:          '5px',
                      backgroundColor: '#0f172a',
                      borderRadius:    '3px',
                      marginBottom:    '14px',
                      overflow:        'hidden',
                    }}>
                      <div style={{
                        width:           `${Math.min(goal.progressPercentage, 100)}%`,
                        height:          '100%',
                        backgroundColor: '#10b981',
                        borderRadius:    '3px',
                      }} />
                    </div>

                    {/* Stats */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                    }}>
                      {[
                        { label: 'Saved',     value: `$${Number(goal.savedAmount).toFixed(0)}`  },
                        { label: 'Remaining', value: `$${Number(goal.remaining).toFixed(0)}`    },
                        { label: 'Est. Time', value: goal.estimatedMonthsToComplete > 0
                            ? `${goal.estimatedMonthsToComplete} months` : 'Goal met!'           },
                        { label: 'By',        value: goal.estimatedCompletionDate                },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p style={{
                            color: '#64748b', fontSize: '11px', margin: '0 0 2px 0',
                          }}>
                            {label}
                          </p>
                          <p style={{
                            color: '#ffffff', fontSize: '13px',
                            fontWeight: 500, margin: 0,
                          }}>
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ── Tips footer ── */}
          <div style={{
            backgroundColor: 'rgba(16,185,129,0.04)',
            border:          '1px solid rgba(16,185,129,0.1)',
            borderRadius:    '14px',
            padding:         '16px 20px',
            display:         'flex',
            alignItems:      'center',
            gap:             '12px',
          }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>🤖</span>
            <p style={{
              color:      '#64748b',
              fontSize:   '12px',
              margin:     0,
              lineHeight: 1.6,
            }}>
              Recommendations are based on your current month's data using
              rule-based financial analysis. Data refreshes automatically
              when you add new transactions.
            </p>
          </div>

        </div>
      )}
    </PageWrapper>
  );
};

export default AIPage;