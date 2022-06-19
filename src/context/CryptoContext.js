import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { auth, db } from '../firebase';
const CryptoContext = createContext()
export const CryptoState = (props) => {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null)
    const [watchlist, setWatchlist] = useState([])
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setUser(user);
            else setUser(null);
        })
    })
    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user.uid);
            var unsubscribe = onSnapshot(coinRef, coin => {
                if (coin.exists()) {
                    setWatchlist(coin.data().coins);
                } else {
                    console.log("No Items in Watchlist");
                }
            }
            )
            return () => {
                unsubscribe()
            }
        }
    }, [user]);
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency))
        setCoins(data);
        setLoading(false);
    }
    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");
    }, [currency])

    return (
        <CryptoContext.Provider value={{ user, currency, symbol, setCurrency, setSymbol, coins, setCoins, loading, setLoading, fetchCoins, watchlist, setWatchlist }}>
            {props.children}
        </CryptoContext.Provider>
    )
}

export default CryptoContext

