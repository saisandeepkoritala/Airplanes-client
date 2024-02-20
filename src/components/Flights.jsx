import React, { useEffect ,useState} from 'react'

const Flights = ({fetchedData,aircraft,carriers}) => {

    const[data,Setdata]=useState([]);
    let render ="";

    useEffect(()=>{
        Setdata(fetchedData);
    },[fetchedData])

    if (data?.length) {
        render = data.map((item,i) => {
            const itineraries = item?.itineraries;
            const price = item?.price?.total
            return (
                <div key={item.id} className={`border-2 m-2 ${i % 2 === 0 ? 'border-yellow-500 bg-yellow-100' : 'border-red-500 bg-red-100'}`}>
                {itineraries.map((itinerary, index) => (
                    <div key={index} className='border- m-10'>    
                    {itinerary.segments.map((segment, i) => (
                        <div key={i} className='border-2 p-2 border-green-500'>
                        <p className='text-xl text-red-600'>{i>0?`Connecting Flight ${i}`:''}</p>
                        <div className='flex'>
                            <img src={`https://www.gstatic.com/flights/airline_logos/70px/${segment.carrierCode}.png`} />
                            <h1 className='text-xl pt-4'>{segment.carrierCode} - {segment.number}</h1>
                        </div>
                        <p>Operated by : {carriers[segment.carrierCode]}</p>
                        <p>Aircraft : {aircraft[Number(segment.aircraft.code)]?aircraft[Number(segment.aircraft.code)]:"To Be Assigned...."}</p>
                        <p>Travel Time: {segment.duration.replace("PT", "")}</p>
                        <p>Boarded Time: {segment.departure.at.replace("T",",")} - {segment.departure.iataCode}</p>
                        <p>Approximate Reach Time: {segment.arrival.at.replace("T",",")} - {segment.arrival.iataCode}</p>
                        <p>{segment.departure.terminal?`Terminal:${segment.departure.terminal}`:''}</p>
                        </div>
                    ))}
                    <h1 className='text-xl bg-green-600 text-white border-t-2 border-black'>Total Price : €{price}</h1>
                    </div>
                ))}
                </div>
            );
            });
        }
    else{
        render=""
    }


    return (
        <div>
            {render}
        </div>
    )
}

export default Flights