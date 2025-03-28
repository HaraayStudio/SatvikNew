// import { useState, useEffect } from "react";
// import { useCart } from "../context/CartProvider";
// import { useProductContext } from "../context/ProductContext.jsx";
// import styles from "../styles/CheckoutPage.module.scss";

// const CheckoutPage = () => {
//   const { cartItems } = useCart();
//   const { products } = useProductContext();

//   const [cartProducts, setCartProducts] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [deliveryCharge] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("prepaid");

//   // Form State
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     landmark: "",
//     city: "",
//     state: "Maharashtra",
//     pincode: "",
//     phone: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isServiceable, setIsServiceable] = useState(null);

//   useEffect(() => {
//     if (products.length > 0) {
//       const processedCart = cartItems
//         .map(({ productId, weight, qty }) => {
//           const product = products.find((p) => p.productId === productId || p.id === productId);
//           if (!product) return null;

//           const variant = product.variants.find((v) => v.weight === weight);
//           if (!variant) return null;

//           return { ...variant, name: product.name, productId, weight, qty };
//         })
//         .filter(Boolean);

//       setCartProducts(processedCart);
//       const total = processedCart.reduce((sum, item) => sum + item.price * item.qty, 0);
//       setTotalAmount(total);
//     }
//   }, [products, cartItems]);

//   // Check Address Serviceability
//   const checkServiceability = async (numericPincode) => {
//     try {
//       const response = await fetch(
//         https://api.satvikraas.com/api/delhiveryOne/checkServiceability?postalcode=${numericPincode}
//       );

//       if (!response.ok) throw new Error("Failed to fetch serviceability");

//       const data = await response.json();
//       setIsServiceable(data.serviceable);
//     } catch (error) {
//       console.error("Error checking serviceability:", error);
//       setIsServiceable(false);
//     }
//   };

//   // Handle Form Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });

//     if (name === "pincode" && value.length === 6) {
//       checkServiceability(value);
//     } else if (name === "pincode") {
//       setIsServiceable(null);
//     }
//   };

//   // Validate Form
//   const validateForm = () => {
//     let newErrors = {};
//     if (!form.firstName.trim()) newErrors.firstName = "Enter a first name";
//     if (!form.lastName.trim()) newErrors.lastName = "Enter a last name";
//     if (!form.address.trim()) newErrors.address = "Enter an address";
//     if (!form.city.trim()) newErrors.city = "Enter a city";
//     if (!form.pincode.trim()) newErrors.pincode = "Enter a pincode";
//     if (!form.phone.trim()) newErrors.phone = "Enter a phone number";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle Checkout
//   const handleCheckout = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Form submitted", form);
//     }
//   };

//   return (
//     <div className={styles.checkoutPage}>
//       {/* Left Section - Address Form */}
//       <div className={styles.leftSection}>
//         <h2>Delivery</h2>
//         <form className={styles.checkoutForm} onSubmit={handleCheckout}>
//           <div className={styles.row}>
//             <input type="text" name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} />
//             <input type="text" name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} />
//           </div>  <div className={styles.row}>
//           {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
//           {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
//           </div>
//           <input type="text" name="address" placeholder="Full Address (House no., Area, etc)" value={form.address} onChange={handleChange} />
//           {errors.address && <span className={styles.error}>{errors.address}</span>}

//           <input type="text" name="landmark" placeholder="Landmark (optional)" value={form.landmark} onChange={handleChange} />

//           <div className={styles.row}>
//             <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} />
//             <input type="text" name="state" value="Maharashtra" readOnly />
//             <input type="text" name="pincode" placeholder="PIN code" maxLength="6" value={form.pincode} onChange={handleChange} />
//           </div>
//           {errors.city && <span className={styles.error}>{errors.city}</span>}
//           {errors.pincode && <span className={styles.error}>{errors.pincode}</span>}

//           {isServiceable === true && <p className={styles.success}>✅ Delivery Available!</p>}
//           {isServiceable === false && <p className={styles.error}>❌ Not Serviceable</p>}

//           <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
//           {errors.phone && <span className={styles.error}>{errors.phone}</span>}

//           <h3>Prepaid or COD</h3>
//           <label><input type="radio" name="payment" checked={paymentMethod === "prepaid"} onChange={() => setPaymentMethod("prepaid")} /> Prepaid</label>
//           <label><input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} /> Cash on Delivery - COD</label>

//           <button type="submit">Checkout</button>
//         </form>
//       </div>

//       {/* Right Section - Order Summary */}
//       <div className={styles.rightSection}>
//         <h3>Order Summary</h3>
//         <div className={styles.cartSummary}>
//         {cartProducts.map(({ productId, weight, qty, name, price, mainImage }) => (
//             <div key={${productId}-${weight}} className={styles.cartItem}>
//               <img src={data:image/jpeg;base64,${mainImage}} alt={name} className={styles.cartImage} width="80px"  height="80px"/>
//               <div className={styles.itemInfo}>
//                 <h4>{name}</h4>
//                 <p>Quantity: {qty} | {weight}g</p>
//                 <p>₹{price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

import React, { useState, useEffect } from 'react';
import { useCart } from "../context/CartProvider";
import { useProductContext } from "../context/ProductContext.jsx";
import styles from "../styles/CheckoutPage.module.scss";
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080"
  // baseURL: "https://15.207.46.61:443",
  baseURL: "https://api.satvikraas.com:443",
  // baseURL: "http://localhost:8080",

  // , // Backend URL
  withCredentials: true, // Allows cookies to be sent
  headers: {
    "Content-Type": "application/json", // JSON requests
  },
  validateStatus: (status) => {
    return (status >= 200 && status < 300) || status === 302; // Accepts 302 as valid
  },
});


// ✅ Handle Input Change
  
const CheckoutPage = () => {
  const { cartItems } = useCart();
  const { products } = useProductContext();

  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryCharge] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState({});
 
  // Existing state for form and other checkout logic
  const [form, setForm] = useState({
    name: '',
    phone: '',
    emailId: '',
    street: '',
    city: '',
    state: '',
    landmark: '',
    country: 'INDIA',
    postalCode: '',
    addressType:'OTHER'
    
  });

  
  const [formData, setFormData] = useState({
    emailId: "",
    addressType: "Home",
    postalCode: "",
    name: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    phone: "",
    paymentMethod: "prepaid",
  });

  

    
  const [errors, setErrors] = useState({});
  const [isServiceable, setIsServiceable] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('prepaid');

  // Process cart items when products are loaded
  useEffect(() => {
    if (products.length > 0) {
      const processedCart = cartItems
        .map(({ productId, weight, qty }) => {
          // Find the product in the product context
          const product = products.find((p) => p.productId === productId || p.id === productId);
          if (!product) return null;

          // Find the specific variant matching the weight
          const variant = product.variants.find((v) => v.weight === weight);
          if (!variant) return null;
console.log(product);
          // Return processed cart item with all necessary details
          return { 
            ...variant, 
            name: product.name, 
            productId, 
            weight, 
            qty,
            mainImage: variant.mainImage // Assuming mainImage is in the product object
          };
        })
        .filter(Boolean); // Remove any null items

        console.log(processedCart)
      // Update cart products state

      setCartProducts(processedCart);

      // Calculate total amount
      const total = processedCart.reduce((sum, item) => sum + item.price * item.qty, 0);
      setTotalAmount(total);
    }
  }, [products, cartItems]);

  const checkServiceability = async (numericPincode) => {
    try {
      const response = await fetch(

       ` https://api.satvikraas.com/api/delhiveryOne/checkServiceability?postalcode=${numericPincode}`
      );

      if (!response.ok) throw new Error("Failed to fetch serviceability");

      const data = await response.json();
      setIsServiceable(data.serviceable);
    } catch (error) {
      console.error("Error checking serviceability:", error);
      setIsServiceable(false);
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm(prev => ({ ...prev, [name]: value }));

  //   if (name === 'pincode') {
  //     if (value.length === 6) {
  //       checkServiceability(value);
  //     } else {
  //       setIsServiceable(null);
  //     }
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    };
  const validateForm = () => {
    const newErrors = {};

    if (!form.emailId.trim()) newErrors.email = "Enter a Email";
    if (!form.name.trim()) newErrors.firstName = "Enter a first name";
    if (!form.street.trim()) newErrors.address = "Enter an address";
    if (!form.city.trim()) newErrors.city = "Enter a city";
    if (!form.state.trim()) newErrors.state = "Enter a state";
    if (!form.postalCode.trim()) newErrors.pincode = "Enter a pincode";
    if (form.postalCode.trim().length !== 6) newErrors.pincode = "Pincode must be 6 digits";
    if (!form.phone.trim()) newErrors.phone = "Enter a phone number";
    if (form.phone.trim().length !== 10) newErrors.phone = "Phone number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleCheckout = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isServiceable === false) {
        alert("Selected area is not serviceable");
        return;
      }
      console.log("Form submitted", form);
      // Proceed with checkout
    }
  };



// Raxorpay 


const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const API_URL = "https://api.satvikraas.com/api/razorpay";



  
  // razorpay  ✅
  useEffect(() => {
    loadRazorpayScript();
   
  }, []);

   // ✅
   const handlePayment = async () => {
    try {
      console.log("in Pre payment");

      const FinaltotalAmount =
     
      totalAmount + 30  ;
      console.log(cartProducts);



      // Create order in backend




      const orderData = await payOnline(
        cartProducts,
        formData,
        true,
        FinaltotalAmount
        ,0
      );

      
      console.log(orderData);
      const options = {
        // key: "rzp_live_mJcffWL1hLYxgL",
        key: "rzp_test_YH8zCfwQrn8l5q",
        amount: FinaltotalAmount * 100, // Amount in paise
        currency: "INR",
        name: "SATVIK RASS",
        description: "Purchase Description",
        order_id: orderData.id,
        handler: async function (response) {

          console.log("completeOrderResponse" + completeOrderResponse);
          // if(completeOrderResponse)
          navigate("/ordersuccess");
        },
        prefill: {
          name: selectedAddress.name,
          email: 'customer@example.com',
          contact: selectedAddress.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed!");
    }
  };

  // upside imp 
  // downside cod
  const handleCODOrder = async () => {
    try {
      console.log("in COD payment");

      const totalAmount = totalAmount + 30 - discount;
      // Create order in backend
      const orderData = await createCODOrder(
        items,
        selectedAddress,
        needToSave,
        totalAmount
      );

      if (orderData) navigate("/ordersuccess");
      else alert("Order failed!");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Order failed!");
    }
  };

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.leftSection}>
      <form onSubmit={handleCheckout} className={styles.checkoutForm}>
      <h2>Contact</h2>
      <div className={styles.inputGroup}>
        <input
          type="email"
          name="emailId"
          placeholder="Email"
          value={formData.emailId}
          onChange={handleChange}
          className={errors.email ? styles.errorInput : ""}
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>    <div className={styles.inputGroup}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? styles.errorInput : ""}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div><div className={styles.inputGroup}>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          maxLength={10}
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? styles.errorInput : ""}
        />
      </div>

      <h2>Delivery</h2>
      <div className={styles.addresstype}>
        {["Home", "Office", "Others"].map((type) => (
        <div>
        <input
          type="radio"
          name="addressType"
          value={type}
          checked={formData.addressType === type}
          onChange={handleChange}

          
        /> <label htmlFor="">{type}</label>
       </div>
       
        ))}
      </div>

      <div className={styles.inputGrouppincode}>
        <label>Check Delivery Availability</label>
        <input
          type="text"
          name="postalCode"
          placeholder="PIN code"
          maxLength={6}
          value={formData.postalCode}
          onChange={handleChange}
          className={errors.postalCode ? styles.errorInput : ""}
        />
        {isServiceable === true && <p className={styles.serviceableText}>✅ Delivery Available!</p>}
        {isServiceable === false && <p className={styles.unserviceableText}>❌ Not Serviceable</p>}
      </div>

  

      <div className={styles.inputGroup}>
        <input
          type="text"
          name="street"
          placeholder="Full Address (House no., Area, etc)"
          value={formData.street}
          onChange={handleChange}
          className={errors.street ? styles.errorInput : ""}
        />
      </div>

      <div className={styles.inputGroup}>
        <input
          type="text"
          name="landmark"
          placeholder="Landmark (optional)"
          value={formData.landmark}
          onChange={handleChange}
        />
      </div>

      <div className={styles.addressRow}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? styles.errorInput : ""}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? styles.errorInput : ""}
          />
        </div>
      </div>

      

      <div className={styles.paymentSection}>
        <h3>Prepaid or COD</h3>
        <div className={styles.paymentOptions}>
          {["prepaid", "cod"].map((method) => (
            <label key={method} className={styles.radioLabel}>
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={formData.paymentMethod === method}
                onChange={handleChange}
              />
              <span>{method === "prepaid" ? "Prepaid" : "Cash on Delivery - COD"}</span>
            </label>
          ))}
        </div>
      </div>

      <button  onClick={() =>
                paymentMethod === "prepaid" ? handlePayment() : handleCODOrder()
              } className={styles.checkoutButton}>
            Checkout
          </button>
    </form>
      </div>

      <div className={styles.rightSection}>
        <h3>Order Summary</h3>
        <div className={styles.cartSummary}>
          {cartProducts.map((item) => (
            <div key={`${item.productId}-${item.weight}`} className={styles.cartItem}>
           {/* {     console.log(item)} */}
                
              <img 
                src={`data:image/jpeg;base64,${item.mainImage}`} 
                alt={item.name} 
                className={styles.cartImage} 
              />
              <div className={styles.itemDetails}>
                <h4>{item.name}</h4>
                <p>Quantity: {item.qty} | {item.weight}g</p>
                <p>₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.orderTotal}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Shipping</span>
            <span>₹30</span>
          </div>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.grandTotal}>₹{(totalAmount+30).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;





  

export const payOnline = async (
    items,
    selectedAddress,
    needToSave,
    totalAmount ,totalDiscount
  ) => {

    // console.log("items=====>",items)
  
    // Prepare the request payload
    const requestPayload = {
      items: items.map((item) => ({


        
        quantity: item.qty,
        productVariant: {
          id: item.id,
          price: item.price,
          discount: item.discount,
          weight: item.weight,

          finalPrice: (item.price*item.quantity)
        },
      })),
      
      selectedAddress: {
        ...selectedAddress,

        // Ensure all properties are included
        id: selectedAddress.id || 0,
        name: selectedAddress.name || "",
        phone: selectedAddress.phone || "",
        emailId: selectedAddress.emailId || "",
        postalCode: selectedAddress.postalCode || "",
        street: selectedAddress.street || "",
        city: selectedAddress.city || "",
        state: selectedAddress.state || "",
        country:  "INDIA",
        addressType: selectedAddress.addressType || "",
        
        landmark: selectedAddress.landmark || "",
      },
      needToSave,
      totalAmount,totalDiscount
    };

    console.log("requestPayload===",requestPayload)
  
    try {
      const response = await api.post(`/api/razorpay/createorder`, requestPayload // Empty body for a POST request with query parameters
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
 



















  // cod down 
  export const createCODOrder = async (
    items,
    selectedAddress,
    needToSave,
    totalAmount ,totalDiscount
  ) => {
  
  
    // Prepare the request payload
    const requestPayload = {
      items: items.map((item) => ({
        quantity: item.qty,
        productVariant: {
          id: item.id,
          price: item.price,
          discount: item.discount,
          weight: item.weight,

          finalPrice: (item.price*item.quantity)
        },
      })),
      selectedAddress: {
        ...selectedAddress,
        // Ensure all properties are included
        id: selectedAddress.id || 0,
        name: selectedAddress.name || "",
        phone: selectedAddress.phone || "",
        emailId: selectedAddress.emailId || "",
        postalCode: selectedAddress.postalCode || "",
        street: selectedAddress.street || "",
        city: selectedAddress.city || "",
        state: selectedAddress.state || "",
        country:  "INDIA",
        addressType: selectedAddress.addressType || "",
        
        landmark: selectedAddress.landmark || "",
      },
      needToSave,
      totalAmount,totalDiscount
    };
    console.log("request COD Payload===",requestPayload)
    try {
      const response = await api.post(`/api/codorders/createcodorder`,requestPayload, // Empty body for a POST request with query parameters
        {
         
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };