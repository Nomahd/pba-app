import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
  return await new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (e, salt) => {
      bcrypt.hash(password, salt, (e, hash) => {
        resolve(hash);
      });
    });
  });
};
