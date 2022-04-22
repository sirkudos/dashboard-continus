import { useState } from "react";
import axios from '../../../../Authorization/Axios'
import { maintenanceAPI } from "../../../../Authorization/ServerPaths";





export const useGetMaintenance = () => {
    const [data, setData] = useState();
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();


    const getMaintenance = async(searchFilter) => {
        const url = searchFilter ? `${maintenanceAPI}/${searchFilter}` : maintenanceAPI;
        console.log("url", url)
        setIsLoading(true)
        try {
            const response = await axios.get(url)
            setIsLoading(false)
            console.log("maintenance ", response.data.data.records);

            setData(response.data.data.records);
            const { data: { pagination: { total_pages } } } = response.data
            setTotalPages(total_pages)
                // console.log("data driver", data);

        } catch (error) {
            setError(error.response.data.message);
            console.log("maintenance", error.response);
        }

    }


    return { data, getMaintenance, isLoading, error, totalPages }
}