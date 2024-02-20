import './App.css'
import 'ldrs/quantum'
import 'ldrs/bouncy'
import { useEffect,useState } from 'react';
import axios from "axios";
import Input from './components/Input';
import { HiArrowsRightLeft } from "react-icons/hi2";
import { HiArrowSmallRight } from "react-icons/hi2";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './components/Calender.css'; 
import Flights from './components/Flights';

function App() {

  const[data,Setdata]=useState([]);
  const[aircraft,Setaircraft]=useState([]);
  const[carriers,Setcarriers]=useState([]);

  const[value,Setvalue]=useState("");
  const[temp,Settemp]=useState([]);
  const[show,Setshow]=useState(false);

  const[value1,Setvalue1]=useState("");
  const[temp1,Settemp1]=useState([]);
  const[show1,Setshow1]=useState(false);

  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());

  const[fetchedData,SetfetchedData]=useState([]);

  const[oneWay,SetoneWay] = useState(false);

  useEffect(()=>{
    const getData = async() =>{
      const response = await axios.get("http://localhost:8000/getData")
      Setdata(response?.data)
    }
    getData()
  },[])

  const getSuggestion = (term, data) => {
    const matches = data.filter((item,i) => {
        const keys = Object.keys(item);
        const a=keys[6];
        const b = keys[11];
        const c= keys[12];
        const d = keys[13];
        const e = keys[1];

        if( 
        ( 
        (item[a] && item[a].toLowerCase().startsWith(term.toLowerCase())) ||
        (item[b] && item[b].toLowerCase().startsWith(term.toLowerCase())) ||
        (item[c] && item[c].toLowerCase().startsWith(term.toLowerCase())) ||
        (item[d] && item[d].toLowerCase().startsWith(term.toLowerCase())) ||
        (item[e] && item[e].toLowerCase().startsWith(term.toLowerCase()))
        )
        ){
          return item;
        }
    });
    return matches;
};

const getSuggestion1 = (term, data) => {
  const matches = data.filter((item,i) => {
      const keys = Object.keys(item);
      const a=keys[6];
      const b = keys[11];
      const c= keys[12];
      const d = keys[13];
      const e = keys[1];

      if( 
      ( 
      (item[a] && item[a].toLowerCase().startsWith(term.toLowerCase())) ||
      (item[b] && item[b].toLowerCase().startsWith(term.toLowerCase())) ||
      (item[c] && item[c].toLowerCase().startsWith(term.toLowerCase())) ||
      (item[d] && item[d].toLowerCase().startsWith(term.toLowerCase())) ||
      (item[e] && item[e].toLowerCase().startsWith(term.toLowerCase()))
      )
      ){
        return item;
      }
  });
  return matches;
};

  const handleChange = (e)=>{
    Setshow(true)
    Setvalue(e.target.value)
    const resp = getSuggestion(e.target.value,data);
    Settemp(resp)
  }

  const handleChange1 = (e)=>{
    Setshow1(true)
    Setvalue1(e.target.value)
    const resp = getSuggestion1(e.target.value,data);
    Settemp1(resp)
  }
  const handleArrivalDateChange = (date) => {
    setArrivalDate(date);
  };
  const handleDepDateChange = (date) => {
    setDepartureDate(date);
  };

  const handleSubmit =async(e)=>{
    e.preventDefault();

    const date = new Date(arrivalDate);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const DepDate = new Date(departureDate);
    const formattedDepDate = `${DepDate.getFullYear()}-${(DepDate.getMonth() + 1).toString().padStart(2, '0')}-${DepDate.getDate().toString().padStart(2, '0')}`;

    const destinationLocationCode = value.split(",")[2];
    const originLocationCode = value1.split(",")[2];

    console.log(originLocationCode,destinationLocationCode,formattedDate,formattedDepDate)
    let resp;
    if(!oneWay){
      resp = await axios.post("http://localhost:8000/getInfo",{
      originLocationCode,
      destinationLocationCode,
      formattedDate,
      formattedDepDate
    })
    }
    else{
      resp = await axios.post("http://localhost:8000/getInfo",{
      originLocationCode,
      destinationLocationCode,
      formattedDate,
    })
    }

    console.log(resp)
    Setaircraft(resp?.data?.data?.dictionaries?.aircraft)
    Setcarriers(resp?.data?.data?.dictionaries?.carriers)
    SetfetchedData(resp?.data?.data?.data)
  }
  return <>
  <form onSubmit={handleSubmit}>
  <div className='flex flex-col align-middle justify-evenly gap-4 w-full md:justify-evenly md:flex-row md:w-full m-2'>
      <Input handleChange={handleChange}
        value={value}
        show={show}
        temp={temp}
        Setvalue={Setvalue}
        Setshow={Setshow}
        placeholder='Enter an origin'
        />
        <div className='flex align-middle justify-center'>
          {(!oneWay)?<HiArrowsRightLeft size={30}/>:<HiArrowSmallRight size={30}/>}
        </div>
        <Input handleChange={handleChange1}
        value={value1}
        show={show1}
        temp={temp1}
        Setvalue={Setvalue1}
        Setshow={Setshow1}
        placeholder='Enter a destination'
        />
        <div className='flex align-middle justify-evenly md:w-1/3'>
        <DatePicker
          selected={arrivalDate}
          onChange={handleArrivalDateChange}
          dateFormat="MM/dd/yyyy"
          className="custom-datepicker" 
          minDate={new Date()} 
        />
        {(!oneWay) && <DatePicker
          selected={departureDate}
          onChange={handleDepDateChange}
          dateFormat="MM/dd/yyyy"
          className="custom-datepicker" 
          minDate={new Date(arrivalDate.getTime() + 86400000)}
        />}
        </div>
        <button className='border-2 w-40 h-12 mx-auto py-2 bg-green-500 text-white hover:bg-green-400'>Submit</button>
  </div>
  <div className='flex align-middle justify-evenly w-full'>
    <button className={`border-2 p-2 ${oneWay ? 'bg-green-500 text-white' : ''}`} onClick={() => SetoneWay(!oneWay)}>One way</button>
      <button className={`border-2 p-2 ${!oneWay ?'bg-green-500 text-white':''}`} onClick={()=>SetoneWay(!oneWay)}>Round Trip</button>
  </div>
  </form>
  {/* <l-quantum
    size="100"
    speed="1.75"
    color="black" 
  ></l-quantum>
  <l-bouncy
  size="45"
  speed="1.75"
  color="black" 
></l-bouncy> */}
    <Flights fetchedData={fetchedData} aircraft={aircraft} carriers={carriers}/>
  </>
}

export default App;
