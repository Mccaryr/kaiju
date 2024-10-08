import godzillaHeader from '../assets/godzillaHeader.jpeg'
import '../styles/layout/Header.scss'

const Header = () => {
    return (
        <header className="header z-20">
            <div className="header-left md:text-2xl sm:text-sm">
                <h3>KAIJU PROJECT MANAGER</h3><br/>
                <h3 className='hidden sm:block'>UNLEASH THE BEAST...OF EFFICIENCY</h3>
            </div>
            <div className="header-right object-fill md:flex-1 sm:flex-2">
                <img src={godzillaHeader} alt={"Godzilla roaring"}/>
            </div>
        </header>
    )
}
export default Header
