import axios from 'axios'
import React, { useState } from 'react'
import '../App.css'
import Header from './Header'
import { punList } from './punList'
import ImageCard from './ImageCard'
import { GiWhirlwind } from "react-icons/gi";
import { getRandom } from './RandomImages'
import './StaticContent.css'
import { homeImage, buttonStyle, inputStyle } from './StaticContent'

function Home() {
    const [locationData, setLocationData] = useState({location: '', locationCountry: '', temp: '', feelTemp: '', wind: '', condition: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [inputCity, setInputCity] = useState('')
    const [isDenied, setIsDenied] = useState(false)
    const [imageSrc, setImageSrc] = useState([])
    const [isError, setIsError] = useState(false)

    const handleClick = ()=>{
        setLocationData({...locationData, location: '',locationCountry: '', temp : '', feelTemp: '', wind: '' , condition: ''})
        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(getLocationData, handleDeny);
    }
    const getLocationData = async (position) =>{
        const result = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${position.coords.latitude},${position.coords.longitude}&aqi=no`)
        if(result){
          setLocationData({
            ...locationData,
              location: result.data.location.name, 
              locationCountry: result.data.location.country,
              temp : result.data.current.temp_c, 
              feelTemp: result.data.current.feelslike_c, 
              wind: result.data.current.wind_kph,
              condition: result.data.current.condition.text
          });
          let imageQuery = result.data.current.condition.text.toLowerCase().includes('clear') ? 'clear sky' : result.data.current.condition.text
          const imageData = await axios.get(`https://api.unsplash.com/search/photos/?query=${imageQuery}&r&orientation=landscape`,{
            headers:{
              Authorization: `Client-ID ${process.env.REACT_APP_IMAGE_API_KEY}`
            }
          })
          if(imageData){
            const randomImages = getRandom(imageData.data.results,6)
            setImageSrc(randomImages)
          }
          setIsLoading(false)
        }
    }
    const handleDeny = ()=> {
      setIsDenied(true)
      setIsLoading(false)
      setImageSrc([])
    }

    const handleSubmit = (e)=>{
      e.preventDefault();
      setIsDenied(false)
      setIsLoading(true)
      setIsError(false)
      setLocationData({...locationData, location: '', locationCountry: '', temp: '', feelTemp: '', wind: '', condition: ''})
      setImageSrc([])
      // setTimeout is not required here at all. Just for a better UI.
      setTimeout(async () => {
        try {
          const result = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${inputCity}&aqi=no`)
          if(result){
            setLocationData({
              ...locationData,
              location: result.data.location.name, 
              locationCountry: result.data.location.country,
              temp : result.data.current.temp_c, 
              feelTemp: result.data.current.feelslike_c, 
              wind: result.data.current.wind_kph,
              condition: result.data.current.condition.text
            });
            setIsLoading(false)
            let imageQuery = result.data.current.condition.text.toLowerCase().includes('clear') ? 'clear sky' : result.data.current.condition.text
            const imageData = await axios.get(`https://api.unsplash.com/search/photos/?query=${imageQuery}&r&orientation=landscape`,{
              headers:{
                Authorization: `Client-ID ${process.env.REACT_APP_IMAGE_API_KEY}`
              }
            })
            if(imageData){
              const randomImages = getRandom(imageData.data.results,6)
              setImageSrc(randomImages)
            }
          }
        } catch (error) {
          setIsLoading(false)
          setIsError(true)
        }
      }, 1500);
      
      setInputCity('')
    }
    const imageList = imageSrc.map((data)=>{
        return <ImageCard key={data.alt_description} imageSrc={data.urls.small}/>
    })

    let content = ''
  
  
    if (isDenied && !isLoading){
      content = 
      <div className='text-center'>
        You denied access. Here's a stupid pun instead.
        <div className='block'>{punList[Math.floor(Math.random() * punList.length)]}</div>
      </div>
      }
    else if(!Object.values(locationData).includes('')){
      content = <div className='ml-28'>
                  <span className='block text-4xl'>{`${locationData.location}, ${locationData.locationCountry}`}</span>
                  <span className='block text-5xl'>{locationData.temp}°C</span>
                  <span className='block'>{locationData.condition}</span>
                  <span className='flex'>Wind Speed @{locationData.wind} KPH <GiWhirlwind size={25} className='ml-5 mt-0.5'/></span>
                </div> 
    }else if(isError){
      content = <div className='ml-28 block text-4xl'>Something went wrong!!. Try again.</div>
    }
    let finalContent =  <>
                          <div className="h-96">{content}</div>
                            <div className="h-96">
                              <div className="flex flex-col md:grid md:grid-cols-3 gap-3">
                                {imageList}
                              </div>
                            </div>
                        </>

      return (
        <div>
            <Header/>
            <div className="items-center mt-5 relative h-screen flex flex-col">
              <div className='flex flex-row'>
                <form onSubmit={handleSubmit}>
                    <input value={inputCity} onChange={(e) => setInputCity(e.target.value)} type="text" placeholder='Type in a city here.' className={inputStyle}/>
                </form>
                <button onClick={handleClick} className={buttonStyle}>
                      Check my city !
                </button>
              </div>
              {isLoading ? <div className="spinner"/> :  <div className="container px-2.5 grid grid-cols-2 grid-rows-2 mt-12">{content? finalContent : homeImage}</div>}
            </div>
        </div>
      );
        
        
        
    }

  export default Home


  