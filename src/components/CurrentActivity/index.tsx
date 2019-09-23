import React from 'react'
import { HistoryRecord } from '../../api';

interface Props extends HistoryRecord {
  onClick(): void
}

export default (props: Props) => {
  const { checkedInTimeStamp } = props
  const date = new Date(checkedInTimeStamp)

  return <div>
    Currently:<br />
    Vehicle registrationId: {props.vehicleRegId}<br />
    <button onClick={props.onClick}>
      Last checked-in:
      {date.getDate()}/{date.getMonth()} -
      {date.getHours()}:{date.getMinutes()}
    </button>
  </div>
}