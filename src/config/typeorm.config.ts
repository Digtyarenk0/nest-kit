import { DataSource } from 'typeorm';

import configuration from './configuration';

const dataSource: DataSource = new DataSource({
  ...configuration().database.connection,
});

export default dataSource;
