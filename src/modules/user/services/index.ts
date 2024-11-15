// services
import { AuthService } from './authService';
import { UserService } from './userService';

// ----------------------------------------------------------------------

const authService = new AuthService();

const userService = new UserService();

export { authService, userService };
