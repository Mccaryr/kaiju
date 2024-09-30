import godzillaHeader from '../assets/godzillaHeader.jpeg'
import '../styles/layout/header.scss'

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <p>Kaiju Project Manager</p>
                <p style={{textAlign:'center', fontWeight:'bolder'}}>Unleash the Beast...</p>
                <p style={{textAlign:'end', fontWeight: 'bolder'}}>Of Efficiency</p>
            </div>
            <div className="header-right">
                <img src={godzillaHeader} alt={"Godzilla roaring"} />
            </div>
        </header>
    )
}
export default Header
