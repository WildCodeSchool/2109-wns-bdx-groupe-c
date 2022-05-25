import { createTheme } from '@mui/material/styles'

declare module '@mui/material' {
  interface Color {
    main: string
    purple?: string
    yellow?: string
    green?: string
    cyan?: string
    whiteText?: string
  }
  interface PaletteColor {
    main: string
    purple?: string
    yellow?: string
    green?: string
    cyan?: string
    whiteText?: string
  }
}

const theme = createTheme({
  palette: {
    secondary: {
      main: '#061B2E',
      purple: '#A5A6F6',
      yellow: '#E9FF63',
      green: '#1AE46B',
      cyan: '#10CEC3',
      whiteText: '#ffffff',
    },
  },
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
