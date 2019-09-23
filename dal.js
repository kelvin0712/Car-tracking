// data access layer

const pg = require("pg");
const config = {
  user: "postgres",
  database: "postgres",
  password: "changeme",
  port: 5432
};

const CONN_POOL = new pg.Pool(config);
const Tables = {
  History: "location_history",
  Vehicle: "vehicle",
  Driver: "driver"
};

// pool shutdown
// pool.end()

const FIELDS = `
  location_history.id AS id,
  first_name AS "firstName",
  last_name AS "lastName",
  check_in AS "checkedInTimeStamp",
  reg AS "vehicleRegId",
  type AS "vehicleType",
  coordinate
`;

const JOIN_QUERY = `
  SELECT ${FIELDS}
  FROM ${Tables.History}
  JOIN driver ON driver_id = driver.id
  JOIN vehicle ON vehicle_reg = reg
`;

const query = async sql =>
  new Promise((resolve, reject) => {
    CONN_POOL.connect(async (err, client, done) => {
      if (err) {
        return reject(err);
      }

      try {
        const { rows } = await client.query(sql);
        resolve(rows);
      } catch (err) {
        reject(err);
      } finally {
        done(true);
      }
    });
  });

const searchByName = name =>
  query(`
  ${JOIN_QUERY}
  ${
    name
      ? `WHERE
        first_name = '${name}' OR
        last_name = '${name}'
      `
      : ""
  }
  ORDER BY check_in DESC
`);

const searchByVehicle = vehicleId =>
  query(`
  ${JOIN_QUERY}
  ${vehicleId ? `WHERE reg = '${vehicleId}'` : ""}
  ORDER BY check_in DESC
`);

module.exports = {
  searchByVehicle,
  searchByName,
  Tables,
  query
};
