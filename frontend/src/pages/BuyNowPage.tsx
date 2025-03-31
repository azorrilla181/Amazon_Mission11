import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

function BuyNowPage() {
  const navigate = useNavigate();
  //   const location = useLocation();
  //   const { title, price } = location.state || {};
  const { bookTitle, bookID, bookPrice } = useParams();
  const { addtoCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      BookTitle: bookTitle || 'Unknown Title',
      bookPrice: bookPrice ? Number(bookPrice) : 0,
    };
    addtoCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Buy Now {bookTitle}</h2>

      <div>
        <p>
          <strong>Price:</strong> ${bookPrice}
        </p>
        {/* <button onClick={() => navigate('/cart', { state: { bookTitle, bookPrice } })}>
          Add to Cart
        </button> */}
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      {/* <div>
        <input 
            type="number" 
            placeholder="Enter amount" 
            value={bookPrice} 
            onChange={(x) => setBookPrice(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div> */}

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}
export default BuyNowPage;
