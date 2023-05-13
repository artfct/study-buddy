import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPage1 from './SignupPage1';
import SignupPage2 from './SignupPage2';
import SignupPage3 from './SignupPage3';
import SignupPage4 from './SignupPage4';

function Signup({ firestore, user }) {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [scheduleData, setScheduleData] = useState(null);

  const navigate = useNavigate();

  const nextPage = (newData) => {
    if (newData.scheduleData) {
      setScheduleData(newData.scheduleData);
      delete newData.scheduleData;
    }
    setUserData({ ...userData, ...newData });
    setStep(step + 1);
  };

  const previousPage = () => {
    setStep(step - 1);
    setUserData({ ...userData });
  };

  const goToHome = () => {
    navigate('/');
  };

  switch (step) {
    case 1:
      return <SignupPage1 userData={userData} onNext={nextPage} />;
    case 2:
      return <SignupPage2 userData={userData} onNext={nextPage} onBack={previousPage} />;
    // case 3:
    //   return <SignupPage3 onNext={nextPage} onBack={previousPage} />;
    case 3:
      return (
        <SignupPage4
          userData={userData}
          onFinish={goToHome}
          onBack={previousPage}
          scheduleData={scheduleData}
          firestore={firestore}
          user={user}
        />
      );
    default:
      return <SignupPage1 onNext={nextPage} />;
  }
}

export default Signup;
