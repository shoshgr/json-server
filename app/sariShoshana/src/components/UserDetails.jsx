import { useState } from 'react'

const UserDetails = () => {

    const setCurUser = (user) => {
        localStorage.setItem("cur_user", JSON.stringify(user));
    }

    return (
        <>
            <form action="">
                <label htmlFor="name">name: </label>
                <input type='text' id='name' />
                <br />
                <label htmlFor="email">email: </label>
                <input type='email' id='email' />
                <br />
                <h3>address:</h3>
                <label htmlFor="street"> street: </label>
                <input type='text' id='street' />
                <br />
                <label htmlFor="suite"> suite: </label>
                <input type='text' id='suite' />
                <br />
                <label htmlFor="city"> city: </label>
                <input type='text' id='city' />
                <br />
                <label htmlFor="zipcode"> zipcode: </label>
                <input type='text' id='zipcode' />
                <br />
                <h3>geo:</h3>
                <label htmlFor="lat"> lat: </label>
                <input type='text' id='lat' />
                <br />
                <label htmlFor="lng"> lng: </label>
                <input type='text' id='lng' />
                <br />
                <label htmlFor="phone"> phone: </label>
                <input type='text' id='phone' />
                <br />
                <h3>company:</h3>
                <label htmlFor="company_name"> name: </label>
                <input type='text' id='company_name' />
                <label htmlFor="catchPhrase"> catchPhrase: </label>
                <input type='text' id='catchPhrase' />
                <label htmlFor="bs"> bs: </label>
                <input type='text' id='bs' />
                <br />
                <button type="submit"> register</button>
            </form>
        </>
    );
}

export default UserDetails;
