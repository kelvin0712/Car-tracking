// data access layer

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

const FIELDS = `
  location_history.id as id,
  first_name as "firstName",
  last_name as "lastName",
  reg as "vehicleRegId",
  type as "vehicleType",
  coordinate
`;

exports.searchByName = name =>
  new Promise((resolve, reject) => {
    pool.connect(async (err, client, done) => {
      if (err) {
        reject(err);

        return done();
      }

      const { rows } = await client.query(`
        SELECT ${FIELDS}
        FROM location_history
        JOIN driver ON driver_id = driver.id
        JOIN vehicle ON vehicle_reg = reg
        ${
          name
            ? `WHERE
              first_name like '${name}' OR
              last_name like '${name}'
            `
            : ""
        }
      `);

      resolve(rows);
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

      const { rows } = await client.query(`
        SELECT ${FIELDS}
        FROM location_history
        JOIN driver ON driver_id = driver.id
        JOIN vehicle ON vehicle_reg = reg
        ${vehicleId ? `WHERE reg = '${vehicleId}'` : ""}
      `);

      resolve(rows);
      done();
    });
  });
