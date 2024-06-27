import axios from 'axios';
import React, { useEffect, useState } from 'react'

type Chef = {
    _id: string;
    username: string;
    email: string;
    restaurant: string;
    gender: string;
    isVerified: boolean;
};

const VegRecipes = () => {
    const [chefs, setChefs] = useState<Chef[]>([]);

    useEffect(() => {
        const getChefs = async () => {
            try {
                const response = await axios.get('/api/get-chefs');
                setChefs(response.data.data);
            } catch (error) {
                console.error('Error fetching chefs:', error);
            }
        };
        getChefs();
    }, []);

    const CapitalizeText = (e: string) => {
        console.log(e)
        return e.charAt(0).toUpperCase() + e.slice(1);
    }
    return (
        <>

        </>
    )
}

export default VegRecipes
