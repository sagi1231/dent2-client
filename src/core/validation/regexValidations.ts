const RegexValidations = {
  url: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
  domain: /^(?:\*\.)?[a-z0-9]+(?:[\-.][a-z0-9]+)*\.[a-z]{2,6}$/,
};

export default RegexValidations;
