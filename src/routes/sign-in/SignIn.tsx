import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase';

import { toast } from 'react-toastify';
import React from 'react';

import { ReactComponent as GoogleLogo } from '../../assets/google.svg';
import Button from '../../components/button/Button';
import './signIn.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignIn: React.FC = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      navigate('/');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/wrong-password':
          toast.error('incorrect password or email');
          break;
        case 'auth/user-not-found':
          toast.error('no user associated with this email');
          break;
        default:
          toast.error(error.message);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <main className="sign-in">
      <div className="sign-in__container">
        <h2 className="sign-in__title">Sign In to Russo Trip</h2>
        <form onSubmit={handleSubmit} className="sign-in__form">
          <label htmlFor="email">Email adress</label>
          <input
            className="sign-in__input"
            type="email"
            required
            onChange={handleChange}
            name="email"
            id="email"
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
            className="sign-in__input"
            type="password"
            required
            onChange={handleChange}
            name="password"
            id="password"
            value={password}
          />
          <Button
            buttonType={'btn__secondary-inverted'}
            buttonText={'Sign In'}
            type="submit"
          />
        </form>
        <span>or</span>
        <button onClick={signInWithGoogle} className="sign-in__google-button">
          <GoogleLogo className="sign-in__google-logo" />
        </button>
        <span className="sign-in__link">
          New to Russo Trip? <Link to="/sign-up">Create an account.</Link>
        </span>
      </div>
    </main>
  );
};

export default SignIn;
