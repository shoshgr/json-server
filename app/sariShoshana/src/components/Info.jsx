import "../index.css"
const Info = () => {

    let user = JSON.parse(localStorage.getItem("cur_user"));

    return (
        <div id="info">
            <h2>Info:</h2>
            <h4>name : {user.name}</h4>
            <h4>username : {user.username}</h4>
            <h4>email : {user.email}</h4>
            <h4>address :</h4>
            <h4>street :{user.address.street}</h4>
            <h4>suite :{user.address.suite}</h4>
            <h4>city : {user.address.city}</h4>
            <h4>zipcode : {user.address.zipcode}</h4>
            <h4>geo :</h4>
            <h4>lat : {user.address.geo.lat}</h4>
            <h4>lng : {user.address.geo.lng}</h4>
            <h4>phone : {user.phone}</h4>
            <h4>company:</h4>
            <h4>name : {user.company.name}</h4>
            <h4>catchPhrase : {user.company.catchPhrase}</h4>
            <h4>bs : {user.company.bs}</h4>
        </div>
    );
}

export default Info;