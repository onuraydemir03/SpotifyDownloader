import "../styles/User.css"


const UserComponent = ({user}) => {
    return (
        <div className="user">
            <img src={user.images[0].url} alt="ProfileImage"/>
            <p className="username">{user.display_name}</p>
            <p className="follower">Has {user.followers.total} follower</p>
        </div>
    )
}

export default UserComponent;