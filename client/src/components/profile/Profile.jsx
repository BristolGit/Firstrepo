import {  useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './Profile.css';

const ProfilePage = () => {
  
  const [favoriteDrugs, setfavoriteDrugs] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(async () => {
    await fetch(`http://localhost:8885/drugs?id=${username}`)
    .then(response => response.json())
    .then(drugs => setfavoriteDrugs(drugs));
    console.log(favoriteDrugs);
  }, []);

  const removeFavourite = async (drug) => {
    const newFavList = favoriteDrugs.filter((d) => d !== drug);
    setfavoriteDrugs(newFavList);
    await fetch(`http://localhost:8885/drug`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        drug_id: drug.drug_id,
      })
    });
  };

  const capitalize = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
  <div className="rootProfile">
    <Grid>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          marginBottom: '20px',
        }}
      >
        {capitalize(username)}&apos;s Favourites
      </Typography>
    </Grid>
    <table>
      <tr>
        <th>Brand Name</th>
        <th>Generic Name</th>
        <th>Active Ingredients</th>
        <th>Strength</th>
        <th>Favorite</th>
      </tr>
      {favoriteDrugs.map(drug => (
        <tr>
          <td>{drug.details.brand_name}</td>
          <td>{drug.details.generic_name}</td>
          <td>{drug.details.active_ingredients.map(ing => (
            <li>{ing.name}</li>
          ))}</td>
          <td>{drug.details.active_ingredients.map(ing => (
            <li>{ing.strength}</li>
          ))}</td>
          <td> { <StarIcon className="favIcon" onClick={() => removeFavourite(drug)}/>} </td>
        </tr>
      ))}
    </table>
  </div>);
};

export default ProfilePage;
