import React from 'react';
import { HistoryRecord } from '../../api';

/**
 * Display list of history events
 */
export default (props: {
  historyRecords: HistoryRecord[]
}) => <div>
  {props.historyRecords.map(record =>
    <div key={record.id}>
      <p> Driver Name: {record.firstName}</p>
    </div>
  )}
</div>
