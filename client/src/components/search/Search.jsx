import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import './Search.css';
//import { margin } from '@mui/system';
import { listOfDrugs } from './druglist';

const ListingExpirationDateModal = ({setOpenModal3}) => {
  return (
    <div className="modal3">
      <div className="modal-content">
        <span className="close" onClick={() => setOpenModal3(false)} aria-hidden="true">
          &times;
        </span>
        <h3>Listing Expiration Date:</h3>
        <p>
          This is the date when the listing record will expire if not updated
          or certified by the firm.
        </p>
      </div>
    </div>
  );
};

const DrugModal = ({selectedDrug, setOpenModal, setOpenModal2, openModal2, setOpenModal3, openModal3}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => setOpenModal(false)} aria-hidden="true">
          &times;
        </span>
        <h1>More Info</h1>
        <br/>

        <table className='modal-content-table'>
          <thead>
          <tr>
            <th>Brand Name:</th>
            <td>{selectedDrug.brand_name}</td>
          </tr>
          <tr>
            <th>Generic Name:</th>
            <td>{selectedDrug.generic_name}</td>
          </tr>
          <tr>
            <th>Manufacturer Name:</th>
            <td>{selectedDrug.openfda.manufacturer_name}</td>
          </tr>
          <tr>
            <th>Active Ingredients:</th>
            <td>
              {selectedDrug.active_ingredients &&
                selectedDrug.active_ingredients.map((ingredient) => (
                  <li key={ingredient.name}>
                    <span>{ingredient.name}</span>
                    {' ('}
                    <span>{ingredient.strength}</span>
                    {')'}
                  </li>
                ))}
            </td>
          </tr>
          <tr>
            <th>Dosage Form:</th>
            <td>{selectedDrug.dosage_form}</td>
          </tr>
          <tr>
            <th>Route of Administation:</th>
            <td>{selectedDrug.route}</td>
          </tr>
          <tr>
            <th>Drug Type:</th>
            <td>{selectedDrug.product_type}</td>
          </tr>
          {/*
          <tr>
            <th>Packaging:</th>
            <td>
              {SelectedDrug.packaging &&
                SelectedDrug.packaging.map((packaging) => (
                  <span>{packaging.description}</span>
                ))}
            </td>
          </tr>
          */}
          {selectedDrug.pharm_class && (
            <tr>
              <th>Pharmacological Class Categories:</th>
              <td>
                {selectedDrug.pharm_class &&
                  selectedDrug.pharm_class.map((pharm_class) => (
                    <li key={pharm_class}>
                      <span>{pharm_class}</span>
                    </li>
                  ))}
              </td>
            </tr>
          )}
          <tr>
            <th>Marketing Start Date:</th>
            <td>
              {selectedDrug.marketing_start_date.substring(0, 4)}
              {'/'}
              {selectedDrug.marketing_start_date.substring(4, 6)}
              {'/'}
              {selectedDrug.marketing_start_date.substring(6, 8)}
            </td>
          </tr>
          {selectedDrug.marketing_end_date && (
            <tr>
              <th>Marketing End Date:</th>
              <td>
                {selectedDrug.marketing_end_date.substring(0, 4)}
                {'/'}
                {selectedDrug.marketing_end_date.substring(4, 6)}
                {'/'}
                {selectedDrug.marketing_end_date.substring(6, 8)}
              </td>
            </tr>
          )}
          {selectedDrug.listing_expiration_date && (
            <tr>
              <th>Listing Expiration Date:</th>
              <td>
                {selectedDrug.listing_expiration_date.substring(0, 4)}
                {'/'}
                {selectedDrug.listing_expiration_date.substring(4, 6)}
                {'/'}
                {selectedDrug.listing_expiration_date.substring(6, 8)}
              </td>
              <QuestionMarkIcon
                className="favIcon"
                onClick={() => setOpenModal3(true)}
              />
              {openModal3 && <ListingExpirationDateModal setOpenModal3={setOpenModal3} />}
            </tr>
          )}
          <tr>
            <th>Marketing Category:</th>
            <td>{selectedDrug.marketing_category}</td>
            <QuestionMarkIcon
              className="favIcon"
              onClick={() => setOpenModal2(true)}
            />
            {openModal2 && <MarketingCategoryModal setOpenModal2={setOpenModal2} />}
          </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

const MarketingCategoryModal = ({setOpenModal2}) => {
  return (
    <div className="modal2">
      <div className="modal-content">
        <span className="close" onClick={() => setOpenModal2(false)} aria-hidden="true">
          &times;
        </span>
        <h3>Marketing Category:</h3>
        <p>
          Product types are broken down into several potential Marketing
          Categories, such as NDA/ANDA/BLA, OTC Monograph, or Unapproved Drug.
        </p>
      </div>
    </div>
  );
};

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [SelectedDrug, setSelectedDrug] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [sortIcon, setSortIcon] = useState('▼');
  const [placeholder, setPlaceholder] = useState('Search brand name (i.e. advil)');
  const [searchParam, setSearchParam] = useState('brand_name');
  const [numOfResults, setNumOfResults] = useState(0);
  const username = localStorage.getItem("username");

  useEffect(() => {
    //setQuery("all");
    setLoading(true);
    async function fetchUserFavourites() {
      try {
        const response = await fetch(`http://localhost:8885/drugs?id=${username}`);
        const data = await response.json();
        const detailsArray = data.map((item) => item.details);
        setFavourites(detailsArray);
        //console.log(favourites);
        //console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchUserFavourites();
    const fetchData = async () => {
      
      const response = await fetch(
        `https://api.fda.gov/drug/ndc.json?search=${searchParam}:${query}&limit=1000`
      );
      const data = await response.json();
      if (data.results) {

        //remove results with null values for drug strengh
        const filteredResults1 = data.results.filter((result) => {
          return (
            result.active_ingredients &&
            result.active_ingredients.some((drugResult) => drugResult.strength)
          );
        });

        // Remove duplicates from product_ndc using Set
        const uniqueProductNdc = new Set();
        const filteredResults2 = filteredResults1.filter((result) => {
          if (!uniqueProductNdc.has(result.product_ndc)) {
            uniqueProductNdc.add(result.product_ndc);

            return true;
          }
          
          return false;
        });

        setResults(filteredResults2);
        setNumOfResults(filteredResults2.length);
        /*
        //set user favourited drugs here so it displays as favourited already if they favourited it before and it appears in other search results
        //will need to get all the pre-existing user favourited drugs and set them here.
        setFavourites();
        */
      } else {
        setResults([]);
        setNumOfResults(0);
      }
    };

    fetchData().then(() => setLoading(false));
    
  }, [searchParam, query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(event.target.elements.search.value);
    setSearched(true);
  };

  const addFavourite = async (favouritedDrug) => {
    const isAlreadyFavourited = favourites.some(drug => drug.product_ndc === favouritedDrug.product_ndc); // check if the drug already exists in favourites
    if (!isAlreadyFavourited) {
      setFavourites([...favourites, favouritedDrug]); //updates all the favourited drugs selected on the page
      //console.log(favourites); //testing to see if it shows all the favourited drugs, shows it one render behind but setting favourites works as intended
    }
    // Associate the favorited drug to the user
    await fetch('http://localhost:8885/drug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        details: favouritedDrug,
      }),
    });
  };

  const removeFavourite = async (favouritedDrug) => {
    const updatedFavourites = favourites.filter(drug => drug.product_ndc !== favouritedDrug.product_ndc);
    setFavourites(updatedFavourites);
    console.log(favouritedDrug);
    await fetch('http://localhost:8885/drugNDC', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ndc: favouritedDrug.product_ndc,
      }),
    });
  };


  const sortTable = (key, direction) => {
    if (!results) {
      return; // return early if results is null or undefined
    }
    if (key === 'strength') {
      const sortedData = results.sort((a, b) => {
        if (
          Math.max(
            ...Object.values(a.active_ingredients).map((obj) =>
              parseFloat(obj[key])
            )
          ) <
          Math.max(
            ...Object.values(b.active_ingredients).map((obj) =>
              parseFloat(obj[key])
            )
          )
        ) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (
          Math.max(
            ...Object.values(a.active_ingredients).map((obj) =>
              parseFloat(obj[key])
            )
          ) >
          Math.max(
            ...Object.values(b.active_ingredients).map((obj) =>
              parseFloat(obj[key])
            )
          )
        ) {
          return direction === 'ascending' ? 1 : -1;
        }

        return 0;
      });

      setResults(sortedData);
      setSortConfig({ key, direction });
      setSortIcon(direction === 'ascending' ? '▲' : '▼');
    }

    if (key === 'manufacturer_name') {
      const sortedData = results.sort((a, b) => {
        if (a.openfda[key] < b.openfda[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a.openfda[key] > b.openfda[key]) {
          return direction === 'ascending' ? 1 : -1;
        }

        return 0;
      });
      setResults(sortedData);
      setSortConfig({ key, direction });
      setSortIcon(direction === 'ascending' ? '▲' : '▼');
    } else {
      const sortedData = results.sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }

        return 0;
      });
      setResults(sortedData);
      setSortConfig({ key, direction });
      setSortIcon(direction === 'ascending' ? '▲' : '▼');
    }
  };  

  return (
    <div className="rootSearch">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <img src="/logo.png" alt="MedBud Logo" className="logoSearch" />
        </Grid>
        <Grid item>
          <Typography
            variant="h3"
            noWrap
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Search Drugs
          </Typography>
        </Grid>
        <div>
          <form onSubmit={handleSubmit}>

            <div style={{ margin: '10px' }}>
              <label style={{ margin: '5px' }}>Search by:</label>
              <select
                className='searchBy'
                style={{ margin: '5px' }}
                onChange={(event) => {
                  setPlaceholder(event.target.value);
                  //console.log(event.target.value);
                  if (event.target.value === 'Search brand name (i.e. advil)') {
                    setSearchParam('brand_name');
                    //console.log(searchParam);
                  } else if (
                    event.target.value ===
                    'Search generic name (i.e. ibuprofen)'
                  ) {
                    setSearchParam('generic_name');
                    //console.log(searchParam);
                  }
                }}
              >
                <option value="Search brand name (i.e. advil)">
                  Brand Name
                </option>
                <option value="Search generic name (i.e. ibuprofen)">
                  Generic Name
                </option>
              </select>
            </div>

            <input
              className="searchBar"
              type="text"
              name="search"
              placeholder={placeholder}
              autoComplete="on"
              list="listOfDrugs"
            />
            <datalist id="listOfDrugs">
              {listOfDrugs.map((drug) => (
                <option key={drug} value={drug} aria-label="Save" />
              ))}
            </datalist>
            <button className="button" type="submit">
              Search
            </button>

          </form>
          <p>{numOfResults} Results</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th
                    className={
                      sortConfig.key === 'brand_name'
                        ? sortConfig.direction
                        : null
                    }
                    onClick={() => {
                      if (
                        sortConfig.key === 'brand_name' &&
                        sortConfig.direction === 'ascending'
                      ) {
                        sortTable('brand_name', 'descending');
                      } else {
                        sortTable('brand_name', 'ascending');
                      }
                    }}
                  >
                    Brand Name{' '}
                    {sortConfig.key === 'brand_name' ? sortIcon : ' ▲▼'}
                  </th>
                  <th
                    className={
                      sortConfig.key === 'generic_name'
                        ? sortConfig.direction
                        : null
                    }
                    onClick={() => {
                      if (
                        sortConfig.key === 'generic_name' &&
                        sortConfig.direction === 'ascending'
                      ) {
                        sortTable('generic_name', 'descending');
                      } else {
                        sortTable('generic_name', 'ascending');
                      }
                    }}
                  >
                    Generic Name{' '}
                    {sortConfig.key === 'generic_name' ? sortIcon : ' ▲▼'}
                  </th>
                  <th
                    className={
                      sortConfig.key === 'manufacturer_name'
                        ? sortConfig.direction
                        : null
                    }
                    onClick={() => {
                      if (
                        sortConfig.key === 'manufacturer_name' &&
                        sortConfig.direction === 'ascending'
                      ) {
                        sortTable('manufacturer_name', 'descending');
                      } else {
                        sortTable('manufacturer_name', 'ascending');
                      }
                    }}
                  >
                    Manufacturer{' '}
                    {sortConfig.key === 'manufacturer_name' ? sortIcon : ' ▲▼'}
                  </th>
                  <th>Active Ingredients</th>

                  <th
                    className={
                      sortConfig.key === 'strength'
                        ? sortConfig.direction
                        : null
                    }
                    onClick={() => {
                      if (
                        sortConfig.key === 'strength' &&
                        sortConfig.direction === 'ascending'
                      ) {
                        sortTable('strength', 'descending');
                      } else {
                        sortTable('strength', 'ascending');
                      }
                    }}
                  >
                    Strength {sortConfig.key === 'strength' ? sortIcon : ' ▲▼'}
                  </th>

                  <th>Favourite</th>
                </tr>
              </thead>
              <tbody>
                {results && results.length > 0
                  ? results.map((result) => (
                      <tr key={result.product_ndc}>
                        <td>
                          <button
                            className='tableButton'
                            type="button"
                            onClick={() => {
                              setSelectedDrug(result);
                              setOpenModal(true);
                              }}
                            >{result.brand_name}
                          </button>
                        </td>
                        <td>
                          <button
                            className='tableButton'
                            type="button"
                            onClick={() => {
                              setSelectedDrug(result);
                              setOpenModal(true);
                              }}
                            >{result.generic_name}
                          </button>
                        </td>
                        <td>
                          <button
                            className='tableButton'
                            type="button"
                            onClick={() => {
                              setSelectedDrug(result);
                              setOpenModal(true);
                              }}
                            >{result.openfda.manufacturer_name}
                          </button>
                        </td>
                        <td>
                          <ul>
                            {result.active_ingredients &&
                              result.active_ingredients.map((ingredient) => (
                                <li key={ingredient.name}>
                                  <button
                                    className='tableButton'
                                    type="button"
                                    onClick={() => {
                                      setSelectedDrug(result);
                                      setOpenModal(true);
                                      }}
                                    >{ingredient.name}
                                    </button>
                                  {/* for showing the strength next to the ingredient in the same column

                              {' ('}<span>{ingredient.strength}</span>{')'}
                              
                              */}
                                </li>
                              ))}
                          </ul>
                        </td>
                        <td>
                          <ul style={{ paddingLeft: '12px', width: '100%' }}>
                            {result.active_ingredients &&
                              result.active_ingredients.map((ingredient) => (
                                <li key={ingredient.strength}>
                                  <button
                                    className='tableButton'
                                    type="button"
                                    onClick={() => {
                                      setSelectedDrug(result);
                                      setOpenModal(true);
                                      }}
                                    >{ingredient.strength}
                                  </button>
                                </li>
                              ))}
                          </ul>
                        </td>
                        <td>
                        {favourites.some((item) => item.product_ndc === result.product_ndc) ? (
                          // If an object in `favourites` has the same `id` as `result`, render a filled `StarIcon` and attach a click event that removes the corresponding object from `favourites`
                          <StarIcon
                            className="favIcon"
                            onClick={() => {                             
                              removeFavourite(result);
                              //console.log(favourites);
                            }}
                          />
                        ) : (
                          // Otherwise, render an outlined `StarBorderIcon` and attach a click event that adds `result` to `favourites`
                          <StarBorderIcon
                            className="favIcon"
                            onClick={() => {
                              addFavourite(result);
                            }}
                          />
                        )}
                        </td>
                        {openModal && <DrugModal selectedDrug={SelectedDrug} setOpenModal={setOpenModal} setOpenModal2={setOpenModal2} openModal2={openModal2} setOpenModal3={setOpenModal3} openModal3={openModal3} />}
                      </tr>
                    ))
                  : searched && (
                      <tr>
                        <td colSpan="7">No results found</td>
                      </tr>
                    )}
              </tbody>
            </table>
          )}
        </div>
      </Grid>
    </div>
  );
};

export default SearchPage;
