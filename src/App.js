import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileProvider }  from './context/ProfileContext';
import { AuthProvider }     from './context/AuthContext';
import PrivateRoute, { SensiaLoader } from './components/PrivateRoute';

// Auth screens (small, not lazy — needed immediately)
import LoginScreen         from './screens/auth/LoginScreen';
import RegisterScreen      from './screens/auth/RegisterScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';

// App screens — lazy loaded for performance
const OnboardingScreen       = lazy(() => import('./screens/OnboardingScreen'));
const HomeScreen             = lazy(() => import('./screens/HomeScreen'));
const ProgramScreen          = lazy(() => import('./screens/ProgramScreen'));
const MySessionScreen        = lazy(() => import('./screens/MySessionScreen'));
const ExerciseSessionScreen  = lazy(() => import('./screens/ExerciseSessionScreen'));
const SessionScreen          = lazy(() => import('./screens/SessionScreen'));
const LearnScreen            = lazy(() => import('./screens/LearnScreen'));
const ProfileScreen          = lazy(() => import('./screens/ProfileScreen'));
const PlaylistScreen         = lazy(() => import('./screens/PlaylistScreen'));
const BadDayScreen           = lazy(() => import('./screens/BadDayScreen'));
const BeltScreen             = lazy(() => import('./screens/BeltScreen'));
const BeltTutorialScreen     = lazy(() => import('./screens/BeltTutorialScreen'));
const SessionAnalysisScreen  = lazy(() => import('./screens/SessionAnalysisScreen'));
const BeltProgressScreen     = lazy(() => import('./screens/BeltProgressScreen'));
const NotificationsScreen    = lazy(() => import('./screens/NotificationsScreen'));
const BeltDiscoveryScreen    = lazy(() => import('./screens/BeltDiscoveryScreen'));
const PreSessionScreen       = lazy(() => import('./screens/PreSessionScreen'));
const BeltCalibrationScreen  = lazy(() => import('./screens/BeltCalibrationScreen'));
const NoBeltScreen           = lazy(() => import('./screens/NoBeltScreen'));
const PricingScreen          = lazy(() => import('./screens/PricingScreen'));

function RootRedirect() {
  const hasProfile = Boolean(localStorage.getItem('sensia_profile'));
  return hasProfile
    ? <Navigate to="/home" replace />
    : <Navigate to="/onboarding" replace />;
}

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
          <Suspense fallback={<SensiaLoader />}>
            <Routes>
              {/* Public auth routes */}
              <Route path="/auth/login"          element={<LoginScreen />} />
              <Route path="/auth/register"       element={<RegisterScreen />} />
              <Route path="/auth/forgot-password" element={<ForgotPasswordScreen />} />

              {/* Onboarding — public */}
              <Route path="/onboarding" element={<OnboardingScreen />} />

              {/* Pricing — public */}
              <Route path="/pricing" element={<PricingScreen />} />

              {/* Protected routes */}
              <Route path="/home"           element={<PrivateRoute><HomeScreen /></PrivateRoute>} />
              <Route path="/program"        element={<PrivateRoute><ProgramScreen /></PrivateRoute>} />
              <Route path="/my-session"     element={<PrivateRoute><MySessionScreen /></PrivateRoute>} />
              <Route path="/exercise/:id"   element={<PrivateRoute><ExerciseSessionScreen /></PrivateRoute>} />
              <Route path="/session"        element={<PrivateRoute><SessionScreen /></PrivateRoute>} />
              <Route path="/learn"          element={<PrivateRoute><LearnScreen /></PrivateRoute>} />
              <Route path="/playlist"       element={<PrivateRoute><PlaylistScreen /></PrivateRoute>} />
              <Route path="/profile"        element={<PrivateRoute><ProfileScreen /></PrivateRoute>} />
              <Route path="/bad-day"        element={<PrivateRoute><BadDayScreen /></PrivateRoute>} />
              <Route path="/belt"           element={<PrivateRoute><BeltScreen /></PrivateRoute>} />
              <Route path="/belt-tutorial"  element={<PrivateRoute><BeltTutorialScreen /></PrivateRoute>} />
              <Route path="/session-analysis" element={<PrivateRoute><SessionAnalysisScreen /></PrivateRoute>} />
              <Route path="/belt-progress"  element={<PrivateRoute><BeltProgressScreen /></PrivateRoute>} />
              <Route path="/notifications"  element={<PrivateRoute><NotificationsScreen /></PrivateRoute>} />
              <Route path="/belt-discovery" element={<PrivateRoute><BeltDiscoveryScreen /></PrivateRoute>} />
              <Route path="/pre-session"    element={<PrivateRoute><PreSessionScreen /></PrivateRoute>} />
              <Route path="/belt-calibration" element={<PrivateRoute><BeltCalibrationScreen /></PrivateRoute>} />
              <Route path="/no-belt"        element={<PrivateRoute><NoBeltScreen /></PrivateRoute>} />

              {/* Root + catch-all */}
              <Route path="/"  element={<RootRedirect />} />
              <Route path="*"  element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
