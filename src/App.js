import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileProvider }       from './context/ProfileContext';
import OnboardingScreen          from './screens/OnboardingScreen';
import HomeScreen                from './screens/HomeScreen';
import ProgramScreen             from './screens/ProgramScreen';
import MySessionScreen           from './screens/MySessionScreen';
import ExerciseSessionScreen     from './screens/ExerciseSessionScreen';
import SessionScreen             from './screens/SessionScreen';
import LearnScreen               from './screens/LearnScreen';
import ProfileScreen             from './screens/ProfileScreen';
import PlaylistScreen            from './screens/PlaylistScreen';
import BadDayScreen              from './screens/BadDayScreen';

function App() {
  const hasProfile = Boolean(localStorage.getItem('sensia_profile'));
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding"   element={<OnboardingScreen />} />
          <Route path="/home"         element={<HomeScreen />} />
          <Route path="/program"      element={<ProgramScreen />} />
          <Route path="/my-session"   element={<MySessionScreen />} />
          <Route path="/exercise/:id" element={<ExerciseSessionScreen />} />
          <Route path="/session"      element={<SessionScreen />} />
          <Route path="/learn"        element={<LearnScreen />} />
          <Route path="/playlist"     element={<PlaylistScreen />} />
          <Route path="/profile"      element={<ProfileScreen />} />
          <Route path="/bad-day"      element={<BadDayScreen />} />
          <Route path="/"
            element={hasProfile
              ? <Navigate to="/home" replace />
              : <Navigate to="/onboarding" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
