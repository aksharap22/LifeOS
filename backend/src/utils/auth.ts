import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env['JWT_SECRET'] || 'secret', {
    expiresIn: '30d',
  });
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
