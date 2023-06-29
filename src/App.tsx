import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Loader from './components/loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const Home = lazy(() => import('./routes/home/Home'));
const About = lazy(() => import('./routes/about/About'));
const Contacts = lazy(() => import('./routes/contacts/Contacts'));
const SignIn = lazy(() => import('./routes/sign-in/SignIn'));
const SignUp = lazy(() => import('./routes/sign-up/SignUp'));
const Pathways = lazy(() => import('./components/pathways/Pathways'));
const Pathway = lazy(() => import('./components/pathway/Pathway'));
const PrivateRoute = lazy(
  () => import('./components/private-route/PrivateRoute')
);
const Profile = lazy(() => import('./routes/profile/Profile'));
const Team = lazy(() => import('./routes/team/Team'));

const App = () => {
  return (
    <div className="container">
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="team" element={<Team />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="city/:cityName" element={<Pathways />} />
          <Route path="city/:cityName/:pathwayId" element={<Pathway />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;
