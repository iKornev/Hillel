const validateUser = (user) => {
    const errors = {};
  
    if (!user.name || user.name.length < 3 || user.name.length > 50) {
      errors.name = 'Ім\'я повинне бути від 3 до 50 символів';
    }
  
    if (!user.email || !/\w+@\w+\.\w+/.test(user.email)) {
      errors.email = 'Невірний формат email';
    }
  
    if (!user.password || user.password.length < 6) {
      errors.password = 'Пароль повинен бути не менше 6 символів';
    }
  
    
  
    return errors;
  };
  
  module.exports = validateUser;
  