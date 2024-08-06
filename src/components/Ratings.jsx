import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { ThemeContext } from '../themeContext';

export default function BasicRating() {
  const [value, setValue] = React.useState(2);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <h2 className="text-lg font-bold mb-4 text-white text-start dark:text-black">Rate Canteen</h2>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        size='large'
      />
    </Box>
  );
}
