import React, { useContext } from "react"

import { useLocation } from "react-router-dom"
import NavBar from "../layout/NavBar"
import MainHeader from "../layout/MainHeader"
import RoomCarousel from "../common/RoomCarousel"
const Home = () => {
	
	return (
		<div>
        <MainHeader />
		<div className="container">
				<RoomCarousel />
			</div>
        </div>
	)
}

export default Home