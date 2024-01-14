import { useState } from 'react'
const UserDetails =()=>{
    const setCurUser=(user)=>{
        localStorage.setItem("cur user",JSON.stringify(user));
    }
return(
    <>
   <form onSubmit={} action="">
   <label htmlFor="name">name: </label>
            <input type='text' id='name' />
            <br/>
            <label htmlFor="email">email: </label>
            <input type='email' id='email' />
            <br/>
            <h1>address:</h1>
            <br/>
            <label htmlFor="street"> street: </label>
            <input type='text' id='street' />
            <br/>
            <label htmlFor="suite"> suite: </label>
            <input type='text' id='suite' />
            <br/>
            <label htmlFor="city"> city: </label>
            <input type='text' id='city' />
            <br/>
            <label htmlFor="zipcode"> zipcode: </label>
            <input type='text' id='zipcode' />
            <br/>
            <h1>geo:</h1>
            <br/>
            <label htmlFor="lat"> lat: </label>
            <input type='text' id='lat' />
            <br/>
            <label htmlFor="lng"> lng: </label>
            <input type='text' id='lng' />
            <br/>
            <label htmlFor="phone"> phone: </label>
            <input type='text' id='phone' />
            <br/>
            <h1>company:</h1>
            <label htmlFor="company_name"> name: </label>
            <input type='text' id='company_name' />
            <label htmlFor="catchPhrase"> catchPhrase: </label>
            <input type='text' id='catchPhrase' />
            <label htmlFor="bs"> bs: </label>
            <input type='text' id='bs' />
            <br/>
            <button type="submit"> register</button>
   </form>
    
        </>
);    
}
export default UserDetails;
