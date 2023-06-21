import jwt_decode from 'jwt-decode';

export const isTokenExpired = (token: string) => {
  try {
    const decodedToken: any = jwt_decode(token);
    if (decodedToken && typeof decodedToken.exp === 'number') {
      const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
      return decodedToken.exp < currentTime; // Check if the expiration time is earlier than the current time
    }
  } catch (error) {
    // Handle any decoding errors here
    console.error('Error decoding JWT token:', error);
    return true;
  }
};
