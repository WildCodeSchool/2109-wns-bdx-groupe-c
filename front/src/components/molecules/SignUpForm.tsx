import { makeStyles } from '@mui/material'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
const useStyles = makeStyles({})
const SignUpForm = () => {
  const classes = useStyles

  return (
    <Box>
      <form>
        <TextField />
        <Input />
        <Input />
      </form>
    </Box>
  )
}
export default SignUpForm
