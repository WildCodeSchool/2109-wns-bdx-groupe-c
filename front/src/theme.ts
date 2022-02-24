import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f4473',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#061B2E',
          color: 'white',
        },
      },
    },
  },
})

export default theme
