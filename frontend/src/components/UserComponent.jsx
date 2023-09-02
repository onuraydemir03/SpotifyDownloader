
const UserComponent = ({user}) => {
    return (
        <div>
            {user.display_name}
            <img src={user.images[0].url} alt="ProfileImage"/>
            <p>Has {user.followers.total} follower</p>
        </div>
    )
}

export default UserComponent;