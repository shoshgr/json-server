import "../index.css"
const Info = () => {

    let user = JSON.parse(localStorage.getItem("cur_user"));

    return (
        <div id="info">
            <h2>user {user.id} Info:</h2>
            <h4>name : <small>{user.name}</small> </h4>
            <h4>username : <small>{user.username}</small> </h4>
            <h4>email : <small> {user.email}</small></h4>
            <h3>address : </h3>
            <h4>street :<small>{user.address.street}</small></h4>
            <h4>suite : <small>{user.address.suite}</small> </h4>
            <h4>city : <small>{user.address.city}</small> </h4>
            <h4>zipcode : <small> {user.address.zipcode}</small> </h4>
            <h3>geo :</h3>
            <h4>lat : <small>{user.address.geo.lat}</small> </h4>
            <h4>lng : <small>{user.address.geo.lng}</small></h4>
            <h4>phone : <small>{user.phone}</small> </h4>
            <h3>company:</h3>
            <h4>name : <small>{user.company.name}</small> </h4>
            <h4>catchPhrase :  <small>{user.company.catchPhrase}</small> </h4>
            <h4>bs : <small>{user.company.bs}</small> </h4>
        </div>
    );
}

export default Info;