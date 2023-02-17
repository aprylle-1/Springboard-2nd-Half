import CompanyLink from './CompanyLink';
import Search from './Search';
import {v4} from 'uuid'
import useGetFromApi from './hooks/useGetFromApi';
function CompaniesList () {

    const valuesFromApi= useGetFromApi("companies")

    const companies = valuesFromApi.list
    const searchCompanies = valuesFromApi.searchValues
    
    return (
        <>
        <h1>Companies</h1>
        <Search searchFunction={searchCompanies}/>
        <div>
            {companies.length > 0 
            ? companies.map(company=> <CompanyLink key={v4()} company={company}/>) 
            : <h2>Not Found</h2>}
        </div>
        </>
    )
}

export default CompaniesList;