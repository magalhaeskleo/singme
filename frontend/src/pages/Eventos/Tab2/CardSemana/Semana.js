import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'moment/locale/pt';

import MomentUtils from '@date-io/moment';

export default function ListaDayDow({ callbackDate }) {
  const [selectedDate, handleDateChange] = useState(new Date());

  function handleChange(data) {
    handleDateChange(data);
    callbackDate(data);
  }
  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={'pt'}>
      <DatePicker
        value={selectedDate}
        onChange={handleChange}
        variant="static"
        orientation="portrait"
      />
    </MuiPickersUtilsProvider>
  );
}
