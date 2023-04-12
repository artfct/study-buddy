import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPage1 from './SignupPage1';
import SignupPage2 from './SignupPage2';
import SignupPage3 from './SignupPage3';
import SignupPage4 from './SignupPage4';

function Signup() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const nextPage = (newData) => {
    setUserData({ ...userData, ...newData });
    setStep(step + 1);
  };

  const previousPage = () => {
    setStep(step - 1);
  };

  const goToHome = () => {
    navigate('/');
  };

  switch (step) {
    case 1:
      return <SignupPage1 onNext={nextPage} />;
    case 2:
      return <SignupPage2 onNext={nextPage} onBack={previousPage} />;
    case 3:
      return <SignupPage3 onNext={nextPage} onBack={previousPage} />;
    case 4:
      return (
        <SignupPage4
          userData={userData}
          onFinish={goToHome}
          onBack={previousPage}
        />
      );
    default:
      return <SignupPage1 onNext={nextPage} />;
  }
}

export default Signup;
