import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import AOS from 'aos';
import {
  Login,
  Meals,
  DoneRecipes,
  FavoriteRecipes,
  Profile,
  Drinks,
  DetailsDrinks,
  DetailsMeals,
  RecipeMeals,
  RecipeDrinks,
} from './Pages';
import 'aos/dist/aos.css'; // You can also use <link> for styles

function App() {
  AOS.init();
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/meals/:id" component={ DetailsMeals } />
      <Route exact path="/meals/:id/in-progress" component={ RecipeMeals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ DetailsDrinks } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeDrinks } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/profile" component={ Profile } />
    </Switch>
  );
}
export default App;
