import CompanyLink from './CompanyLink';
import Search from './Search';
import {v4} from 'uuid'
import useGetFromApi from './hooks/useGetFromApi';
import './CompaniesList.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function CompaniesList ({currentUser, apply}) {

    const valuesFromApi= useGetFromApi("companies")

    const companies = valuesFromApi.list
    const searchCompanies = valuesFromApi.searchValues

    const navigate = useNavigate()
    useEffect(()=>{
        if(!currentUser){
            navigate("/")
        }
    },[])

    return (
        <div className='CompaniesList'>
        <div className="CompaniesList-banner">
            <div>Learn more about companies.</div>
            <div><Search searchFunction={searchCompanies}/></div>
        </div>
        <div>
            {companies.length > 0 
            ? companies.map(company=> <CompanyLink key={v4()} apply={apply} company={company}/>) 
            : <h2>Not Found</h2>}
        </div>
        </div>
    )
}

export default CompaniesList;