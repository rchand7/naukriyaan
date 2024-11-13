import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'; 
import { setSearchJobByText } from '@/redux/jobSlice'; 

const AdminJobs = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Loading state for fetching jobs
  const { jobs, loading, error } = useGetAllAdminJobs(); // Assuming loading and error are handled in your custom hook
  const searchText = useSelector(state => state.jobs.searchText || '');

  // Debounced input handler for filtering jobs
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchJobByText(input)); 
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [input, dispatch]);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>Error loading jobs. Please try again later.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            value={input}
            onChange={(e) => setInput(e.target.value)} 
          />
          <Button onClick={() => navigate('/admin/jobs/create')}>New Job</Button>
        </div>
        {/* Only render AdminJobsTable if jobs are available */}
        {jobs.length > 0 ? (
          <AdminJobsTable jobs={jobs} searchText={searchText} />
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;

