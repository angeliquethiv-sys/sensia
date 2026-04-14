import { loadStripe } from '@stripe/stripe-js';

const key = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

export const isStripeConfigured = Boolean(key);
export const stripePromise = key ? loadStripe(key) : null;

export const PLANS = {
  free: {
    id: 'free',
    label: 'Gratuit',
    price: '0€',
    features: [
      '3 séances guidées par semaine',
      'Modules éducatifs de base',
      'Suivi de progression simple',
    ],
    cta: 'Plan actuel',
  },
  monthly: {
    id: 'monthly',
    label: 'Premium Mensuel',
    price: '12,99€',
    period: '/mois · sans engagement',
    priceId: process.env.REACT_APP_STRIPE_PRICE_MONTHLY || 'price_monthly',
    features: [
      'Séances illimitées',
      'Analyse ceinture complète',
      'Tous les modules éducatifs',
      'Export PDF rapport médical',
      'Calibration personnalisée',
      'Support prioritaire',
    ],
    cta: 'Commencer Premium',
    popular: false,
  },
  yearly: {
    id: 'yearly',
    label: 'Premium Annuel',
    price: '89,99€',
    period: '/an · soit 7,50€/mois',
    priceId: process.env.REACT_APP_STRIPE_PRICE_YEARLY || 'price_yearly',
    saving: 'Économise 65,89€',
    features: [
      'Tout le Premium Mensuel',
      '2 mois offerts',
      'Accès anticipé nouvelles fonctionnalités',
      'Badge membre fondateur',
    ],
    cta: 'Commencer Premium Annuel',
    popular: true,
  },
};

export async function redirectToCheckout(priceId) {
  if (!isStripeConfigured) {
    alert('Stripe non configuré — ajoutez REACT_APP_STRIPE_PUBLIC_KEY dans vos variables d\'environnement');
    return;
  }
  const stripe = await stripePromise;
  if (!stripe) return;
  await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    successUrl: `${window.location.origin}/home?premium=success`,
    cancelUrl:  `${window.location.origin}/pricing`,
  });
}
