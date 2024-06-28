import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const url = "https://bhojan-backend-7.onrender.com"; 
    const [food_list, setFoodlist] = useState([]);
    const [showBox, setShowBox] = useState(false);
    const [itemId, setItemId] = useState("");
    const [wishList, setWishList] = useState([]);
    const [menu, setMenu] = useState('home');

    const fetchWishList = async (token) => {
        try {
            const res = await axios.get(`${url}/api/user/getwish`, { headers: { token } });
            if (res.data.success) {
                setWishList(res.data.data);
            } else {
                console.log(res.data.message);
            }
        } catch (err) {
            console.log("Fetch Wishlist Error:", err);
        }
    };

    const fetchFoodList = async () => {
        try {
            const res = await axios.get(`${url}/api/food/list`);
            setFoodlist(res.data.data);
        } catch (err) {
            console.log("Fetch Food List Error:", err);
        }
    };

    const loadCartData = async (token) => {
        try {
            const res = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            setCartItems(res.data.cartData);
        } catch (err) {
            console.log("Load Cart Data Error:", err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
                await fetchWishList(storedToken);
            } else {
                setCartItems({});
                setWishList([]);
            }
        };
        loadData();
    }, [token]);

    useEffect(() => {
        console.log(wishList);
    }, [wishList]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (err) {
                console.log("Add to Cart Error:", err);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            } catch (err) {
                console.log("Remove from Cart Error:", err);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totAmount += itemInfo?.price * cartItems[item];
            }
        }
        return totAmount;
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        showBox,
        setShowBox,
        itemId,
        setItemId,
        wishList,
        setWishList,
        menu,
        setMenu
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;