export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#?!@$ %^&*-])[A-Za-z\d#?!@$ %^&*-]/;
export const usernameRegex = /^[a-z0-9_-]*$/;
export const emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
export const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%_+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)$/;
export const singleUrlRegex = /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%_+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()!@:%_+.~#?&//=]*)/g;
