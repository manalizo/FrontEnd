import React, { useEffect, useState } from "react"
import { getAllRooms } from "../utils/ApiFunctions"
import RoomCard from "./ProductCard"
import { Col, Container, Row } from "react-bootstrap"

import RoomPaginator from "../common/RoomPaginator"

const Room = () => {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [roomsPerPage] = useState(6)
	
	useEffect(() => {
		setIsLoading(true)
		getAllRooms()
			.then((data) => {
				setData(data)
				
				setIsLoading(false)
			})
			.catch((error) => {
				setError(error.message)
				setIsLoading(false)
			})
	}, [])
	if (isLoading) {
		return <div>Loading rooms.....</div>
	}
	if (error) {
		return <div className=" text-danger">Error : {error}</div>
	}

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const totalPages = Math.ceil(data.length / roomsPerPage)

	const renderRooms = () => {
		const startIndex = (currentPage - 1) * roomsPerPage
		const endIndex = startIndex + roomsPerPage
		return data
			.slice(startIndex, endIndex)
			.map((room) => <RoomCard key={room.id} room={room} />)
	}

	return (
		<Container>
			

			<Row>{renderRooms()}</Row>

			<Row>
				<Col md={6} className="d-flex align-items-center justify-content-end">
					<RoomPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>
		</Container>
	)
}

export default Room