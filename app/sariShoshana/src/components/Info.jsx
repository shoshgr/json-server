

const Info = () => {
    let user = JSON.parse( localStorage.getItem("cur_user"));
    return (
        <>
            <h2><strong>Info:</strong></h2>
            <strong>name :</strong>  <h4>{user.name}</h4>
            <h4><strong>username :</strong> {user.username}</h4>
            <h4><strong>email :</strong> {user.email}</h4>
            <h3><strong>address :</strong></h3>
            <h4><strong>street :</strong> {user.address.street}</h4>
            <h4><strong>suite :</strong> {user.address.suite}</h4>
            <h4><strong>city :</strong> {user.address.city}</h4>
            <h4><strong>zipcode :</strong> {user.address.zipcode}</h4>
            <h3><strong>geo :</strong></h3>
            <h4><strong>lat :</strong> {user.address.geo.lat}</h4>
            <h4><strong>lng :</strong> {user.address.geo.lng}</h4>
            <h4><strong>phone :</strong> {user.phone}</h4>
            <h3>company:</h3>
            <h4><strong>name :</strong> {user.company.name}</h4>
            <h4><strong>catchPhrase :</strong> {user.company.catchPhrase}</h4>
            <h4><strong>bs :</strong> {user.company.bs}</h4>
    
      
      

        </>
    );
}

export default Info;