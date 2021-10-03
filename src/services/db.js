import knex from 'knex';

export const sqliteDB = knex({
  client: 'sqlite3',
  connection: { filename: './midbligera.sqlite' },
  useNullAsDefault: true,
});

export const mySQLDB = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'myapp_test',
  },
  pool: { min: 0, max: 7 },
});

sqliteDB.schema.hasTable('mensajes').then((exists) => {
  if (!exists) {
    console.log('NO EXISTE LA TABLA CARS. VAMOS A CREARLA');
    sqliteDB.schema
      .createTable('mensajes', (table) => {
        table.increments('id');
        table.string('username');
        table.string('text');
        table.dateTime('time');
      })
      .then(() => {
        console.log('SqLite DONE');
      });
  }
});

mySQLDB.schema.hasTable('productos').then((exists) => {
  if (!exists) {
    console.log('NO EXISTE LA TABLA productos. VAMOS A CREARLA');
    mySQLDB.schema
      .createTable('productos', (productosTable) => {
        productosTable.increments();
        productosTable.string('title').notNullable();
        productosTable.decimal('precio', 4, 2);
        productosTable.string('thumbnail').notNullable();
      })
      .then(() => {
        console.log('SQLDB DONE');
      });
  }
});