// import React from 'react';
// import { Link } from 'react-router-dom';
// import logout from '../../services/logout';
// import { useNavigate } from 'react-router-dom';
// import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
// import { styled } from '@mui/system';
// import Logo from '../../mockup/asset/Fable-06.png';
// import { AccountCircle } from '@mui/icons-material';
// import { CometChat } from "@cometchat-pro/chat";

// const NavLink = styled(Link)(({ theme }) => ({
//   textDecoration: 'none',
//   color: 'inherit',
// }));

// const Layout = ({ children, user }) => {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   React.useEffect(() => {
//     if (user) {
//       setAnchorEl(null);
//     }
//   }, [user]);

//   const handleLogout = async () => {
//     try {
//       const signOut = logout();
//       await signOut();
//       try {
//         await CometChat.logout()
//         console.log("CometChat Logout successful");
//       } catch (error) {
//         console.log("ComeChat logout failed with exception: ", error);
//       }
//       navigate('/');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleViewProfile = () => {
//     navigate('/user');
//     handleMenuClose();
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row', // Change to 'row' to create a left-side column
//         height: '100%',
//       }}
//     >
//       {/* Navigation Bar */}
//       <Box
//         sx={{
//           backgroundColor: '#202124',
//           width: '200px', // Set the width of the left column
//           paddingTop: '48px', // Adjust this as needed
//           borderRight: '1px solid #ccc', // Add a border to separate it from content
//           position: 'fixed',
//           height: '100%'
//         }}
//       >
//         <NavLink to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginLeft: '15px' }}>
//           <img src={Logo} alt="logo" style={{ height: '25px' }} />
//         </NavLink>
//         {user && (
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
//             <IconButton color="inherit" onClick={handleMenuOpen} size="small">
//               <AccountCircle />
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'right',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//             >
//               <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </Box>
//         )}
//       </Box>

//       {/* Content */}
//       <Box sx={{ flexGrow: 1, padding: '20px' }}>{children}</Box>
//     </Box>
//   );
// };

// export default Layout;







import React from 'react';
import { Link } from 'react-router-dom';
import logout from '../../services/logout';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import Logo from '../../mockup/asset/Fable-06.png';
import { AccountCircle } from '@mui/icons-material';
import { CometChat } from "@cometchat-pro/chat";

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
}));

const Layout = ({ children, user }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    if(user) {
      setAnchorEl(null);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const signOut = logout();
      await signOut();
      try {
        await CometChat.logout()
        console.log("CometChat Logout successful");
      } catch(error) {
        console.log("ComeChat logout failed with exception: ". error);
      }
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    navigate('/user');
    handleMenuClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ overflow: 'hidden', backgroundColor: '#202124'}}>
        <Toolbar sx={{ minHeight: '48px', maxHeight: '48px', width: '100%', maxWidth: '100%'}}>
          <NavLink to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginLeft: '15px' }}>
            <img src={Logo} alt="logo" style={{ height: '25px' }} />
          </NavLink>
          <Box sx={{ flexGrow: 1 }} />
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
              <IconButton color="inherit" onClick={handleMenuOpen} size="small">
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 2, flexGrow: 1 }}>{children}</Box>
    </Box>
  );
};

export default Layout;
