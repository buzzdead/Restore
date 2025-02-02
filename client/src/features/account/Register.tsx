import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Button, Paper, Switch } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import agent from '../../app/api/agent'
import { toast } from 'react-toastify'
import { useState } from 'react'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Render from '../../app/layout/Render'
import { GoogleLogin } from '@react-oauth/google';
import { createTestAdmin, signInUserWithGoogle } from './accountSlice'
import { useAppDispatch } from 'app/store/configureStore'
import useView from 'app/hooks/useView'

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const view = useView()
  const [testAdmin, setTestAdmin] = useState(false)
  const {
    register,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'all',
  })

  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes('Password')) {
          setError('password', { message: error })
        } else if (error.includes('Email')) {
          setError('email', { message: error })
        } else if (error.includes('Username')) {
          setError('username', { message: error })
        }
      })
    }
  }

  const responseMessage = async (response: any) => {
    try {
      await dispatch(signInUserWithGoogle(response.credential))
      navigate(location.state?.from?.pathname || '/catalog')
    }
    catch (error) {
      console.log(error)
    }
};
const errorMessage = () => {
    console.log("error");
};

const newAdmin = async () => {
  try {
    await dispatch(createTestAdmin({arguments: undefined}))
    navigate(location.state?.from?.pathname || '/catalog')
  }
  catch (error) {
    console.log(error)
  }
}
  return (
    <Container
      component={Paper}
      maxWidth='sm'
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}
    >
      <Avatar sx={{ m: 1, bgcolor: testAdmin ? 'primary.main' : 'secondary.main' }}>
        <Render condition={testAdmin}>
        <SupervisorAccountIcon />
        <LockOutlinedIcon />
        </Render>
      </Avatar>
      <Typography component='h1' variant='h5' marginBottom={2}>
        Register
      </Typography>
      <Box gap={2} maxHeight={{xs: 30, sm: 39}} minHeight={{xs: 30, sm: 39}} display='flex' flexDirection={'row'}>
      <GoogleLogin size={view.view.mobile ? 'medium' : 'large'} onSuccess={responseMessage} onError={errorMessage} />
      <Button onClick={newAdmin} sx={{":hover": {opacity: 0.8}}} style={{backgroundColor: 'white', textTransform: 'none', color: 'black' }} title="asdijf">Test Admin <SupervisorAccountIcon style={{marginLeft: 5, marginBottom: 5}} /></Button>
      </Box>
      <Box
        component='form'
        onSubmit={handleSubmit((data) =>
          agent.Account.register({...data, testAdmin})
            .then(() => {
              toast.success('Registration successful - you can now login')
              navigate('/login')
            })
            .catch((error) => handleApiErrors(error)),
        )}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin='normal'
          fullWidth
          label='Username'
          autoFocus
          {...register('username', { required: 'Username is required' })}
          error={!!errors.username}
          helperText={errors?.username?.message as string}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Email address'
          {...register('email', {
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Not a valid email address',
            },
            required: 'Email is required',
          })}
          error={!!errors.email}
          helperText={errors?.email?.message as string}
        />
        <TextField
          margin='normal'
          fullWidth
          label='Password'
          type='password'
          {...register('password', {
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: 'Not a valid password',
            },
            required: 'Password is required',
          })}
          error={!!errors.password}
          helperText={errors?.password?.message as string}
        />
        <Box paddingTop={2} alignContent={'center'} flexDirection={'row'} display='flex'>
        <Switch value={testAdmin} onChange={() => setTestAdmin(!testAdmin)}/>
        <Typography sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', fontFamily: 'sans-serif'}}>
        Register as admin (temporarily to test admin functionalities).
        </Typography>
        </Box>
        <LoadingButton
          disabled={!isValid}
          loading={isSubmitting}
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Link to='/login'>{'Already have an account? Sign In'}</Link>
        </Grid>
      </Box>
    </Container>
  )
}
