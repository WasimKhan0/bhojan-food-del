import React, { useContext, useState } from 'react'
import "./FoodDisplay.css"
// import "../FoodItem/FoodItem.css"
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
const FoodDisplay = ({category}) => {
    const {food_list}=useContext(StoreContext)

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filter the food list based on the category
    const filteredFoodList = food_list.filter(item => category === 'All' || category === item.category);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredFoodList.length / itemsPerPage);

    // Calculate the items to display on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = filteredFoodList.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`page-number ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>

         <div className="food-display-list">
            {
                itemsToDisplay.map((item,index)=>{
                  if(category==='All'|| category===item.category){
                    return <FoodItem  key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} actRating={item.actRating}/>
                  }
                })
            }
         </div>
         <div className='pagination-controls'>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    « Previous
                </button>
                {renderPageNumbers()}
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next »
                </button>
            </div>
    </div>
  )
}

export default FoodDisplay