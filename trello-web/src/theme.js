import { cyan, deepOrange, orange, teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  trello:{
    appBarheight: '48px',
    boarBarHeight: '58px'
  },
  colorSchemes: { 
    light: {
        palette: {
            primary: teal,
            secondary: deepOrange
        },
      },
      dark: {
        palette: {
          primary: cyan,
          secondary: orange
        },
      },
   },
  cssVariables:{
    colorSchemeSelector: 'class',
  }

});

export default theme;
// CSS Result
//.light { ... }
// .dark { ... }