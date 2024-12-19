import React, { useState, useEffect } from 'react';

const SearchComponent = ({ onSuggestionSelect }) => {
 const [data, setData] = useState([]);
 const [searchTerm, setSearchTerm] = useState('');
 const [suggestions, setSuggestions] = useState([]);

 useEffect(() => {
    fetchDataFromCSV();
 }, []);

 const fetchDataFromCSV = () => {
    fetch('/100cpt.csv')
      .then((response) => response.text())
      .then((csvData) => {
        const rows = csvData.split('\n');
        const parsedData = rows.slice(1).map((row) => {
          const [code, label] = row.split(',');
          return { code, label };
        });
        setData(parsedData);
      })
      .catch((error) => {
        console.error('Error fetching CSV file:', error);
      });
 };

 const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    return inputValue === 0
      ? []
      : data.filter((item) =>
          item.label && item.label.toLowerCase().includes(inputValue)
        );
 };

 const onInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSuggestions(getSuggestions(value));
 };

 const onSuggestionClick = (suggestion) => {
    setSearchTerm(`${suggestion.code} - ${suggestion.label}`);
    setSuggestions([]); // Clear suggestions
    onSuggestionSelect({ code: suggestion.code, name: suggestion.label }); // Pass an object with both code and name
   };

 return (
    <div className="relative max-w-md mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          value={searchTerm}
          onChange={onInputChange}
          placeholder="Type a term"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <ul className="absolute w-full mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-10">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => onSuggestionClick(suggestion)} className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md cursor-pointer">
              {suggestion.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
 );
};

export default SearchComponent;
