import { useState } from 'react';
import './App.css';
import foodsFromJson from './foods.json';
import FoodBox from './components/FoodBox';
import AddFood from './components/AddFood';

import { Divider, Input, Button } from 'antd';

function App() {
  const [foodArr, setFoodArr] = useState(foodsFromJson);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  const addFood = (newFoodObj) => {
    //update list of foods
        setFoodArr( (prevListOfFoods) => {
            const newList = [newFoodObj, ...prevListOfFoods];
            return newList;
        });
  }

  const deleteFood = (nameOfFoodToDelete) => {
    // calc the new list of foods
    const newListOfFoods = foodArr.filter((food) => {
      return food.name !== nameOfFoodToDelete;
    });
    //update state
    setFoodArr(newListOfFoods);
  }

  const foodsToDisplay = foodArr.filter ( (food) => {
    return food.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="App">
      <Divider>Search</Divider>

      <Input 
        type="text" 
        name="searchQuery"
        placeholder="Find food(s)"  
        value={searchQuery} 
        onChange={(e) => { setSearchQuery(e.target.value) }} />
      
      <Button onClick={() => {setShowForm(!showForm)}}>
        {
          showForm ? "Hide Form" : "Add New Food"
        }
      </Button>
      {showForm && <AddFood callbackToAdd={addFood} />}
      {/* {isLoggedIn && <AdminPanel />} */}

      <Divider>Food List</Divider>

      {foodsToDisplay.map((foodObj) => {
        return (
          <>
          <FoodBox key={foodObj.name} food={foodObj} callbackToDelete={deleteFood}/> 
          </>
        );
      })}
    </div>
  );
}

export default App;
