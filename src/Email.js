import React, {useState} from 'react'

function Email() {
    function saveInStorage() {
        localStorage.setItem("email-mochilao", email);
        window.location.reload()
    }

    const [email, setEmail] = useState("")
    return <div className='email'>
        <h1 className='text-title'>Monte sua viagem e ache hospedagens</h1>
        <div className="email-box">
            <input placeholder='email' className='email-input' onChange={e => setEmail(e.target.value)}></input>
            <button onClick={saveInStorage} className="email-button">Enviar</button>
        </div>
        </div>
}

export default Email;