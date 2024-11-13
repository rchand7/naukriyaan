import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const companies = useSelector(state => state.companies); // Assuming companies are in Redux store

    // Fetch all companies when component mounts
    useGetAllCompanies();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input)); // Dispatch search text for filtering
    }, [input, dispatch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>

                {/* CompaniesTable with fallback UI */}
                {companies && companies.length > 0 ? (
                    <CompaniesTable companies={companies} />
                ) : (
                    <div>No companies found</div> // Fallback if no companies available
                )}
            </div>
        </div>
    )
}

export default Companies;
