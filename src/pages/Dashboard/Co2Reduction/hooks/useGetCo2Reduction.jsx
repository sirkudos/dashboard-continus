import { useState } from "react";
import axios from "../../../../Authorization/Axios";
import { co2ReductionAPI } from "../../../../Authorization/ServerPaths";

export const useGetCo2Reduction = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const getCo2Reduction = async (searchFilter) => {
    const url = `${co2ReductionAPI}/${searchFilter}`;
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setData(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setError(error?.response?.message);
    }
  };

  return { getCo2Reduction, data, isLoading, error };
};
