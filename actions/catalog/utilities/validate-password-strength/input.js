const nodeInput = ({ $body, $headers, $env, $actions }) => {
  return {
    password: "er6Yu8&io5jhwbj*12", // Required

    minLength: 8, // Required - The minimum length of the password
    requireUpperCase: true, // Required - Should require at least one upper case letter
    requireLowerCase: true, // Required - Should require at least one lower case letter
    requireSpecialChar: false, // Required - Should require at least one special character
    requireNumber: true, // Required - Should require at least one number
  };
};
