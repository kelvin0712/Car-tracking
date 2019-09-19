export type HistoryRecord = {
  id: string
  name: string
  vehicleid: string
  coordinate: [number, number]
  time: Date
}

export const searchByName = (name: string): Promise<HistoryRecord[]> => {
  return fetch(`http://localhost:8080/drivers/${name}`).then(res => res.json())
}

export const searchByVehicle = (vehicleid: string): Promise<HistoryRecord[]> => {
  return fetch(`http://localhost:8080/vehicles/${vehicleid}`).then(res => res.json())
}