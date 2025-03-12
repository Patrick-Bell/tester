import BestSells from "./BestSells"
import ComingSoon from "./ComingSoon"
import FeaturedCategories from "./FeaturedCategories"
import Footer from "./Footer"
import Hero from "./Hero"
import Navbar from "./Navbar"
import NewReleases from "./NewReleases"
import Offer from "./Offer"


const MainPage = () => {

    return (
        <>
        <Navbar />
        <div className="max-w-7xl mx-auto">
        <Hero />
        <FeaturedCategories />
        <BestSells />
        <NewReleases />
        <ComingSoon />
        <Offer />
        <BestSells />
        </div>
        <Footer />
        </>

    )
}

export default MainPage