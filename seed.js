// @ts-check
exports.HISTORY = "location_history";
exports.DRIVER = "driver";
exports.VEHICLE = "vehicle";

const DDL = `
  DROP TABLE IF EXISTS ${exports.HISTORY};
  DROP TABLE IF EXISTS ${exports.DRIVER};
  DROP TABLE IF EXISTS ${exports.VEHICLE};

  CREATE TABLE ${exports.DRIVER} (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
  );

  CREATE TABLE ${exports.VEHICLE} (
    reg TEXT PRIMARY KEY,
    type TEXT NOT NULL
  );

  CREATE TABLE ${exports.HISTORY} (
    id SERIAL PRIMARY KEY,
    driver_id INT,
    CONSTRAINT driver FOREIGN KEY (driver_id) REFERENCES driver(id),
    vehicle_reg TEXT,
    CONSTRAINT vehicle FOREIGN KEY (vehicle_reg) REFERENCES vehicle(reg),
    coordinate POINT NOT NULL
  );
`
  .trim()
  .replace(/\n/g, " ");

const DRIVERS = 4;
const VEHICLES = 4;
const RECORDS = 50;
const BOUND = [
  { x: -37.756778, y: 144.904516 },
  { x: -37.831656, y: 145.071705 }
];

const faker = require("faker");

const drivers = Array(DRIVERS)
  .fill(null)
  .map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }));

const vehicles = Array(VEHICLES)
  .fill(null)
  .map(() => ({
    reg: faker.random.word(),
    type: faker.commerce.product()
  }));

const lat = _ => _.x;
const long = _ => _.y;

const history = Array(RECORDS)
  .fill(null)
  .map(() => ({
    driverId: faker.random.number({ min: 1, max: DRIVERS }),
    vehicleReg: vehicles[faker.random.number(VEHICLES - 1)].reg,
    coordinate: {
      x: faker.random.number({
        min: Math.min(...BOUND.map(lat)),
        max: Math.max(...BOUND.map(lat)),
        precision: 0.01
      }),
      y: faker.random.number({
        min: Math.min(...BOUND.map(long)),
        max: Math.max(...BOUND.map(long)),
        precision: 0.01
      })
    }
  }));

const DATA = `
  INSERT INTO ${exports.DRIVER}
    (first_name, last_name)
  VALUES ${drivers
    .map(driver => `('${driver.firstName}', '${driver.lastName}')`)
    .join(",")};

  INSERT INTO ${exports.VEHICLE}
    (reg, type)
  VALUES ${vehicles
    .map(vehicle => `('${vehicle.reg}', '${vehicle.type}')`)
    .join(",")};

  INSERT INTO ${exports.HISTORY}
    (driver_id, vehicle_reg, coordinate)
  VALUES ${history
    .map(
      record =>
        `(${record.driverId}, '${record.vehicleReg}', POINT(${record.coordinate.x}, ${record.coordinate.y}))`
    )
    .join(",")};
`
  .trim()
  .replace(/\n/g, " ");

const { execSync } = require("child_process");

execSync(
  `docker exec postgres_container /usr/bin/psql -d postgres -U postgres -c "${DDL}${DATA}"`,
  { stdio: "inherit" }
);
