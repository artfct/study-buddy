import React, { useEffect } from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled } from '@mui/material/styles';

// To change color of progress bar
const ColorLinearProgress = styled(LinearProgress)(({ theme }) => ({
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.success.light,
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.success.main,
  },
}));

const ProgressBarContainer = styled(Box)(({ theme }) => ({
  width: '80%',  // Change this value to adjust the length of the progress bar
  margin: 'auto',
}));

const texts = [
    'Hatching your account...',
    'Brewing up some magic...',
    'Cooking up a personalized experience...',
    'Sharpening pencils...',
    'Assembling your virtual avatar...',
    'Summoning pixels from the void...',
    'Unleashing the power of imagination...',
  ]; // Array of texts to display

function LoadingAnimation({ isLoading, progress }) {
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0);

  useEffect(() => {
    let textInterval;
    if (isLoading) {
      textInterval = setInterval(() => {
        setCurrentTextIndex((prevIndex) => {
          return (prevIndex + 1) % texts.length;
        });
      }, 3000);
    } else {
      setCurrentTextIndex(0);
    }

    return () => {
      clearInterval(textInterval);
    };
  }, [isLoading]);

  return (
    <Box>
      {isLoading && progress < 100 ? (
        <Box>
          <p>{texts[currentTextIndex]}</p>
          <ProgressBarContainer>
            <LinearProgress variant="determinate" value={progress} />
          </ProgressBarContainer>
        </Box>
      ) : progress >= 100 ? (
        <Box>
          <CheckCircleOutlineIcon color="success" fontSize="large" />
          <p>Account setup successful</p>
          <ProgressBarContainer>
            <ColorLinearProgress variant="determinate" value={100} />
          </ProgressBarContainer>
        </Box>
      ) : (
        <Box />
      )}
    </Box>
  );
}

export default LoadingAnimation;
