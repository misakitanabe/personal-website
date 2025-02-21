import React from "react";
import { groceryFetcher } from "./groceryFetcher";
import { useEffect } from "react";

export function useGroceryFetch(currDropdown) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [groceryData, setGroceryData] = React.useState([]);

    useEffect(() => {
        let isStale = false;
        fetchData(currDropdown);

        async function fetchData(url) {
            console.log("fetching data from " + url + " isStale is " + isStale);
            setGroceryData([]);
            setError(null);
            setIsLoading(true);
            try {
                const response = await groceryFetcher.fetch(url);
                if (!isStale) {
                    setGroceryData(response);
                }
            } catch (error) {
                if (!isStale) {
                    setError(error);
                    console.log(error);
                }
            }
            if (!isStale) {
                setIsLoading(false);
            }
        }

        return () => {
            isStale = true;
        };
    }, [currDropdown]);

    return {isLoading, error, groceryData};
}