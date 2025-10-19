import logger from '#config/logger.js';
import { formatValidationError } from '#utils/format.js';
import { signupSchema } from '#validations/auth.validations.js';
import { createUser } from '#services/auth.service.js';
import { jwttoken } from '#utils/jwt.js';
import { cookies } from '#utils/cookies.js';

export const signup = async (req, res, next) => {
    try {
        const validationResult = signupSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                error: 'Validation Failed',
                details: formatValidationError(validationResult.error)
            });
        }

        const { name, email, role } = validationResult.data;

        const user = await createUser({ name, email, password: req.body.password, role });

        const token = jwttoken.sign({ id: user.id, email: user.email, role: user.role });

        cookies.set(res, 'token', token);

        logger.info(`User registered successfully: ${email}`);

        res.status(201).json({
            message: 'User registered',
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        logger.error('Sign-up Error', error);

        if (error.message === 'User with this email already exists') {
            return res.status(409).json({ error: 'Email already exists' });
        }

        next(error); // now works
    }
};
