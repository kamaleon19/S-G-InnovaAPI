import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces';

// Este decorador contiene los roles permitidos en nuestra app.

export const META_ROLES = 'roles'

export const RoleProtected = (...args: ValidRoles[]) => {

    return SetMetadata(META_ROLES, args);
}
