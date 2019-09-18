export type HistoryRecord = {
  id: string
  name: string
  vehicleid: string
  coordinate: [number, number]
  time: Date
}

export const searchByName = (name: string): Promise<HistoryRecord[]> => {
  return fetch(`http://localhost:8080/${name}`).then(res => res.json())
}

export const searchByVehicle = (vehicleId: string): Promise<HistoryRecord[]> => {
  return fetch(`http://localhost:8080/${vehicleId}`).then(res => res.json())
}