export interface HistoryRecord {
  id: number
  coordinate: { x: number, y: number }
  lastName: string
  firstName: string
  vehicleRegId: string
  vehicleType: string
  checkedInTimeStamp: string
}

/**
 * @param name {string} the driver's first name or last name
 */
export const searchByName = async(name: string): Promise<HistoryRecord[]> =>
  fetch(`http://localhost:8080/drivers/${name}`)
    .then(res => res.json())

/**
 * @param vehicleId {string} the vehicle registration id
 */
export const searchByVehicle = (vehicleId: string): Promise<HistoryRecord[]> =>
  fetch(`http://localhost:8080/vehicles/${vehicleId}`)
    .then(res => res.json())
