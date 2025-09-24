import '../App.css'
import { useState } from 'react';

function RegistrationInfo() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className="RegistrationInfo">
            <form>
                <fieldset>
                    <legend>Input Name and Email Address below:</legend>
                    <label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </label> 
                    
                </fieldset>
                <button onClick={e => {
                    alert(`Your name is ${name}. Your email is ${email}! Thanks for subscribing to our promotions.`);
                    e.preventDefault();
                }}>Subscribe</button>
            </form>
        </div>
    );
}

export default RegistrationInfo;
<label type="email" id="email" required="required"><br></br></label>