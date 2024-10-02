import godzillaHeader from '../assets/godzillaHeader.jpeg'
import kongHeader from '../assets/kongHeader.jpg'
import '../styles/layout/Header.scss'

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <h3>Kaiju Project Manager</h3><br/>
                <h4>Unleash the Beast...Of Efficiency</h4>
            </div>
            <div className="header-right">
                <img src={kongHeader} alt={"Kong with Gauntlet"}/>
            </div>
            <div className="header-right">
                <img src={godzillaHeader} alt={"Godzilla roaring"}/>
            </div>
        </header>
    )
}
export default Header
