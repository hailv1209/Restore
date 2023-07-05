import { LockOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import { history } from '../..';

export default function Register() {
    // const navigate = useNavigate();
    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'all'
    });  

    function handleApiErrors (errors : any) {
        if(errors) {
            errors.forEach((error : string) => {
                if(error.includes('Password')) {
                    setError('password', {message : error})
                }else if (error.includes('Email')) {
                    setError('email',{message : error})
                }else if (error.includes('Username')) {
                    setError('username',{message : error})
                }
            });
        }
    } 

    return (
        <Container component={Paper} maxWidth='sm' sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form" 
                onSubmit={handleSubmit((data) =>
                     agent.Account.register(data)
                     .then(() => {
                        toast.success('Registeration successful - you can now login');
                        history.push('/login');
                     })
                     .catch(error => handleApiErrors(error)))
                } 
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register('username', {required: 'Username is required'})}
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                />
                 <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email address"
                    {...register('email', {
                        required: 'Email is required',
                        pattern : {
                            value : /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                            message : 'Not a vaid email address'
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        pattern : { 
                            value :  /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                            message : 'password does not meet complexity required !'
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors?.password?.message as string}
                />  
                <LoadingButton 
                    disabled={!isValid}
                    loading={isSubmitting} 
                    type="submit" 
                    fullWidth 
                    variant="contained" sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            {"Already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

function setError(arg0: string, arg1: { message: string; }) {
    throw new Error('Function not implemented.');
}
