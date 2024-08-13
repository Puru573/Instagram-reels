import React, {useState,useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Button, CardActionArea, CardActions } from '@mui/material';
import insta from '../Assets/Instagram.JPG';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { ClassNames } from '@emotion/react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {AuthContext} from "../Context/AuthContext"
import img1 from "../Assets/img1.jpg"
import img2 from "../Assets/img2.jpg"
import img3 from "../Assets/img3.jpg"
import img4 from "../Assets/img4.jpg"
import img5 from "../Assets/img5.jpg"
import {useNavigate} from "react-router-dom"



import "./login.css"
import bg from "../Assets/insta.png";
import {Link} from "react-router-dom";


export default function Login() {
    const [email,setEmail]=useState("");
    const [password,setPasswrod]=useState("");
    const [err,setErr]=useState("");
    const [loading,setLoading]=useState(false);
    const {login}=useContext(AuthContext);
    const navigate=useNavigate();

    const handleClick= async()=>{
        try{
            setLoading(true)
            const res=await login(email,password);
            if(res){
                setLoading(true);
                navigate("/");
            }
        }
        catch(error){
            setErr(error.message);
            setTimeout(() => {
                setErr("");
                setLoading(false)
            },2000);
        }
       
    }
    const useStyles = makeStyles({
        text1: {
            color: "grey",
            textAlign: "center"
        },
        card2: {
            marginTop: "2rem"
        },
        text2: {
            textAlign: "center"
        }
    })
    const classes = useStyles();
    return (
        <div className='loginWrapper'>
            <div className='imgCar'>
                <img src={bg} alt="intagram img" />
                <div className='car'>
                <CarouselProvider
                    visibleSlides={1}
                    totalSlides={5}
                    // step={3}
                    naturalSlideWidth={238}
                    naturalSlideHeight={423}
                    hasMasterSpinner
                    isPlaying={true}
                    infinite={true}
                    dragEnabled={false}
                    touchEnabled={false}
                >
                    <Slider>
                    <Slide index={0}><Image src={img1}/></Slide>
                    <Slide index={1}><Image src={img2}/></Slide>
                    <Slide index={2}><Image src={img3}/></Slide>
                    <Slide index={3}><Image src={img4}/></Slide>
                    <Slide index={4}><Image src={img5}/></Slide>
                    </Slider>
                </CarouselProvider>
                </div>
            </div>

            <div className="login">
                <Card variant='outlined'>
                    <div className="insta-logo">
                        <img src={insta} alt="Insta-logo" />
                    </div>
                    <CardContent>
                    {err!="" && <Alert severity="error">{err}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e)=>setPasswrod(e.target.value)} />
                    </CardContent>
                    <Typography color="secondary" variant="subtitle1" className={classes.text2} >
                        <Link to="/forgetpassword" style={{ textDecoration: "none" }}>Forget Password ?</Link>
                    </Typography>
                    <CardActions>
                        <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}>
                            Log IN
                        </Button>
                    </CardActions>
                </Card>                                                                                                         
                <Card variant="outlined" className={classes.card2}>
                    <Typography variant="subtitle1" className={classes.text1} >
                        Don't Have an account? <Link to="/signup" style={{ textDecoration: "none" }}>Sign up</Link>
                    </Typography>
                </Card>
            </div>
        </div>
    );
}
