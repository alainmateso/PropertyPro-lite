import queries from '../database/queries';

import QueryExecutor from '../database/queryExecutor';

const { queryExecutor } = QueryExecutor

const { dropPropertyTable, dropUserTable, createPropertyTable, createUserTable } = queries


const db_init = async () => {
  try {
    await queryExecutor(dropPropertyTable);
  } catch (error) {
    console.log(error)
  }

  await queryExecutor(dropUserTable);
  try {
    await queryExecutor(createPropertyTable);
  } catch (error) {
    console.log(error)
  }
  await queryExecutor(createUserTable);

  return;
}

db_init()
