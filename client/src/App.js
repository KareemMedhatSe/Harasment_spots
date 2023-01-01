import * as React from 'react';
import Map,{Marker,Popup} from 'react-map-gl';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useState,useEffect } from 'react';
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from'axios'
import {format} from 'timeago.js'
import FileBase from 'react-file-base64';
import Register from './components/signup';
import Login from './components/signin';
function App() {
  const myStorage = window.localStorage;
  
  const [current_user,setCurrent_user]=useState(myStorage.getItem("user"))
  
  const [pins,setpins]=useState([])
  const [newPlace,SetnewPlace]=useState(null)
  const [CurrentPin,SetCurrentPin]=useState(null)
  const[Showsignup,SetShowsignup]=useState(false);
  const [Showsignin,SetShowsignin]=useState(false)
  const [newHarassmentPin,setnewHarassmentPin]=useState({Title:null,description:null,image:''})
  const [viewState, setViewState] = useState({
    longitude: 31.235712,
    latitude: 30.044420,
    zoom: 10
  });
  const handlecurrentPin=async (id,lat,long)=>{ SetCurrentPin(id); setViewState({...viewState,longitude:long,latitude:lat}) }
  const handledouble=(e)=>{
   const long=e.lngLat.lng
   const lat=e.lngLat.lat
  SetnewPlace({lat,long})
  
  }
  const handle_form=async (e)=>{
    e.preventDefault();
  const newHarassment={

Title:newHarassmentPin.Title,
description:newHarassmentPin.description,
long:newPlace.long,
lat:newPlace.lat,
image:newHarassmentPin.image,
author:localStorage.user
}
try {
  const ress=await axios.post('/harassment/',newHarassment)
  setpins([...pins,ress])
  SetCurrentPin(null)

} catch (error) {
  console.log(error)
}  
  
  }
useEffect(()=>{
const getHarassments=async()=>{
try {
  const res=await axios.get("/harassment/")
  setpins(res.data)
} catch (error) {
  console.log(error)
}

}

getHarassments()
},[])





  return (
    <div className="App">
    <Map
    
    onDblClick={handledouble}
    mapboxAccessToken='pk.eyJ1Ijoia2FyZWVtbWVkaGF0IiwiYSI6ImNsYno0cTB6ODIwNjEzdXBuaGFqdnR5OHoifQ.Qr3wpVxHucddU06USw-MnQ'
    {...viewState}
    style={{width:'100vw', height: '100vh'}}
    onMove={evt => {setViewState(evt.viewState) }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    transitionDuration="200"
  >
  {pins.map(p=>(
    <>
  <Marker
  longitude= {p.long}
  latitude= {p.lat}
  offsetLeft={-viewState.zoom*1.5}
  offsetTop={-viewState.zoom*3}
  key={p._id}
  >

 <PushPinIcon style={{ fontSize:viewState.zoom*3, color:p.author===current_user?"red":"slateblue" ,cursor:"pointer"}} 
 onClick={()=>{handlecurrentPin(p._id,p.lat,p.long);}} />
  </Marker>

  {p._id===CurrentPin&&(
    
  <Popup latitude={p.lat}
  longitude={p.long}
  closeButton={true}
  closeOnClick={false}
  anchor='left'
  
  onClose={()=>{SetCurrentPin(null)}}
  >
  <div className='info'>
  <label>Title:</label>
  <p>{p.Title}</p>
  <label>Description:</label>
  <p>{p.description}</p>
  <label>Image or video <br/></label>
   <label htmlFor="file-upload" >
          <img src={p.image } alt="" height="250px" width="250px"/>
        </label>
        <br/>
  <span className='username'>
  created by: <h4>{p.author}</h4>
  </span>
  <span className='date'> {format(p.createdAt)}</span>
  </div>
  </Popup>
    )}


  </>
  ))}
    {newPlace&&<Popup 
    latitude={newPlace.lat}
  longitude={newPlace.long}
  closeButton={true}
  closeOnClick={false}
  anchor='left'
  
  onClose={()=>{SetnewPlace(null)}}>
  <div className='info'>  
  <form onSubmit={handle_form}>
    <label>Title</label>
    <input placeholder='enter a title of the incident' onChange={(e) => setnewHarassmentPin({ ...newHarassmentPin, Title: e.target.value })}></input>
    <label>Description</label>
    <textarea placeholder='Describe what happened to you' rows={7} onChange={(e) => setnewHarassmentPin({ ...newHarassmentPin, description: e.target.value })}/>
    
    <label>select an image</label>
    <div><FileBase  type="file" multiple={false} onDone={({ base64 }) => setnewHarassmentPin({ ...newHarassmentPin, image: base64 })} /></div>
    
    <button type='submit' className='submit_button' >submit</button>
    </form>
    </div>
    </Popup>}
    {current_user?(<button className='button logout' onClick={()=>{setCurrent_user(null);myStorage.removeItem("user")}}>logout</button>):(
      <div className='buttons'>
      
      <button className='button login' onClick={()=>{SetShowsignin(true)}}>signin</button>
      <button className='button register' onClick={()=>{SetShowsignup(true)}}>signup</button>
      </div>

    )}

    {Showsignup&&(
<Register SetShowsignup={SetShowsignup}/>
    )}

    {Showsignin&&(

<Login 
SetShowsignin={SetShowsignin}
setCurrent_user={setCurrent_user}
myStorage={myStorage}
/>

    )}

    
  </Map>
  
     
    </div>
  );
}

export default App;
