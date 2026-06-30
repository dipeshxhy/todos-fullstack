export const getUserDetails = () => {
  const userDetails = localStorage.getItem('todoAppUser');
  return userDetails ? JSON.parse(userDetails) : null;
};
