import React from 'react'

const Input = ({ handleChange, value, show, temp, Setvalue, Setshow, placeholder }) => {
    return <div className='mx-auto my-0'>
    <input className='border-2 border- #ccc h-10 w-30 pl-2' onChange={handleChange} value={value || ''} placeholder={`${placeholder}`}/>
    {
    show && <div className='overflow-scroll border-1 border-black w-60 max-h-44 md:max-h-96 overflow-x-hidden'>
        {value?
        temp.map((item)=>{
            const keys = Object.keys(item);
            const a=keys[6];
            return <div key={item._id} className='border-2 border-t-0 flex align-middle justify-center gap-4 hover:bg-gray-300' onClick={()=>{
            const term = item.city+","+item.country_code+","+item.iata
            Setvalue(term)
            Setshow(false)
            }}>
                <div className='flex align-middle justify-normal flex-col w-full  py-2 text-xs'>
                    <p className='text-sm'>{item[a]}</p>
                    <p className='font-thin'>{item.state?`${item.state},`:''} {item.country_code}</p>
                </div>
                <div className='flex text-sm align-middle justify-center py-2 pr-2'>
                    <p>{item.iata}</p>
                </div>    
            </div>
        }):""
        }
        </div>
        }
    </div>
}

export default Input