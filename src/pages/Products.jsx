import { useContext, useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import styles from "../styles/ProductPage.module.scss";
import HeroBanner from "../assets/Banners/productPageHeroBanner.webp";
import {useCart} from "../context/CartProvider.jsx"
const Products = () => {

  
  const { products } = useProductContext(); // ✅ Correct way to access products
  return (
    <div className={styles.productsPage}>
      <div className={styles.pageContainer}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.HeroBanner}>
            <img src={HeroBanner} alt="Hero Banner" />
          </div>
          <div className={styles.headerText}>
            <h1> Spices & Masalas</h1>
          </div>
        </div>

        {/* Products List */}
        <div className={styles.productsContainer}>
     
          {  products.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product}  />
            ))}
          
        </div>
      </div>
    </div>
  );
};

// Product Card Component here
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(() => {
    return product.variants?.[0];
  });

// ------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (
      !selectedVariant ||
      !product.variants.some((v) => v.weight === selectedVariant.weight)
    ) {
      setSelectedVariant(product.variants?.[0]);
    }
  }, [product.variants]); // ✅ Runs only when product.variants change

// ------------------------------------------------------------------------------------------------

  // Function to add the selected variant to the cart
  const handleAddToCart = async () => {
    addToCart(product.productId, selectedVariant.weight)
    
    
  };
// ------------------------------------------------------------------------------------------------
  return (
    <div className={styles.product}>
      <div className={styles.productCard}>
        {/* Product Image */}
        <img
          src={
            selectedVariant?.mainImage
              ? `data:image/jpeg;base64,${selectedVariant.mainImage}`
              : "fallback-image.jpg"
          }
          className={styles.productImage}
          alt={product.name}
        />

        {/* Variant Selection Buttons */}
        <div className={styles.variantButtons}>
          {product.variants?.map((variant, index) => (
            <button
              key={`${product.id}-${variant.weight}`}
              className={
                selectedVariant?.weight === variant.weight
                  ? styles.activeVariantButton
                  : ""
              }
              onClick={() => setSelectedVariant(variant)}
            >
              {variant.weight} g
            </button>
          ))}
        </div>

        {/* Product Details */}
        <div className={styles.productDetails}>
          <h3 className={styles.productName}>{product.name}</h3>
          {selectedVariant && (
            <>
              <p className={styles.priceAmount}>
                Price: ₹ {selectedVariant.price}
              </p>
              {selectedVariant.discount > 0 && (
                <p>Discount: {selectedVariant.discount}%</p>
              )}
            </>
          )}
        </div>

        {/* Buy Button */}
        <button className={styles.buyButton} onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className={styles.buyButton}>Buy Now</button>
      </div>
    </div>
  );
};

export default Products;
