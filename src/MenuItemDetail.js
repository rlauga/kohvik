// MenuItemDetail.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const MenuItemDetail = ({ onAddCustomizedItem, language }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  const [excludedIngredients, setExcludedIngredients] = useState([]);

  useEffect(() => {
    if (!item) {
      navigate('/');
    }
  }, [item, navigate]);

  if (!item) return null;

  const showCustomization = ['starter', 'main'].includes(item.category);

  const allIngredients = item.description?.[language]
    ?.replace(/[()]/g, '')
    ?.split(',')
    ?.map((ing) => ing.trim()) || [];

  const toggleIngredient = (ingredient) => {
    setExcludedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleConfirm = () => {
    const customizedItem = {
      ...item,
      excludedIngredients,
    };
    onAddCustomizedItem(customizedItem);
    navigate('/');
  };

  return (
    <div className="App">
      <h2>{item.name[language]}</h2>
      <p>{item.description[language]}</p>

      {showCustomization && (
        <>
          <h3>
            {language === 'et' && 'Eemalda koostisosad'}
            {language === 'en' && 'Remove Ingredients'}
            {language === 'ru' && 'Удалить ингредиенты'}
          </h3>
          <div className="ingredients-list">
            {allIngredients.map((ingredient) => (
              <label key={ingredient} className="ingredient-option">
                <input
                  type="checkbox"
                  checked={!excludedIngredients.includes(ingredient)}
                  onChange={() => toggleIngredient(ingredient)}
                />
                {ingredient}
              </label>
            ))}
          </div>
        </>
      )}

      <button onClick={handleConfirm}>
        {language === 'et' && 'Lisa ostukorvi'}
        {language === 'en' && 'Add to Cart'}
        {language === 'ru' && 'Добавить в корзину'}
      </button>
    </div>
  );
};

export default MenuItemDetail;
