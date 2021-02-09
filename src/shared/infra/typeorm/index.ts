import { createConnections } from 'typeorm';

/**
 * No credentials are required here, they are being imported
 * from the ormconfig.json file
 */
createConnections();
