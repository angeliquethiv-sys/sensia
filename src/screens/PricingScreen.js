import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import { usePremium } from '../hooks/usePremium';
import { redirectToCheckout, PLANS as STRIPE_PLANS, isStripeConfigured } from '../lib/stripe';
import { track, Events } from '../lib/analytics';

const PLANS = [
  {
    id: 'free',
    name: 'Découverte',
    price: 'Gratuit',
    period: '',
    emoji: '🌱',
    color: '#A89EC0',
    gradient: 'linear-gradient(135deg, #F0EDF8, #E8E4F0)',
    border: 'rgba(155,141,200,0.3)',
    features: [
      { included: true,  label: '3 séances de respiration / semaine' },
      { included: true,  label: 'Affirmations quotidiennes' },
      { included: true,  label: '2 playlists musicales' },
      { included: false, label: 'Séances illimitées' },
      { included: false, label: 'Toutes les techniques de respiration' },
      { included: false, label: 'Playlists thématiques illimitées' },
      { included: false, label: 'Suivi de progression' },
      { included: false, label: 'Contenu exclusif post-partum' },
    ],
    cta: 'Commencer gratuitement',
    popular: false,
  },
  {
    id: 'monthly',
    name: 'Sérénité',
    price: '9,99€',
    period: '/ mois',
    emoji: '🌸',
    color: '#9B8DC8',
    gradient: 'linear-gradient(135deg, #9B8DC8, #7B6BA8)',
    border: '#9B8DC8',
    features: [
      { included: true, label: 'Séances de respiration illimitées' },
      { included: true, label: 'Toutes les techniques (4-7-8, cohérence…)' },
      { included: true, label: 'Playlists thématiques illimitées' },
      { included: true, label: 'Suivi de progression hebdomadaire' },
      { included: true, label: 'Affirmations personnalisées' },
      { included: true, label: 'Contenu exclusif post-partum' },
      { included: false, label: 'Accès à vie' },
      { included: false, label: 'Consultation avec une experte' },
    ],
    cta: 'Commencer l\'essai gratuit',
    popular: true,
    trial: '7 jours offerts',
  },
  {
    id: 'annual',
    name: 'Harmonie',
    price: '79,99€',
    period: '/ an',
    priceMonthly: 'soit 6,67€/mois',
    savings: 'Économisez 40%',
    emoji: '✨',
    color: '#C49A9A',
    gradient: 'linear-gradient(135deg, #D4A5A5, #C49A9A)',
    border: '#D4A5A5',
    features: [
      { included: true, label: 'Tout Sérénité inclus' },
      { included: true, label: 'Accès à tous les futurs contenus' },
      { included: true, label: 'Suivi personnalisé avec l\'IA' },
      { included: true, label: 'Méditations guidées exclusives' },
      { included: true, label: 'Support prioritaire' },
      { included: true, label: '1 consultation offerte par trimestre' },
      { included: true, label: 'Communauté SENSIA privée' },
      { included: true, label: 'Accès bêta aux nouvelles fonctionnalités' },
    ],
    cta: 'Choisir Harmonie',
    popular: false,
  },
];

const TESTIMONIALS = [
  {
    text: "SENSIA m'a aidée à retrouver mon souffle après des nuits épuisantes. Les séances de respiration sont devenues mon moment sacré.",
    author: "Camille, 2 mois après l'accouchement",
    avatar: '🌸',
  },
  {
    text: "La musique et les affirmations m'ont redonné confiance. Je recommande à toutes les nouvelles mamans.",
    author: "Sophie, 4 mois post-partum",
    avatar: '💜',
  },
];

export default function PricingScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, plan: activePlan, daysLeft } = usePremium();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState('');

  const handleCta = async (planId) => {
    if (planId === 'free') { navigate('/home'); return; }
    if (!user) { navigate('/auth/register'); return; }
    if (isPremium) { navigate('/home'); return; }
    setError('');
    setLoadingPlan(planId);
    // Map plan id to Stripe price id
    const priceId = planId === 'annual'
      ? STRIPE_PLANS.yearly.priceId
      : STRIPE_PLANS.monthly.priceId;
    if (!isStripeConfigured) {
      // Demo mode
      const daysToAdd = planId === 'annual' ? 365 : 30;
      localStorage.setItem('sensia_subscription', JSON.stringify({ isPremium: true, plan: planId, daysLeft: daysToAdd }));
      track(Events.SUBSCRIPTION_STARTED, { plan: planId });
      setLoadingPlan(null);
      navigate('/home?premium=success');
      return;
    }
    await redirectToCheckout(priceId);
    setLoadingPlan(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #F0EDF8 0%, #F5EFE6 50%, #EDE0D4 100%)', paddingBottom: '90px' }}>

      {/* Header */}
      <div style={{
        padding: '56px 24px 28px',
        background: 'linear-gradient(160deg, #E8E4F0 0%, #F5EFE6 100%)',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(155,141,200,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(212,165,165,0.1)', pointerEvents: 'none' }} />

        <div style={{ animation: 'fadeIn 0.6s ease-out', position: 'relative' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', color: '#3D3250', fontWeight: '400', marginBottom: '10px' }}>
            Votre bien-être,<br />votre choix
          </h1>
          <p style={{ fontSize: '15px', color: '#7A7490', lineHeight: 1.6, maxWidth: '280px', margin: '0 auto' }}>
            Commencez gratuitement. Évoluez à votre rythme.
          </p>
        </div>
      </div>

      <div style={{ padding: '24px 20px 0' }}>

        {/* Plans */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  borderRadius: '24px',
                  border: isSelected ? `2px solid ${plan.border}` : '2px solid transparent',
                  background: plan.id === 'monthly' && isSelected
                    ? plan.gradient
                    : isSelected
                    ? 'rgba(254,254,254,0.95)'
                    : 'rgba(254,254,254,0.7)',
                  boxShadow: isSelected ? '0 12px 35px rgba(107,91,149,0.18)' : '0 4px 15px rgba(107,91,149,0.08)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    background: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50px', padding: '4px 12px',
                    fontSize: '11px', fontWeight: '700',
                    color: plan.id === 'monthly' && isSelected ? '#FEFEFE' : '#9B8DC8',
                    letterSpacing: '0.08em',
                    border: `1px solid ${plan.id === 'monthly' && isSelected ? 'rgba(255,255,255,0.3)' : 'rgba(155,141,200,0.3)'}`,
                  }}>
                    ✨ POPULAIRE
                  </div>
                )}

                {plan.savings && (
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    background: 'linear-gradient(135deg, #D4A5A5, #C49A9A)',
                    borderRadius: '50px', padding: '4px 12px',
                    fontSize: '11px', fontWeight: '700', color: '#FEFEFE',
                    letterSpacing: '0.05em',
                  }}>
                    {plan.savings}
                  </div>
                )}

                <div style={{ padding: '22px 22px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      background: plan.id === 'monthly' && isSelected ? 'rgba(255,255,255,0.2)' : `${plan.border}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '24px',
                    }}>
                      {plan.emoji}
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '22px', fontWeight: '500',
                        color: plan.id === 'monthly' && isSelected ? '#FEFEFE' : '#3D3250',
                      }}>
                        {plan.name}
                      </h3>
                      {plan.trial && (
                        <span style={{
                          fontSize: '11px',
                          color: plan.id === 'monthly' && isSelected ? 'rgba(255,255,255,0.8)' : '#9B8DC8',
                          fontWeight: '600', letterSpacing: '0.05em',
                        }}>
                          {plan.trial}
                        </span>
                      )}
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '28px', fontWeight: '500',
                        color: plan.id === 'monthly' && isSelected ? '#FEFEFE' : plan.color,
                      }}>
                        {plan.price}
                      </div>
                      {plan.period && (
                        <div style={{ fontSize: '12px', color: plan.id === 'monthly' && isSelected ? 'rgba(255,255,255,0.7)' : '#A89EC0' }}>
                          {plan.period}
                        </div>
                      )}
                      {plan.priceMonthly && (
                        <div style={{ fontSize: '11px', color: plan.id === 'monthly' && isSelected ? 'rgba(255,255,255,0.7)' : '#A89EC0' }}>
                          {plan.priceMonthly}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div style={{
                  padding: '0 22px 22px',
                  maxHeight: isSelected ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    {plan.features.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '14px', opacity: f.included ? 1 : 0.4 }}>
                          {f.included ? '✓' : '×'}
                        </span>
                        <span style={{
                          fontSize: '13.5px',
                          color: plan.id === 'monthly' && isSelected
                            ? f.included ? '#FEFEFE' : 'rgba(255,255,255,0.45)'
                            : f.included ? '#3D3250' : '#BEB8D0',
                          fontWeight: f.included ? '500' : '400',
                          lineHeight: 1.4,
                        }}>
                          {f.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); handleCta(plan.id); }}
                    disabled={loadingPlan === plan.id}
                    style={{
                      width: '100%', marginTop: '20px',
                      padding: '15px',
                      borderRadius: '50px',
                      background: plan.id === 'monthly' && isSelected
                        ? 'rgba(255,255,255,0.2)'
                        : plan.id === 'monthly'
                        ? plan.gradient
                        : `linear-gradient(135deg, ${plan.border}40, ${plan.border}70)`,
                      border: plan.id === 'monthly' && isSelected
                        ? '1.5px solid rgba(255,255,255,0.4)'
                        : 'none',
                      color: plan.id === 'monthly' && isSelected ? '#FEFEFE' : plan.id === 'free' ? '#9B8DC8' : '#FEFEFE',
                      fontSize: '14px', fontWeight: '600',
                      cursor: 'pointer',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {loadingPlan === plan.id
                      ? 'Redirection…'
                      : isPremium && plan.id === activePlan
                      ? `${plan.name} actif ✓${daysLeft ? ` — ${daysLeft}j` : ''}`
                      : plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: '12px 16px', background: 'rgba(226,75,74,.08)', borderRadius: 14, border: '1px solid rgba(226,75,74,.25)', marginBottom: 16 }}>
            <p style={{ fontSize: 13, color: '#E24B4A' }}>{error}</p>
          </div>
        )}

        {/* Already premium */}
        {isPremium && (
          <div style={{ padding: '14px 18px', background: 'rgba(123,94,167,.1)', borderRadius: 16, border: '1.5px solid rgba(123,94,167,.25)', textAlign: 'center', marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: '#7B5EA7', fontWeight: 700 }}>
              ✓ Tu es déjà Premium{daysLeft !== null ? ` — encore ${daysLeft} jour${daysLeft > 1 ? 's' : ''}` : ''}
            </p>
          </div>
        )}

        {/* Garantie */}
        <div style={{
          background: 'rgba(254,254,254,0.8)',
          borderRadius: '20px', padding: '20px',
          boxShadow: '0 4px 20px rgba(107,91,149,0.08)',
          textAlign: 'center', marginBottom: '24px',
        }}>
          <p style={{ fontSize: '22px', marginBottom: '8px' }}>🛡️</p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#3D3250', marginBottom: '6px' }}>Satisfaite ou remboursée</p>
          <p style={{ fontSize: '13px', color: '#7A7490', lineHeight: 1.5 }}>
            Pas convaincue ? Nous vous remboursons intégralement dans les 14 jours, sans question.
          </p>
        </div>

        {/* Témoignages */}
        <p style={{ fontSize: '12px', color: '#A89EC0', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px', fontWeight: '600' }}>
          Ce qu'elles disent
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              background: 'rgba(254,254,254,0.8)',
              borderRadius: '20px', padding: '18px 20px',
              boxShadow: '0 4px 15px rgba(107,91,149,0.08)',
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '16px', color: '#3D3250',
                fontStyle: 'italic', lineHeight: 1.6,
                marginBottom: '12px',
              }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{t.avatar}</span>
                <span style={{ fontSize: '13px', color: '#A89EC0' }}>{t.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
