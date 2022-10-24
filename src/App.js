import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
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
  RecipeDrinks } from './Pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/meals/:id-da-receita" component={ DetailsMeals } />
      <Route exact path="/meals/:id-da-receita/in-progress" component={ RecipeMeals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id-da-receita" component={ DetailsDrinks } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/drinks/:id-da-receita/in-progress" component={ RecipeDrinks } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/profile" component={ Profile } />
    </Switch>
  );
}
export default App;
