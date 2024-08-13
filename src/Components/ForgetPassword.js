import React, {useState,useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button} from '@mui/material';
import insta from '../Assets/Instagram.JPG';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {AuthContext} from "../Context/AuthContext"
import "./ForgetPassword.css"

function ForgetPassword() {

    const [err,setErr]=useState("");
    const [msg,setMsg]=useState("");
    const [email,setEmail]=useState("");
    const [loading,setLoading]=useState(false);
    const {resetPassword}=useContext(AuthContext);

    const handleClick= async()=>{
        try{
            setLoading(true);
            await resetPassword(email);
            setMsg("your reset password email is successfully sent!");
            setTimeout(() => {
             setMsg("")
                setLoading(false);
            }, 2000);
            setEmail("");
            setLoading(false);
        }
        catch(error){
            setErr(error);
            setTimeout(() => {
                setErr("");
                setLoading(false);
            }, 2000);
        }
    }
  return (
    <div>
            <div className='forgetWrapper'>
            <div className="forget">
                <Card variant='outlined'>
                    <div className="insta-logo">
                        <img src={insta} alt="Insta-logo" />
                    </div>
                    <CardContent>
                    {err!="" ? <Alert severity="error">{err}</Alert> : (msg!="" && <Alert severity="success">{msg}</Alert>)}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </CardContent>
                    <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}>
                            Reset Password
                        </Button>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default ForgetPassword;