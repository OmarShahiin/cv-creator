import { Routes, Route } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Landing from '@/pages/Landing/Landing';
import OTP from '@/pages/Auth/OTP';
import Templates from '@/pages/Home/Home';
import CreateLayout from '@/pages/Steps/CreateLayout';
import JobDescriptionForm from '@/components/Steps/JobDiscription';
import NameForm from '@/components/Steps/NameForm';
import Loading from '@/pages/Steps/Loading';
import FinalStep from '@/pages/Steps/FinalStep';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import Payment from '@/pages/Steps/Payment';
import ProtectedRoute from './ProtectedRoute';
import PublicOnlyRoute from './PublicOnlyRoute';

const Routing = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="*" element={<Landing />} />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/OTP"
        element={
          <PublicOnlyRoute>
            <OTP />
          </PublicOnlyRoute>
        }
      />
      <Route path="/linkedin" element={<LinkedInCallback />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Templates />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<JobDescriptionForm />} />
        <Route path="Loading" element={<Loading />} />
        <Route path="Name" element={<NameForm />} />
        <Route path="payment" element={<Payment />} />
      </Route>

      <Route
        path="/final-step"
        element={
          <ProtectedRoute>
            <FinalStep />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routing;
