import React from "react";
import { Spinner } from "./Spinner";
import { groceryFetcher } from "./groceryFetcher";
import { useEffect } from "react";

const MDN_URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

/**
 * Creates and returns a new promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to delay
 * @returns {Promise<undefined>} a promise that resolves with the value of `undefined` after the specified delay
 */
function delayMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function GroceryPanel(props) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [groceryData, setGroceryData] = React.useState([]);
    const [currDropdown, setCurrDropdown] = React.useState('MDN');

    useEffect(() => {
        fetchData(currDropdown);
        return () => {
            isStale = true;
        };
    }, [currDropdown]);

    let isStale = false;
    // console.log(`isStale set to false`)
    async function fetchData(url) {
        console.log("fetching data from " + url + " isStale is " + isStale);
        setGroceryData([]);
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

    function handleAddTodoClicked(item) {
        const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
        props.onAddToTodos(todoName);
    }

    function handleDropdownChange(changeEvent) {
        setError(null);
        setGroceryData([]);
        const url = changeEvent.target.value;
        if (url) {
            setCurrDropdown(url)
            // fetchData(url);
        }
    }

    return (
        <div>
            <h1 className="text-xl font-bold pt-6">Groceries prices today</h1>
            <label className="mb-4 flex gap-4">
                Get prices from:
                <select value={currDropdown} onChange={handleDropdownChange} className="border border-gray-300 p-1 rounded-sm disabled:opacity-50">
                    <option value="MDN">MDN</option>
                    <option value="Liquor store">Liquor store</option>
                    <option value="Butcher">Butcher</option>
                    <option value="whoknows">Who knows?</option>
                </select>
                { isLoading && <Spinner className="mt-1" />}
                { error && <p className="text-red-600">Sorry, error occured</p>}
            </label>

            {
                groceryData.length > 0 ?
                    <PriceTable items={groceryData} onAddClicked={handleAddTodoClicked} /> :
                    "No data"
            }
        </div>
    );
}

function PriceTable(props) {
    return (
        <table className="mt-4">
            <thead>
            <tr>
                <th className="text-left">Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {
                props.items.map(item =>
                    <PriceTableRow
                        key={item.name}
                        item={item}
                        onAddClicked={() => props.onAddClicked(item)}
                    />
                )
            }
            </tbody>
        </table>
    );
}

function PriceTableRow({item, onAddClicked}) {
    const buttonClasses = `italic px-2 rounded-sm border border-gray-300
        hover:bg-gray-100 active:bg-gray-200 cursor-pointer`;
    return (
        <tr>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>
                <button className={buttonClasses} onClick={onAddClicked}>
                    Add to todos
                </button>
            </td>
        </tr>
    );
}
