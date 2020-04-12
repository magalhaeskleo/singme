import React, { useState } from 'react';
import { grey, orange } from '@material-ui/core/colors';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import 'moment/locale/pt';
import MomentUtils from '@date-io/moment';

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: grey['900'],
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: orange.A200,
        // color: 'white',
      },
    },
    MuiPickersBasePicker: {
      pickerView: {
        color: 'white',
      },
      container: {
        backgroundColor: grey['800'],
      },
    },
    MuiTypography: {
      color: orange.A200,
    },

    MuiPickersYear: {
      yearSelected: {
        color: orange.A700,
      },
      root: {
        '&:focus': {
          color: orange.A700,
        },
      },
    },
  },
});

function CssOverrides() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={'pt'}>
      <ThemeProvider theme={materialTheme}>
        <DatePicker
          label="Light blue picker"
          value={selectedDate}
          onChange={handleDateChange}
          variant="static"
          orientation="landscape"
          views={['year']}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default CssOverrides;
