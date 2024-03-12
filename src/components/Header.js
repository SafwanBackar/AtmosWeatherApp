import { TiWeatherDownpour } from "react-icons/ti";

function Header() {
  return (
    <div className="text-black absolute top-0 left-4 rounded-full font-bold text-4xl p-4">
        <div className="flex">atmos <TiWeatherDownpour className="ml-2 size-11"/></div>
        <div className="text-sm mb-8 block">
          get your weather data here.
        </div>
    </div>
  )
}

export default Header