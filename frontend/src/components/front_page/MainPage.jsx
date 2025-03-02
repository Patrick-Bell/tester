import Hero from "./Hero"
import Navbar from "./Navbar"
import NewFigures from "./NewFigures"
import PopularFigures from "./Products"
import Specifications from "./Specifications"


const MainPage = () => {

    return (
        <>

        <Navbar />
        <Hero />
        <PopularFigures />
        <NewFigures />
        <Specifications />
        </>

    )
}

export default MainPage