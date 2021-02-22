import { errors } from 'celebrate';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import '@shared/infra/typeorm';
import routes from '@shared/infra/http/routes/index';
import '@shared/container';
import uploadConfig from '@config/upload';

const app = express();

// Using cors to restrict web frontend access
app.use(cors());

app.use(errors());
/**
 * Allowing usage of json data in the returns
 */
app.use(express.json());

/*
 * Using static files
 */
app.use('/files', express.static(uploadConfig.uploadsFolder));

/*
 * Using custom routes
 */
app.use(routes);

app.listen(3333, () => {
  console.log('Server running on port 3333!');
});
