import argon2 from 'argon2';

class Argon2Password {

  static hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1
  };

  static verifyPassword = (password: string, hashedPassword: string) => {
    return argon2.verify(password, hashedPassword, this.hashingOptions);
  };

  static hashPassword = (password: string) => {
    return argon2.hash(password, this.hashingOptions);
  };
}

export default Argon2Password;