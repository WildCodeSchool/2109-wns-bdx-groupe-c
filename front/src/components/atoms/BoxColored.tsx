import Box from '@mui/material/Box'
import { makeStyles } from "@mui/styles"


const useStyles = makeStyles({
  mainContainer: {
    minHeight: '150px',
    borderRadius: '20px',
  },
  colorHighlited: {
    minHeight: '20px',
    borderRadius: '100px 0 0 0',
    maxWidth: '220px',
    position: 'relative',
    left: '-1px',
    top: '-1px',
  },
  content: {
    paddingTop: '0.3rem',
    paddingLeft: '1rem',
  }
})



interface Props {
  color: string,
  children: any,
  className?: string,
}

const BoxColored = (props: Props) => {
  const classes = useStyles()
  const { color, children, className } = props;

  return (
    <Box className={className}>
      <Box className={classes.mainContainer} sx={{
        border: `1px solid ${color}`,
      }}>
      <Box className={classes.colorHighlited} sx={{
        backgroundColor: color,
      }}>
      </Box>
      <Box className={classes.content}>
          {children}
      </Box>
    </Box>
    </Box>
  )
}
export default BoxColored
