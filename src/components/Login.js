import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../components/Login.css";
import logo from "../Assets/reels-logo.png";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Link,useNavigate } from "react-router-dom";
import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
import img5 from '../Assets/img5.jpg'
import {
  CarouselProvider,
  Slider,
  Slide,
  Image
} from "pure-react-carousel";
import { useState } from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
// import { makeStyles } from "@mui/styles";
export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async()=>{
      try {
          setError('');
          setLoading(true);
          await login(email,password);
          setLoading(false)
          navigate('/')
      } catch (error) {
          setError(error);
          setTimeout(()=>{
            setError("");
          },3000)          
      }
  }
  return (
    <div className="card_container">
      <div className="background">
        <div className="sliders">
          <CarouselProvider
            visibleSlides={1}
            naturalSlideWidth={238}
            naturalSlideHeight={423}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
            totalSlides={5}
          >
            <Slider>
              <Slide index={0}>
                <Image src={img1} />
              </Slide>
              <Slide index={1}>
                <Image src={img2} />
              </Slide>
              <Slide index={2}>
                <Image src={img3} />
              </Slide>
              <Slide index={3}>
                <Image src={img4} />
              </Slide>
              <Slide index={4}>
                <Image src={img5} />
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
      <div className="card">
        <Card variant="outlined">
          <div className="img-container">
            <img src={logo} className="logo" />
          </div>
          <CardContent>
            {error !== "" && (
              <Alert severity="error" fullWidth margin="normal">
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              size="small"
              margin="normal"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              margin="normal"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link
                to="/login"
                style={{ textDecoration: "none", textAlign: "center" }}
              >
                Forgot Password
              </Link>
            </div>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={loading}
            >
              Login
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined" className="card2">
          <CardContent>
            <Typography variant="subtitle1" className="sub1">
              Don't have an account ?{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Signup
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
