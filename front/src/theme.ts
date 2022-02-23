import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#7273FF',
        },
      },
    },
  },
})

export default theme
