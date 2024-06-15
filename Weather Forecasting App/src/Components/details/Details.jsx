// react hooks
import React, { useEffect } from 'react';
import { useState } from 'react';

// import the css module
import style from "./details.module.css"

// import the Chart Component 
import ChartWeather from '../chart/chart';

// importing the icons from react-icons bilblio 
import {  BsBrightnessLow, BsSunrise, BsSunset, BsWind } from 'react-icons/bs'
import { WiHumidity, WiWindDeg } from 'react-icons/wi'
import { BiArrowBack } from 'react-icons/bi';
import { MdOutlineVisibility, MdOutlineWaves } from 'react-icons/md';

// create the eatils Component ,Function Methode
function Details(props) {

    // get the data from the props
    const city=props.city
    const date=props.date
    const data=props.data

    // state of the datachart using Usestate hook
    const [datachart,setdatachart]=useState({data:[],labels:[]})
    
    // transfer the strig date to ,month,day,and year  
    var d = new Date(date);
    var dayName = d.toString().split(' ')[0];
    var month=d.toString().split(' ')[1]
    var daynumber = d.toString().split(' ')[2];
    var year = d.toString().split(' ')[3];
    const date2=`${dayName}  ${month} ${daynumber}  ${year}`
    
    // function for transfer a tismstamp to time 
    const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
    }

    // function for get the waether data only for the required date 
    const getdataOnlyToday=()=>{
        const overview=[]
        if(data){
            // eslint-disable-next-line array-callback-return
            data.list.map((item)=>{
                if( item.dt_txt.split(" ")[0]===date ){
                 overview.push(item)
                }
             } )
        }
             
        return overview}
    // get data for display the chart component using the Useeffect Hook 
    useEffect(()=>{
        const data=[]
        const labels=[]
        // eslint-disable-next-line array-callback-return
        getdataOnlyToday().map(item=>{
            data.push(Number(item.main.temp))
            labels.push(item.dt_txt.split(" ")[1])
        })
        setdatachart({data,labels})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])

// check the data is empty or not 
if(data){
    return (
        <div className={style.weatherzone}>

            {/* display the city ,date and a buuton to back at home */}
            <div className={style.headzone} >
                <div>
                    <button className={style.btn} onClick={props.back}   > <BiArrowBack /> </button>
                </div>
                <div>
                    <h2><span style={{color:"#00bbf0"}}>{city.toLocaleUpperCase()}</span>  {date2}</h2>
                </div>
            </div>
            <div className={style.content}>
                <div className={style.centercontent}>

                    <div>
                        <h3>Today Overview</h3>

                    </div>
                    {/* display the waether overview of today */}
                    <div className={style.statitisticszone}>
                        <div className={style.cart}>
                            <BsBrightnessLow className={style.icon} />
                            <div>
                                <h4>High/Low</h4>
                                <h2>{getdataOnlyToday()[0].main.temp_max}/{parseInt(getdataOnlyToday()[0].main.temp_min)}</h2>
                            </div>
                        </div>
                        <div className={style.cart}>
                            <BsWind className={style.icon} />
                            <div>
                                <h4>Wind Speed</h4>
                                <h2>{getdataOnlyToday()[0].wind.speed}KM/H</h2>
                            </div>
                        </div>
                        <div className={style.cart}>
                            <WiHumidity className={style.icon} />
                            <div>
                                <h4>Humidity</h4>
                                <h2>{getdataOnlyToday()[0].main.humidity}%</h2>
                            </div>
                        </div>
                        <div className={style.cart}>
                            <WiWindDeg className={style.icon} />
                            <div>
                                <h4>Wind Direction</h4>
                                <h2>46 deg</h2>
                            </div>
                        </div>
                        <div className={style.cart}>
                            <MdOutlineWaves className={style.icon} />
                            <div>
                                <h4>Pressure</h4>
                                <h2>{getdataOnlyToday()[0].main.pressure} Hpa</h2>
                            </div>
                        </div>
                        <div className={style.cart}>
                            <BsSunrise className={style.icon} />
                            <div>
                                <h4>Sunrise</h4>
                                <h2>{getTime(data.city.sunrise)} AM</h2>
                            </div>
                        </div>
                        <div className={style.cart}>
                            <MdOutlineVisibility className={style.icon} />
                            <div>
                                <h4>Visibility</h4>
                                <h2>{getdataOnlyToday()[0].visibility}</h2>
                            </div>
                        </div>
                        <div className={style.cart}>
                            <BsSunset className={style.icon} />
                            <div>
                                <h4>sunset</h4>
                                <h2>{getTime(data.city.sunset)} PM </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.chartzone}>
                    <h3>Today Tempurature</h3>

                    {/*display the chart  */}
                    {/* tempuarture changes with time */}
                    <ChartWeather datac={datachart} />
                </div>
            </div>


        </div>

    );
}
else{
    return <img src={require("../icons/wait.gif")} alt=""  className={style.img}/>
}
    
}

export default Details;