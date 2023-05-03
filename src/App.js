import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import clockBackground from './clockimg/ClockFace.png'
import clockHours from './clockimg/ClockFace_H.png'
import clockMinutes from './clockimg/ClockFace_M.png'
import clockSeconds from './clockimg/ClockFace_S.png'


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <MyButton></MyButton>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

function MyButton() {
  return(
    <button>Im a btn</button>
  )
}

const Spoiler = ({header="+", open, children}) => {
  //напишите тут код
  const [openState = open, setOpen] = useState(true)
  return(
  <>
  {header}
  
  <div onClick={() => setOpen(!openState)}>Скрыть компонент</div>
  {openState===true ? [children] : null}
  </>
  )
}

const RangeInput = ({min, max}) => {
  const [value, setValue] = useState('')
  
   const change = (event) => {
    const newValue = event.target.value
    if (newValue || newValue.length <= 1) {
      setValue(newValue)
    }
   }

   const inputStyle = {
    borderColor: value.length < min || value.length > max ? 'red' : 'black'
   }

  return (
    <>
    <input value={value} onChange={change} style={inputStyle}></input>
    </>
  )
}

const LoginForm = ({onLogin}) => {
  const [value1, setState1] = useState('')
  const [value2, setState2] = useState('')
  // const [btnState, btnSetState] = useState('')
  // let disabledState = 'true'

  const login = (event) => {
    setState1(event.target.value)
  }

  const psw = (event) => {
    setState2(event.target.value)
  }

  const submit = () => {
    onLogin(value1, value2)
  }

  return (
  <>
  <input value={value1} onChange={login} ></input>
  <input value={value2} onChange={psw} type='password'></input>
  <button disabled={value1 === '' || value2 === ''} onClick={submit}>Login</button>
  </>
  )
}

const PasswordConfirm = ({min}) => {
  const [psw1, setState1] = useState('')
  const [psw2, setState2] = useState('')

  const changePsw1 = (event) => {
    setState1(event.target.value)
  }

  const changePsw2 = (event) => {
    setState2(event.target.value)
  }

  const inputStyle = {
    borderColor: psw1.length < min && psw2.length < min || psw1.length !== psw2.length ? 'red' : 'black'
  }

  return (
    <>
    <input value={psw1} onChange={changePsw1} style={inputStyle} type='password'></input>
    <input value={psw2} onChange={changePsw2} style={inputStyle} type='password'></input>
    </>
  )
}

// const Timer = ({sec}) => {
//   const [seconds=sec, setSeconds] = useState(sec)

//   useEffect(() => {
//     if (seconds > 0) {
//       setTimeout(setSeconds(seconds - 1), 1000)
//     }

//   })
//   return (
//     <>
//     <div>
//       <h4></h4>
//       :
//       <h4>{seconds}</h4>
//     </div>
//     <button>Пауза</button>
    
//     </>
//   )
// }

const Timer1 = ({ms}) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
      const intervalId = setInterval(() => {
          console.log('интервал интервалит ок', count)
          setCount(count => count +1)
      }, ms)
      console.log('mounting', intervalId)
      return () => {
          clearInterval(intervalId)
          console.log('unmounting', intervalId)
      }
  },[ms])

  console.log('ОБНОВЛЕНИЕ ТАЙМЕРА', count, ms)
  
  return (
      <div>
          {count}
      </div>
  )
}

const Timer2 = ({sec}) => {
  const [count, setCount] = useState(sec)
  const [timerActive, setTimerActive] = useState(false)

  let timerId

  const stop = () => {
    clearTimeout(timerId)
  }
  const start = () => {
    timerId = setTimeout(() => {
      console.log('Timer works')
      setCount(count => count - 1)
      
    }, 1000)
  }
  useEffect(() => {
    if (count > 0 && timerActive) {
      start()
    }
    else {
      setTimerActive(false)
      stop()
    }
   
  
    return () => {
      clearTimeout(timerId)
    }
  })
  const secondsLeft = count % 60;
  const minutesLeft = Math.floor(count / 60) % 60;
  const hoursLeft = Math.floor(count / 3600);
  

  return (
    <>
         <div>
          <p>{hoursLeft + ':' + minutesLeft + ':' + secondsLeft}</p>
         </div>
         <button onClick={() => setTimerActive(!timerActive)}>Пауза</button>
        
         </>
  )
}

const TimerControl = () => {
  const [seconds, setSeconds] = useState('')
  const [minutes, setMinutes] = useState('')
  const [hours, setHours] = useState('')
  const [timerActive, setTimerActive] = useState(false)

  let timerId

  const stop = () => {
    clearTimeout(timerId)
  }
  const start = () => {
    timerId = setTimeout(() => {
      console.log('Timer works')
      setSeconds(seconds => seconds - 1)
      
    }, 1000)
  }

  useEffect(() => {
    let interval = null;

    if (hours > 0 && timerActive || minutes > 0 && timerActive || seconds > 0 && timerActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(interval);
            } else {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      clearInterval(interval)
      setTimerActive(false)
    }
    

    return () => clearInterval(interval);
  });


  const hoursHandleChange = (event) => {
    setHours(event.target.value)
  }

  const minutesHandleChange = (event) => {
    setMinutes(event.target.value)
  }

  const secondsHandleChange = (event) => {
    if (event.target.value >= 60) {
      setMinutes(Math.floor(event.target.value / 60))
    }
    setSeconds(event.target.value % 60)
  }



  const style = {}
  return (
    <>
    <input type={'number'} value={hours} style={style} onChange={hoursHandleChange}></input>
    <input type={'number'} value={minutes} style={style} onChange={minutesHandleChange}></input>
    <input type={'number'} value={seconds} style={style} onChange={secondsHandleChange}></input>
    <button onClick={() => setTimerActive(!timerActive)}>Старт</button>
    </>
  )
}

const SecondsTimer = ({seconds}) => <h2>{seconds}</h2>

const TimerContainer = ({seconds, refresh, render}) => {
  const Render = render
  const [seconds1, setSeconds] = useState(seconds)

  let timerId

  const stop = () => {
    clearTimeout(timerId)
  }
  const start = () => {
    timerId = setTimeout(() => {
      // console.log('Timer works')
      setSeconds(count => count - 1)
      console.log(seconds1)
      
    }, refresh)
  }

  useEffect(() => {
    if (seconds1 > 0) {
      start()
    }
    else stop()
    return () => stop()

  })
  return (
    <>
    <Render seconds={seconds1}>
    </Render>
    </>
  )

}

const LCDTimer = ({seconds}) => {
  const [state, setState] = useState(false)
  // const btn = false
  const [remainingSeconds, setRemainingSeconds] = useState(seconds)
  
  const secondsLeft = remainingSeconds % 60;
  const minutesLeft = Math.floor(remainingSeconds / 60) % 60;
  const hoursLeft = Math.floor(remainingSeconds / 3600);

  useEffect(() => {
    let timerId
    if (!state && remainingSeconds > 0) {
      timerId = setTimeout(() => {
        setRemainingSeconds(remainingSeconds - 1)
      }, 1000)
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [state, remainingSeconds])

  const handlePause = () => {
    setState(!state)
    if (state) {
      setInterval(remainingSeconds, 1000)
    }
  }
  

  return (
    <>
         <div>
          <p>{!state && hoursLeft + ':' + minutesLeft + ':' + secondsLeft}</p>
         </div>
         <button onClick={handlePause}>Пауза</button>
        
         </>
  )
}

const Watch = ({seconds}) => {

  const secondsLeft = (seconds % 60)*6
  const minutesLeft = (Math.floor(seconds / 60) % 60)*6
  const hoursLeft = (seconds / 3600)*30
  


 const background = {
  backgroundImage: `url(${clockBackground})`,
  height: '400px',
  width: '400px',
  position: 'relative'
 }

 const hoursHand = {
  backgroundImage: `url(${clockHours})`,
  height: '400px',
  width: '400px',
  position: 'absolute',
  transform: `rotate(${hoursLeft}deg)`,
  zIndex : '1'
 }

 const minutesHand = {
  backgroundImage: `url(${clockMinutes})`,
  height: '400px',
  width: '400px',
  position: 'absolute',
  transform: `rotate(${minutesLeft}deg)`,
  zIndex : '2',
  // transition: '1 ease-in'
 }

 const secondsHand = {
  backgroundImage: `url(${clockSeconds})`,
  height: '400px',
  width: '400px',
  position: 'absolute',
  transform: `rotate(${secondsLeft}deg)`,
  zIndex : '3',
  // transition: '0.05s ease'
 }


  return (

    <div style={background}>
      <div style={hoursHand}></div>
      <div style={minutesHand}></div>
      <div style={secondsHand}></div>

    </div>
  )
}



const NewTimerControl = ({seconds}) => {
  const [secondsState, setSeconds] = useState(Math.floor(seconds % 60))
  const [minutes, setMinutes] = useState(Math.floor((seconds / 60) % 60))
  const [hours, setHours] = useState(Math.floor(seconds / 3600))
  const [timerActive, setTimerActive] = useState(false)

  const handleStart = () => {
    setTimerActive(true)
  }

  const handleStop = () => {
    setTimerActive(false)
  }

  useEffect(() => {
    let interval = null;

    if (timerActive && (secondsState > 0 || minutes > 0 || hours > 0)) {
      interval = setInterval(() => {
        if (secondsState === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(interval)
            } else {
              setHours((hours) => hours - 1)
              setMinutes(59)
              setSeconds(59)
            }
          } else {
            setMinutes((minutes) => minutes - 1)
            setSeconds(59);
          }
        } else {
          setSeconds((secondsState) => secondsState - 1)
        }
      }, 1000);
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [timerActive, secondsState, minutes, hours])

  const hoursHandleChange = (event) => {
    setHours(Number(event.target.value))
  }

  const minutesHandleChange = (event) => {
    setMinutes(Number(event.target.value))
  }

  const secondsHandleChange = (event) => {
    setSeconds(Number(event.target.value))
  }

  return (
    <>
     <input type="number" value={hours} onChange={hoursHandleChange} />
      <input type="number" value={minutes} onChange={minutesHandleChange} />
      <input type="number" value={secondsState} onChange={secondsHandleChange} />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  )
}



const App = () => 


<div class="wrapper">
 
  <Spoiler header={<h1>Заголовок</h1>} open>
    Контент 1
    <p>
        лорем ипсум траливали и тп.
    </p>
</Spoiler>


<Spoiler open>
    <h2>Контент 2</h2>
    <p>
        лорем ипсум траливали и тп.
    </p>
</Spoiler>

<RangeInput min={1} max={10} />
<br></br>
<LoginForm></LoginForm>
<br></br>
<PasswordConfirm min={2}></PasswordConfirm>
<br></br>
<Timer1 ms={1000}></Timer1>
<Timer2 sec={300}></Timer2>
<br></br>
<TimerControl></TimerControl>
<br></br>
{/* <SecondsTimer seconds={10}></SecondsTimer> */}
<TimerContainer seconds={180} refresh={100} render={SecondsTimer}/>
<br></br>
<TimerContainer seconds={1800} refresh={100} render={LCDTimer}></TimerContainer>
<br></br>
<TimerContainer seconds={18000  } refresh={1000} render={Watch}></TimerContainer>
{/* <Watch seconds={1800}></Watch> */}
<TimerContainer seconds={18000  } refresh={100} render={NewTimerControl}></TimerContainer>




</div>

export default App;