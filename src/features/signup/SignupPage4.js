// import React, { useState } from 'react';
// import signUpWithEmailPassword from '../../services/signUpWithEmailPassword';
// import LoadingAnimation from '../../components/animation/LoadingAnimation';

// function SignupPage4({ userData, onFinish, onBack, scheduleData }) {
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     console.log('userData:', userData);

//     setIsLoading(true);

//     try {
//       await signUpWithEmailPassword({ ...userData, courses: (scheduleData?.courses || []), setError });
//       onFinish();
//     } catch (error) {
//       console.log("Firebase Signup error.", error)
//       setIsLoading(false);
//     }

//     setIsLoading(false);

//   };
//   if (isLoading) {
//     return (
//       <div>
//         <h2>Signup Page 4</h2>
//         <LoadingAnimation />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Signup Page 4</h2>
//       <p>Please review your information and confirm:</p>
//       <pre>{JSON.stringify({ ...userData, courses: scheduleData }, null, 2)}</pre>
//       {error && <p className="error-message">{error}</p>}
//       <button onClick={onBack}>Back</button>
//       <button onClick={handleSubmit}>Finish</button>
//     </div>
//   );
// }

// export default SignupPage4;


import React, { useState, useRef } from 'react';
import signUpWithEmailPassword from '../../services/signUpWithEmailPassword';
import LoadingAnimation from '../../components/animation/LoadingAnimation';

function SignupPage4({ userData, onFinish, onBack, scheduleData }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const setAnimationFinish = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('userData:', userData);

    setIsLoading(true);
    setProgress(0);

    try {
      await signUpWithEmailPassword({ ...userData, courses: (scheduleData?.courses || []) }, setError, setIsLoading, setProgress);
      if (setAnimationFinish.current) {
        setAnimationFinish.current(true);
      }
      
      setTimeout(() => {
        setIsLoading(false);
        onFinish();
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.log("Firebase Signup error.", error)
    } 
  };

  if (isLoading) {
    return (
      <div>
        <h2>Signup Page 4</h2>
        <LoadingAnimation isLoading={isLoading} progress={progress} />
      </div>
    );
  }

  return (
    <div>
      <h2>Signup Page 4</h2>
      <p>Please review your information and confirm:</p>
      <pre>{JSON.stringify({ ...userData, courses: scheduleData }, null, 2)}</pre>
      {error && <p className="error-message">{error}</p>}
      <button onClick={onBack}>Back</button>
      <button onClick={handleSubmit}>Finish</button>
    </div>
  );
}

export default SignupPage4;
