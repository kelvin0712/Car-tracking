export type HistoryRecord = {
  id: number
  coordinate: { x: number, y: number }
  lastName: string
  firstName: string
  vehicleRegId: string
  vehicleType: string
}

export const searchByName = (name: string): Promise<HistoryRecord[]> =>
  fetch(`http://localhost:8080/drivers/${name}`)
    .then(res => res.json())

export const searchByVehicle = (vehicleid: string): Promise<HistoryRecord[]> =>
  fetch(`http://localhost:8080/vehicles/${vehicleid}`)
    .then(res => res.json())
