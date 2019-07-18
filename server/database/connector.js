import queries from '../database/queries';
import moment from 'moment';

import QueryExecutor from '../database/queryExecutor';

const { queryExecutor } = QueryExecutor

const { dropPropertyTable, dropUserTable, createPropertyTable, createUserTable, createUserAdmin, postNewProperty } = queries

const newUser = [
  'admin@demo.com',
  'Admin',
  'admin',
  'qwertyuiop',
  '0780000000',
  'Telecom House',
  true,
];

const property = [
  '1',
  2000,
  'Rwanda',
  'Kigali',
  'KN 130 st',
  '3 bedroom',
  moment().format(),
  'https://res.cloudinary.com/codeal/image/upload/v1562164635/sample.jpg',
];

const db_init = async () => {
  console.log('Initiating the database. Please wait...');
  try {
    await queryExecutor(dropPropertyTable);
    await queryExecutor(dropUserTable);
    await queryExecutor(createUserTable);
    await queryExecutor(createPropertyTable);
    await queryExecutor(createUserAdmin, newUser);
    await queryExecutor(postNewProperty, property);
  } catch (error) {
    throw error;
  }
  return;
}

(async () => {
  await db_init();
})().catch((error) => {
  console.log(error);
});
