import { setupUsersService } from '@serverom/services/users';
import { setupAuthenticationService } from '@serverom/services/authentication';
import { setupFeaturesService } from '@serverom/services/features';
import { setupNotificationsService } from '@serverom/services/notifications';
import { setupDatasetsService } from '@serverom/services/datasets';
import { Application } from '@serverom/common/types';
import { setupPipelineService } from '@serverom/services/pipelines';

export const setupServices = (app: Application) => {
  [
    setupAuthenticationService,
    setupUsersService,
    setupFeaturesService,
    setupNotificationsService,
    setupDatasetsService,
    setupPipelineService,
  ].forEach(app.configure.bind(app));
};
