
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// theme.js ghi de layout cho nhat quan
// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight:'58px',
    boardBarHeight: '60px'
  },
  // colorSchemes: {
  //   light: {
  //     palette: {
  //       primary: teal,
  //       secondary: deepOrange
  //     }
  //   },
  //   dark: {
  //     palette: {
  //       primary: cyan,
  //       secondary:orange
  //     }
  //   }
  // },
  components: {
    MuiCssBaseline:{
      styleOverrides: {
        body:{
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#2c3e50'
          }
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform:'none',
          borderWidth: '1px',
          '&:hover': { borderWidth: '2px' }
        }
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root:({theme}) =>({
          // color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme })=>{
          return {
            // color: theme.palette.primary.main,
            fontSize: '0.875rem',
            // '.MuiOutlinedInput-notchedOutline':{ // custom border textfield
            //   borderColor: theme.palette.primary.light
            // },
            // '&:hover':{
            //   '.MuiOutlinedInput-notchedOutline':{ // custom border textfield
            //     borderColor: theme.palette.primary.main
            //   }
            // }
            '& fieldset': {
              borderWidth: '1px !important'
            },
            '&:hover fieldset': {
              borderWidth: '2px !important'
            },
            '&:Mui-focused fieldset': {
              borderWidth: '2px !important'
            }
          }
        }
      }
    }
  }
  // ...other properties
})

export default theme