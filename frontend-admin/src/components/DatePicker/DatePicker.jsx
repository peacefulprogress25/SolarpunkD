import { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

const DatePicker = ({ label, change }) => {
  const [value, setValue] = useState("");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label={label}
        value={value}
        onChange={(newValue) => {
          let time = new Date(newValue);
          setValue(time);
          change(Date.parse(time) / 1000);
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
