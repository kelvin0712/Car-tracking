export type HistoryRecord = {
  driverId: string
  driverName: string
  vehicleId: string
  coordinates: [number, number]
  time: Date
}

export const searchByName = (name: string): Promise<HistoryRecord[]> => {
  return fetch(`http://localhost:8080/${name}`).then(res => res.json())
}

export const searchByVehicle = (vehicleId: string): Promise<HistoryRecord[]> => {
  return fetch(`http://localhost:8080/${vehicleId}`).then(res => res.json())
}