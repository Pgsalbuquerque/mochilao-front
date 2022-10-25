import React, {useState} from 'react'
import api from "./api"

function Travel() {
    const [travel, setTravel] = useState({
        travel1: "",
        travel2: "",
        travel3: ""
    })

    function saveInStorage() {
        var email = localStorage.getItem('email-mochilao')

        api.post("http://localhost:8083/api/v1/travel", {
            first_location: travel.travel1,
            second_location: travel.travel2,
            third_location: travel.travel3,
            email
        }).then(r => {
            localStorage.setItem("travel-mochilao", true);
            window.location.reload()
        }).catch(e => {
            console.log(e)
        })
        
    }

    return <div className='travel'>
        <h1 className='text-title'>Escolha 3 cidades para começar</h1>
        <div>
        <input placeholder='primeira cidade' className='travel-input' onChange={e => setTravel({
            travel1: e.target.value,
            travel2: travel.travel2,
            travel3: travel.travel3,
        })}></input>
        <input placeholder='segunda cidade' className='travel-input' onChange={e => setTravel({
            travel1: travel.travel1,
            travel2: e.target.value,
            travel3: travel.travel3,
        })}></input>
        <input placeholder='terceira cidade' className='travel-input' onChange={e => setTravel({
            travel1: travel.travel1,
            travel2: travel.travel2,
            travel3: e.target.value,
        })}></input>
        <button onClick={saveInStorage} className="travel-button">Enviar</button>
        </div>
    </div>
}

export default Travel;