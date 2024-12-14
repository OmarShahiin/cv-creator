import { Routes, Route } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import Landing from '@/pages/Landing/Landing';
import OTP from '@/pages/Auth/OTP';
import Templates from '@/pages/Home/Home';
import CreateLayout from '@/pages/Steps/CreateLayout';
import JobDescriptionForm from '@/components/Steps/JobDiscription';
import NameForm from '@/components/Steps/NameForm';
import Loading from '@/pages/Steps/Loading';
import FinalStep from '@/pages/Steps/FinalStep';
import { LinkedInCallback } from 'react-linkedin-login-oauth2';

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<Landing />} />
      <Route path="/home" element={<Templates />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/OTP" element={<OTP />} />
      <Route path="/create" element={<CreateLayout />}>
        <Route index element={<JobDescriptionForm />} />
        <Route path="Loading" element={<Loading />} />
        <Route path="Name" element={<NameForm />} />
        <Route path="final-step" element={<FinalStep />} />
      </Route>
      <Route path="/linkedin" element={<LinkedInCallback />} />
    </Routes>
  );
};

export default Routing;
