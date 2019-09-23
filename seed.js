const { Tables, query } = require("./dal");

// @ts-check
const DDL = `
  DROP TABLE IF EXISTS ${Tables.History};
  DROP TABLE IF EXISTS ${Tables.Vehicle};
  DROP TABLE IF EXISTS ${Tables.Driver};

  CREATE TABLE ${Tables.Driver} (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
  );

  CREATE TABLE ${Tables.Vehicle} (
    reg TEXT PRIMARY KEY,
    type TEXT NOT NULL
  );

  CREATE TABLE ${Tables.History} (
    id SERIAL PRIMARY KEY,
    driver_id INT,
    CONSTRAINT driver FOREIGN KEY (driver_id) REFERENCES driver(id),
    vehicle_reg TEXT,
    CONSTRAINT vehicle FOREIGN KEY (vehicle_reg) REFERENCES vehicle(reg),
    coordinate POINT NOT NULL,
    -- check_out TIMESTAMP NOT NULL, -- if not checked out then current location
    check_in TIMESTAMP NOT NULL
  );
`;

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
  .map(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return {
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
      },
      checkIn: faker.date.between(startOfDay, endOfDay).toISOString()
    };
  });

const DATA = `
  INSERT INTO ${Tables.Driver}
    (first_name, last_name)
  VALUES ${drivers
    .map(driver => `('${driver.firstName}', '${driver.lastName}')`)
    .join(",")};

  INSERT INTO ${Tables.Vehicle}
    (reg, type)
  VALUES ${vehicles
    .map(vehicle => `('${vehicle.reg}', '${vehicle.type}')`)
    .join(",")};

  INSERT INTO ${Tables.History}
    (driver_id, vehicle_reg, check_in, coordinate)
  VALUES ${history
    .map(
      record =>
        `(${record.driverId}, '${record.vehicleReg}', '${record.checkIn}', POINT(${record.coordinate.x}, ${record.coordinate.y}))`
    )
    .join(",")};
`;

query(`
  ${DDL}
  ${DATA}
`).catch(console.error);
