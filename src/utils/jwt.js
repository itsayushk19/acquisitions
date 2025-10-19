import jwt from 'jsonwebtoken';
import logger from '#config/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const jwttoken = {
  sign: (payload) => {
    try{
      return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    }
    catch(err){
      logger.error('Failed to auth token', err);
    }
  },
  verify: (token) => {
    try{
      return jwt.verify(token, JWT_SECRET);
    } catch(err){
      logger.error('Token verification failed', err);
    }   
  }
};