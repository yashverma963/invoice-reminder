// import React from 'react';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// const Login = ({ setUser }) => {
//   const handleLogin = async (credentialResponse) => {
//     try {
//       const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, {
//         token: credentialResponse.credential
//       }, {
//         withCredentials: true,
//       });
//       setUser(res.data);
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//       <div>
//         <h2>Login with Google</h2>
//         <GoogleLogin
//           onSuccess={handleLogin}
//           onError={() => console.error('Login Failed')}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default Login;

import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = ({ setUser }) => {
  const handleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, {
        token: credentialResponse.credential
      }, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div>
        <h2>Login with Google</h2>
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => console.error('Login Failed')}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
