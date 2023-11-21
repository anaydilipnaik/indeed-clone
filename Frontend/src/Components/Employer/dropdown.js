import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function MultipleSelectPlaceholder() {
  const [value, setValue] = React.useState('');
  // const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    
    // setError(false);

    if (value === 'in person') {
      setHelperText(
        <div>
        <Typography
                sx={{ fontSize: 14, }}
                color="text.secondary"
                gutterBottom
              >
          <strong>Street Address: </strong>
        </Typography>
        <OutlinedInput
          required
        />
      </div>
      );
      // setError(false);
    } else if (value === 'remote') {
      setHelperText('Sorry, wrong answer!');
      // setError(true);
    }
    // else {
    //   setHelperText('Please select an option.');
    //   setError(true);
    // }
  };

  

  return (
    // <form onSubmit={handleSubmit}>
      // <FormControl
      //   sx={{ m: 3 }}
      //   component="fieldset"
      //   error={error}
      //   variant="standard"
      // >
    <div>
        <Typography
          sx={{ fontSize: 14, }}
          color="text.secondary"
          gutterBottom
        >
          <strong>Which option best describes this role's location?</strong>
        </Typography>
        <RadioGroup
          aria-label="quiz"
          name="quiz"
          value={value}
          onClick={handleRadioChange}
        >
          <Box sx={{ border: 1, borderRadius: 2}}>
            <FormControlLabel value="in person" control={<Radio />} label="in person" />
          </Box>
          <Box sx={{ border: 1, borderRadius: 2 }}>
          <FormControlLabel value="remote" control={<Radio />} label="remote" defaultChecked/>
          </Box>
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        
      </div>
  );
}
