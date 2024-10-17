import { useEffect, useState } from "react";

function App()
{
  const [time , setTime]= useState(0) // time in seconds
  const [editField, setEditField] = useState(null) // 'hour','minute', second
  const [ isRunning, setIsRunning]= useState(false)
  const [editValue, setEditValue] = useState(0)

  useEffect( ()=>{
    let clock=null;
    if( isRunning && time > 0)
    {
       clock =setInterval(()=>{
        setTime( (prev)=> prev-1)
       } ,1000)
    }
    else if( time === 0){
      setIsRunning(false)
    }  

    return ()=> clearInterval(clock)
  } ,[isRunning, time])


  const formatTime= (time)=>{
    

    let hour =Math.floor( time/3600);
    let minute=Math.floor( (time%3600)/60);
    let second= Math.floor(time%60);
    // console.log({hour, minute, second})
    return {hour, minute, second}
  }

 

  const updateEditValue= (event)=>{
    const value =  event.target.value.substring(0, 2);
    setEditValue( value)
  }
  
  function updateTime(){
    const newTime = Number(editValue)
    if(editField === 'hour')
    {
      setTime( (prev)=> prev+ 3600*newTime)
      // console.log('previous time + 3600*this.time');
    }
    else if( editField === 'minute')
    {
      setTime( (prev)=> prev+ 60*newTime)
      // console.log('previous time + 60*this.time')
    }
    else
    {
      setTime( (prev)=> prev+ newTime)
      // console.log('previous time + this.time')
    }
    setEditField(null)
  }


  const {hour, minute, second}= formatTime(time)
  return <main>
      <div className='card'>
        <div className='card__time-wrapper'>
          <div className='card__time'>
          {
            // console.log(editField)
            (editField ==='hour' )?
              <input onChange={ updateEditValue} onBlur={ updateTime} ></input>
            :
            <p onClick={ ()=> setEditField('hour')}>{hour <= 9 ? '0'+hour:hour}</p>
          }
          </div>
          :
          <div className='card__time'>
          {
            ( editField === 'minute') ? 
            <input  onChange={updateEditValue} onBlur={updateTime} />
            :
            <p onClick={ ()=>{ setEditField('minute')}}>{minute <= 9 ? '0'+minute:minute}</p>
          }
          </div>
          :
          <div className='card__time'>
          {
            ( editField === 'second') ?
            <input onChange={updateEditValue} onBlur={updateTime}></input>:
            <p onClick={()=> setEditField('second')}>{second <= 9 ? '0'+second:second}</p>
          }
          </div>
        </div>

        <div className='card__button-wrapper'>
          <button onClick={()=> setIsRunning( (prev)=>!prev)}> { isRunning ? 'Pause':'Start'}</button>
          <button onClick={()=> setTime(0)}>Reset</button>
        </div>
      </div> 
  </main>
}

export default App;