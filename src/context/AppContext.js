import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import axios from 'axios';

//step1
export const AppContext = createContext();

export default function AppContextProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    //data filling pending

    async function fetchBlogPosts(page = 1) {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        console.log("printing the final URL");
        console.log(url);
        try{
            // const result = await fetch(url);
            // const data = await result.json();
            // console.log(data);
            // setPage(data.page);
            // setPosts(data.posts);
            // setTotalPages(data.totalPages)
            
            //Or
            
            const data = await axios(url);
            console.log(data);
            setPage(data.data.page);
            setPosts(data.data.posts);
            setTotalPages(data.data.totalPages)
        }
        catch(error) {
            console.log("Error in fetching data");
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    }

    function handlePageChange(page) {
        setPage(page);
        fetchBlogPosts(page);
    }



    const value = {
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
    };

    //step2
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}