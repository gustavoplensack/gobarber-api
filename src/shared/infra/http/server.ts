import express from 'express';
import routes from '@shared/infra/http/routes/index';
import cors from 'cors';

import '@shared/infra/typeorm';
import uploadConfig from '@config/upload';
import '@shared/container';

const app = express();

// Using cors to restrict web frontend access
app.use(cors());

/**
 * Allowing usage of json data in the returns
 */
app.use(express.json());

/*
 * Using static files
 */
app.use('/files', express.static(uploadConfig.dir));

/*
 * Using custom routes
 */
app.use(routes);

app.listen(3333, () => {
  console.log('Server running on port 3333!');
});
