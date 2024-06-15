// react hooks
import React, { useEffect } from 'react';
import { useState } from 'react';

// import the css module
import style from './weather.module.css'

// import axios from axios biblio
import axios from 'axios';

// import the Details Components for more details about weather 
import Details from '../details/Details';
import { WeatherIcons } from '../icons/icons';

// importing the icons from react-icons bilblio 
import { AiFillCaretDown ,AiFillCaretUp} from 'react-icons/ai'
import { BsWind ,BsSunrise,BsSunset} from 'react-icons/bs'
import { TbZoomCancel} from 'react-icons/tb'
import { MdOutlineVisibility, MdOutlineWaves } from 'react-icons/md'
import {BiSearchAlt} from 'react-icons/bi'
import { WiHumidity } from 'react-icons/wi';

// create The Weather Component Function Methode

function Weather(props) {
    // declare ALL the States using Usestate hooks
    const [inputvalue,setinputvalue]=useState("")
    const [city,setcity]=useState("martil")
    const [dataToday,setdataToday]=useState()
    const [listdate,setlistdate]=useState([])
    const [listtemp,setlisttemp]=useState([])
    const [listicons,setlisticons]=useState([])
    const [details_is_active,setdetails_is_active]=useState(false)
    const [datedetails,setdatedetails]=useState()
    const [currenttime,setcurrenttime]=useState()

    // function for transfer a timstamp to Time
    const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
    }

    // get the data from openweather api using asyncrone request with axios.get methode ,using useEffect hooks  
    useEffect(()=>{
        const getDataToday = async () => {  const datacity =  await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9fbdfc3fc4287690a3d3cf9992f59663&units=metric`);
        return datacity.data;
      }
      getDataToday().then((dataToday) => setdataToday(dataToday));
    },[city])

    //get the current time wich city from ipgeolocation api using asynchrone request with axios.get methode ,useeffect hooks
    useEffect(()=>{
    const gettimetodaay = async () => { 
        if (dataToday){
            const datatime =  await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=ad084ca351084ee0a4c38d5ce82ef79a&lat=${dataToday.city.coord.lon}&long=${dataToday.city.coord.lon}`);
    
            return datatime.data; 
        } 
        
      }                      
      gettimetodaay? gettimetodaay().then((data) => setcurrenttime(data)):console.log();

      // function for get list of the dates ,list of the tempurature and liste of icons  
      const DTI=()=>{
        let liste1=[]
        let liste2=[]
        let liste3=[]
        if (dataToday){
            dataToday.list.map((item)=>item.dt_txt.split(" ")[0] !==dataToday.list[0].dt_txt.split(" ")[0] ?
                            !liste1.includes(item.dt_txt.split(" ")[0])?
                                (liste1.push(item.dt_txt.split(" ")[0]),
                                liste2.push(item.main.temp),
                                liste3.push(item.weather[0].icon)):"":"")
        } 
    setlistdate(liste1)
    setlisttemp(liste2)
    setlisticons(liste3)

      }
      DTI()
    },[dataToday])
    
   //function for the required date
    const getdatedetails=(date)=>{
        setdatedetails(date)
        setdetails_is_active(true)
    }

    // test for the result of the requests
    if(dataToday && currenttime){

        // check the state of the details is active 
        if(!details_is_active){

    
            return (
        
                <div className={style.weatherzone}>
        
                    <div className={style.centercontent}>
                        <div>
                            <div>
                                {/* display the current month,day and year from the result of seconf rquest */}
                                <h2>{currenttime.date_time_txt.split(",")[1]}</h2>
                                <h4>{
                                `${currenttime.date_time_txt.split(",")[0]},
                                ${currenttime.date_time_wti.split(",")[1].slice(0,12)}`
                                }</h4>
                            </div>
                            <div className={style.button}>
                                <input type="text" name="search" id="search" placeholder=' Search Location Here' value={inputvalue} onChange={(e)=>setinputvalue(e.target.value)}/>
                                <button onClick={()=>setcity(inputvalue)}><BiSearchAlt/></button>
                                <button onClick={()=>setinputvalue("")}><TbZoomCancel/></button>
                            </div>
                        </div>
                        <div>
                            {/* display the weather states from the result of the first request  */}
                            <div>
                                <div className={style.zoneicon}>
                                    <BsWind />
                                </div>
                                <div>
                                    <h4>Wind Speed</h4>
                                    <h2>{ dataToday.list[0].wind.speed }km/h</h2>
                                </div>
                                <div>
                                    <AiFillCaretDown  style={{color:"red"}}/>
                                    2 km/h
                                </div>
                            </div>
                            <div>
                                <div className={style.zoneicon}>
                                    <WiHumidity />
        
                                </div>
                                <div>
                                    <h4>Humidity</h4>
                                    <h2>{dataToday.list[0].main.humidity } %</h2>
                                </div>
                                <div>
                                    <AiFillCaretUp style={{color:"#00bbf0"}} />
                                    3 %
                                </div>
                            </div>
                            <div>
                                <div className={style.zoneicon}>
                                    <MdOutlineWaves />
                                </div>
                                <div>
                                    <h4>Pressure</h4>
                                    <h2>{dataToday.list[0].main.pressure }</h2>
                                </div>
                                <div>
                                    <AiFillCaretUp style={{color:"#00bbf0"}}/>
                                    13
                                </div>
                            </div>
                            <div>
                                <div className={style.zoneicon}>
                                    <MdOutlineVisibility />
                                </div>
                                <div>
                                    <h4>Visibillity</h4>
                                    <h2>{dataToday.list[0].visibility }</h2>
                                </div>
                                <div>
                                    <AiFillCaretDown style={{color:"red"}}/>
                                    20
                                </div>
                            </div>
                        </div>
                        
                        <div>
                             {/* display the state of the weather for the other days + display the icons  */}
                            <div className={style.lastzone}>
                                <div className={style.cartzone}>
        
                                {listdate.map((item,index)=> <div key={index} className={style.cart}>
                                    <div >
                                    <h3>{item}</h3> <button className={style.btn} onClick={()=>getdatedetails(item)}>More</button>
                                    </div>
                                    <div>
                                    <img src={require(`../icons/animated/${WeatherIcons[listicons[index]]}`)} alt="" />
                                    <h1>{parseInt(listtemp[index])} ℃</h1>
                                    </div>
                                </div> )}
                                </div>
        
                            </div>
                        </div>
                        
        
                    </div>
                    <div className={style.sidecontent}>
                        <div> 
                            {/* display the city and country name , the current time for city */}
                            <div>
                                <h3>{dataToday.city.name}</h3>
                                <h5>{dataToday.city.name},{ dataToday.city.country}</h5>
                            </div>
                            <div>
                                <h3>{currenttime.time_12}</h3>
                            </div>
                        </div>
                        {/* display today's tempurature with icons and description */}
                        <div>
                            <img src={require(`../icons/animated/${WeatherIcons[dataToday.list[0].weather[0].icon]}`)} alt="" style={{width:"100px"}}/>
                            <div>
                                <h1>{parseInt(dataToday.list[0].main.temp)} ℃</h1>
                                <h4>{dataToday.list[0].weather[0].description}</h4>
                            </div>
                        </div>
                        <hr></hr>

                        {/* today's air hummidity changes according to time  */}
                        <div className={style.rangezone}>
                                <h4>Humidity</h4>
                                { dataToday.list.map((item,index)=>item.dt_txt.split(" ")[0]===dataToday.list[0].dt_txt.split(" ")[0] ? 
                                <div key={index}>
                                    {Number(item.dt_txt.split(" ")[1].split(":")[0]) <=12 ?`${Number(item.dt_txt.split(" ")[1].split(":")[0])} AM`:`${Number(item.dt_txt.split(" ")[1].split(":")[0])} PM`}
                                    <div className={style.range} >
                                    <div  style={{width:`${item.main.humidity}%`,backgroundColor:"#00bbf0",borderRadius:"10px"}}>
                                           "
                                    </div>
                                    </div>
                                    {item.main.humidity} %
                                </div>
                                :""
                                )}
                        </div>

                        {/* the sunset and the sunrise of today  */}
                        <div className={style.sunzone} >
                               <div>
                                    <BsSunset className={style.icon} />
                                    <div>
                                        <h4>Sunset</h4>
                                        <h3>{getTime(dataToday.city.sunset)} PM</h3>
                                    </div>
                                    <h5>5 hours ago</h5>
                                </div>
                                <div>
                                    <BsSunrise className={style.icon} />
                                    <div>
                                        <h4>sunrise</h4>
                                        <h3>{getTime(dataToday.city.sunrise)} AM</h3>
                                    </div>
                                    <h5>5 hours ago</h5>
                                </div>     
                        </div>
                    </div>
                </div>
        
            )}
            else
                return (
                    // giving the props to the Details Component
                    <Details city={city} date={datedetails} back={()=>setdetails_is_active(false)} data={dataToday}/>
                )
            ;
    }
    else{
        return <img src={require("../icons/wait.gif")} alt=""  className={style.img}/>
    }
    
}

export default Weather;