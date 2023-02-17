import { useEffect, useState } from "react";
import JoblyApi from "../api";

/** Custom hook that will get the values from the API and return a 
 * list and a function that will help query the list 
 * 
 * The list will have a state -- coupled with the useEffect hook,
 * the list will be updated every time searchValues is ran
 * 
 * */

function useGetFromApi(listName) {
    const [list, setList] = useState([])
    const [search, setSearch] = useState("")

    useEffect(()=>{
        async function getValuesFromApi(){
            if (listName === "companies") {
                const name = {name : search}
                const companies = await JoblyApi.getCompanies(name)
                setList(companies)
            }
            else if (listName === "jobs"){
                const title = {title : search}
                const jobs = await JoblyApi.getJobs(title)
                setList(jobs)
            }
        }
        getValuesFromApi()
    },[search, listName])

    function searchValues(currentSearchValue){
        setSearch(currentSearchValue)
    }
    return ({list, searchValues})
}

export default useGetFromApi;