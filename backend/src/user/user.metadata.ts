import { SetMetadata } from '@nestjs/common';
import { TOKEN_SERVICE } from './user.constancts';


export const InjectAuthService = () => SetMetadata(TOKEN_SERVICE, true);