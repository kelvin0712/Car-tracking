import React from 'react';
import { HistoryRecord } from '../../api';
import './ResultList.scss';

/**
 * Display list of history events
 */
export default (props: {
  historyRecords: HistoryRecord[]
}) => <div>
  {props.historyRecords.map(record =>
    <div key={record.id} className="card-container">
      <p> Driver Name: {record.firstName} {record.lastName}</p>
    </div>
  )}
</div>
