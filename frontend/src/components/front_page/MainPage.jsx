import React, { useEffect, useState } from "react"

import BestSells from "./BestSells"
import ComingSoon from "./ComingSoon"
import FeaturedCategories from "./FeaturedCategories"
import Footer from "./Footer"
import Hero from "./Hero"
import Navbar from "./Navbar"
import NewReleases from "./NewReleases"
import Offer from "./Offer"
import { getProducts } from "../routes/ProductRoutes"
import UseShowProducts from "./UseShowProducts"

const MainPage = () => {

    return (
        <>
        <Navbar />
        <div className="max-w-7xl mx-auto bg-white">
        <Hero />
        <FeaturedCategories />
        <BestSells />
        <NewReleases />
        <ComingSoon />
        <Offer />
        <BestSells />
        <NewReleases />
        </div>
        <Footer />
        </>

    )
}

export default MainPage