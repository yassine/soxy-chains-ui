import gulpRequireTasks from 'gulp-require-tasks';
import config from 'project.config';

gulpRequireTasks({
  path: config.buildGoalsPath,
});
