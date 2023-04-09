
interface Genre{
   id: number;
   name: string; 
}

interface FetchGenresResponse {
   count: number;
   results: Genre[]
}

import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../Services/api-client";

const useGenres = () => {
   const [genres, setGenres] = useState<Genre[]>([]);
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

  
   useEffect(() => {
      const controller = new AbortController();

      setIsLoading(true)
      apiClient.get<FetchGenresResponse>("/games", { signal: controller.signal})
      .then((res) => { 
         setGenres(res.data.results)
         setIsLoading(false)
      })
      .catch((err) => {
         if (err instanceof CanceledError) return;
         setError(err.message)
         setIsLoading(false)
      })

      return () => controller.abort();
   },[])

   return {genres, error, isLoading}
}

export default useGenres