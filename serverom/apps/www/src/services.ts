import { setupUsersService } from '@serverom/services/users';
import { setupAuthenticationService } from '@serverom/services/authentication';
import { Application } from '@serverom/common/types';

export const setupServices = (app: Application) => {
  [setupUsersService, setupAuthenticationService].forEach(
    app.configure.bind(app)
  );
};
