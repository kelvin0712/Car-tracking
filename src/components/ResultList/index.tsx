import React from 'react';
import { HistoryRecord } from '../../api';
import './ResultList.scss';

/**
 * Display list of history events
 * @param historyRecords 
 */
export default (props: {
  historyRecords: HistoryRecord[]
}) =>
  <div>
    {props.historyRecords.map(record => {
      const { checkedInTimeStamp } = record
      const date = new Date(checkedInTimeStamp)

      return <div key={record.id} className="card-container">
        {record.firstName} {record.lastName}<br />
        {date.getDate()}/{date.getMonth()} -
        {date.getHours()}:{date.getMinutes()}
      </div>
    })}
  </div>
