// src/compiler/application_properties_compiler.ts
import * as fs from 'fs';
import * as path from 'path';
import { TEMPLATE_DIR, RESOURCES_FILES_DIR } from '../../constants';

export function compileApplicationProperties(setupConfig: any) {
  const appPropertiesTemplatePath = path.join(TEMPLATE_DIR, 'application.properties');
  let appPropertiesTemplate = fs.readFileSync(appPropertiesTemplatePath, 'utf8');

  const replacements = {
    '{{PORT}}': setupConfig.port,
    '{{APP_NAME}}': setupConfig.app_name,
    '{{DB_URL}}': setupConfig.db_url,
    '{{DB_USERNAME}}': setupConfig.db_username,
    '{{DB_PASSWORD}}': setupConfig.db_password,
  };

  for (const [placeholder, value] of Object.entries(replacements)) {
    appPropertiesTemplate = appPropertiesTemplate.replace(placeholder, String(value));
  }

  const appPropertiesOutputPath = path.join(RESOURCES_FILES_DIR, 'application.properties');
  fs.mkdirSync(RESOURCES_FILES_DIR, { recursive: true });
  fs.mkdirSync(`${RESOURCES_FILES_DIR}/static`, { recursive: true });
  fs.mkdirSync(`${RESOURCES_FILES_DIR}/templates`, { recursive: true });
  fs.writeFileSync(appPropertiesOutputPath, appPropertiesTemplate, 'utf8');
  console.log(`Generated: ${appPropertiesOutputPath}`);
}
