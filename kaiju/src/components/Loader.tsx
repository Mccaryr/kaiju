import godzillaLoader from '../assets/godzillaLoader.gif'

const Loader = () => {
    return (
        <div className="loader z-10">
            <h3 className='items-center'>Loading...</h3>
            <img src={godzillaLoader}
                 alt={'Loading...'}
                 className="w-[200px]"
                 />

        </div>
    )
}
export default Loader
