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
      const result = await client.query(`
      SELECT *
      WHERE drivername like ${name}
      FROM historyrecord
    `);

      resolve(result);
      done();
    });
  });

exports.searchByVehicle = vehicleId =>
  new Promise((resolve, reject) => {
    pool.connect(async (err, client, done) => {
      if (err) {
        reject(err);

        return done();
      }
      const result = await client.query(
        `SELECT * WHERE vehicleid like ${vehicleId} FROM historyrecord`
      );

      resolve(result);
      done();
    });
  });
