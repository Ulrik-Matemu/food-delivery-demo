import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreCotext'
import { AuthContext } from '../../context/AuthContext'
import LoginPopup from '../LoginPopup/LoginPopup'

const FoodItem = ({id,name,price,description,image}) => {
  const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);
  const {user} = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);

  const handleAddToCart = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    addToCart(id);
  };

  return (
    <div className='food-item'>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="food-item-img-container">
        <img className='food-item-image' src={image} alt="" />
        {!cartItems[id]
          ?<img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="" />
          :<div className='food-item-counter'>
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={handleAddToCart} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price">Tsh {price}</p>
      </div>
    </div>
  )
}

export default FoodItem
