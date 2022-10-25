import React, { useEffect, useState } from 'react';
import './App.css';
import { webSocket } from 'rxjs/webSocket';
import api from './api';

const subject = webSocket('ws://localhost:4444');
var email = localStorage.getItem('email-mochilao')
subject.next({ message: email });

function Dashboard() {
  const [travel1, setTravel1] = useState([])
  const [travel2, setTravel2] = useState([])
  const [travel3, setTravel3] = useState([])
  const [travel1city, setTravel1city] = useState("")
  const [travel2city, setTravel2city] = useState("")
  const [travel3city, setTravel3city] = useState("")

    useEffect(() => {
        var email = localStorage.getItem('email-mochilao')
        api.get(`http://localhost:8083/api/v1/travel?email=${email}`)
        .then(r => {
            setTravel1city(r.data.firstLocation)
            setTravel2city(r.data.secondLocation)
            setTravel3city(r.data.thirdLocation)
        })
    }, [])

  subject.subscribe({
    next: msg => {
        if(msg.fields.city == travel1city) {
            setTravel1([...travel1, msg])
        } else if (msg.fields.city == travel2city) {
            setTravel2([...travel2, msg])
        }
        else if (msg.fields.city == travel3city) {
            setTravel3([...travel3, msg])
        }
    }, // Called whenever there is a message from the server.
    error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
    complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
   });

  return (
    <>
    <div className="Dashboard">
      <header className="App-header">
        <h1>
          Ache sua Hospedagem
        </h1>
      </header>
      <div className='travel-box'>
        <div className='travel-column'>
            <p>{travel1city}</p>
            <div className='travel-list'>
                {travel1.map((travel, index) => {
                    return <div className='travel-card' key={travel.fields.name + index}>
                                <p className='name-text'>{travel.fields.name}</p>
                            <div>
                                    <p className='street-text'>{travel.fields.street}</p>
                                    <p className='description-text'> {travel.fields.summary}</p>
                                <div className="down-box">
                                    <p className='price-text'>{`$${travel.fields.price},00 / por dia`}</p>
                                    <button className='ver-mais'>Ver mais</button>
                                </div>                
                            </div>
                        </div>
                })}
                {/* <div className='travel-card'>
                        <p className='name-text'>Nome da parada</p>
                    <div>
                            <p className='street-text'>Rua tal tal tal</p>
                            <p className='description-text'> nao pode fumar nem bebe nem nada mais</p>
                        <div className="down-box">
                            <p className='price-text'>$95,00 / por dia</p>
                            <button className='ver-mais'>Ver mais</button>
                        </div>                
                    </div>
                </div> */}
                {/* <div className='travel-card' id="travel1" key={"asdasd" + 1}>
                    <p className="namep">{`Nome da parada asda sdasdasdas dasd`}</p>
                    <p>{"Rua da parada ssdfksdfg gldkfjg dg jdfklgj dfgdfjklgjdflg"}</p>
                    <p>{"asdk asdaks kdaskdaksdkaskdaskdas aksd;lask dk sla;kdasl kk da;lsdk"}</p>
                    <p>{`$${95},00 / por dia`}</p>    
                    <button className='ver-mais'>Ver mais</button>

                </div> */}
            </div>
        </div>
        <div className='travel-column'>
            <p>{travel2city}</p>
        <div className='travel-list'>
            {travel2.map((travel, index) => {
                    return <div className='travel-card' key={travel.fields.name + index}>
                    <p className='name-text'>{travel.fields.name}</p>
                <div>
                        <p className='street-text'>{travel.fields.street}</p>
                        <p className='description-text'> {travel.fields.summary}</p>
                    <div className="down-box">
                        <p className='price-text'>{`$${travel.fields.price},00 / por dia`}</p>
                        <button className='ver-mais'>Ver mais</button>
                    </div>                
                </div>
            </div>
                })}
        </div>
        </div>
        <div className='travel-column'>
            <p>{travel3city}</p>
        <div className='travel-list'>
            {travel3.map((travel, index) => {
                    return <div className='travel-card' key={travel.fields.name + index}>
                    <p className='name-text'>{travel.fields.name}</p>
                <div>
                        <p className='street-text'>{travel.fields.street}</p>
                        <p className='description-text'> {travel.fields.summary}</p>
                    <div className="down-box">
                        <p className='price-text'>{`$${travel.fields.price},00 / por dia`}</p>
                        <button className='ver-mais'>Ver mais</button>
                    </div>                
                </div>
            </div>
                })}
        </div>
        </div>
        </div>
    </div>
    </>
  );
}

export default Dashboard;
