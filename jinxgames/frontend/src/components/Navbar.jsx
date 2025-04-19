import {Link} from 'react-router-dom'


function Navbar(){
    return(
        <>
        <nav>
            <Link to="/Home">Home</Link>
            <Link to="/games">Games</Link>
            <Link to="/login">Login</Link>
        </nav>

        </>
    )
}
export default Navbar