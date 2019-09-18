const pg = require("pg");
const config = {
  user: "postgres",
  database: "postgres",
  password: "changeme",
  port: 5432
};

const pool = new pg.Pool(config);

// pool shutdown
// pool.end()

exports.searchByName = name =>
  new Promise((resolve, reject) => {
    pool.connect(async (err, client, done) => {
      if (err) {
        reject(err);

        return done();
      }

      const { rows } = await client.query(`
        SELECT *
        FROM historyrecord
        WHERE name like '${name}'
      `);

      resolve(rows);
      done();
    });
  });

exports.searchByName("kelvin").then(console.log);

exports.searchByVehicle = vehicleId =>
  new Promise((resolve, reject) => {
    pool.connect(async (err, client, done) => {
      if (err) {
        reject(err);

        return done();
      }
      const { rows } = await client.query(
        `SELECT * FROM historyrecord WHERE vehicleid like '${vehicleId}' `
      );

      resolve(rows);
      done();
    });
  });
