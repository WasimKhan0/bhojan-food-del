import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from 'axios'

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const url = "http://localhost:4000"
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
            console.log(err);
        }
    };

    const fetchFoodList = async () => {
        const res = await axios.get(url + '/api/food/list');
        setFoodlist(res.data.data);
    }

    const loadCartData = async (token) => {
        const res = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
        console.log(res);

        setCartItems(res.data.cartData);

    }

    useEffect(() => {
        async function loadData() {
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
        }
        loadData();
     }, [token])

    useEffect(()=>{
        console.log(wishList)
    },[wishList])
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))

        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } })
        }
    }
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } })
        }
    }
    const getTotalCartAmount = () => {
        let totAmount = 0;
         for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totAmount += itemInfo?.price * cartItems[item];
            }
        }
        return totAmount;
    }



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
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider
