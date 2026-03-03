import React, { useState } from 'react';
import Link from 'next/link';
import TableCourseItem from './include/TableCourseItem';

interface IndexProps {
  courses: any[];
  search?: string;
  filter?: string;
}

export default function Index({ courses, search = '', filter = '' }: IndexProps) {
  const [searchTerm, setSearchTerm] = useState(search);
  const [filterValue, setFilterValue] = useState(filter);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic or navigation
    window.location.href = `?search=${searchTerm}`;
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(e.target.value);
    window.location.href = e.target.value;
  };

  return (
    <>
      {/* Card START */}
      <div className="card border bg-transparent rounded-3">
        {/* Card header START */}
        <div className="card-header bg-transparent border-bottom">
          <h3 className="mb-0">My Courses List</h3>
        </div>
        {/* Card header END */}

        {/* Card body START */}
        <div className="card-body">

          {/* Search and select START */}
          <div className="row g-3 align-items-center justify-content-between mb-4">
            {/* Search */}
            <div className="col-md-8">
              <form className="rounded position-relative" onSubmit={handleSearch}>
                <input 
                  className="form-control pe-5 bg-transparent" 
                  name="search" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="search" 
                  placeholder="Search" 
                  aria-label="Search" 
                />
                <button className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
                  <i className="fas fa-search fs-6 "></i>
                </button>
              </form>
            </div>

            {/* Select option */}
            <div className="col-md-3">
              {/* Short by filter */}
              <form>
                <select 
                  name="filter" 
                  id="instructor_filter_select_courses" 
                  className="form-select js-choice border-0 z-index-9 bg-transparent" 
                  aria-label=".form-select-sm"
                  value={filterValue}
                  onChange={handleFilterChange}
                >
                  <option value="/instructor/courses">Sort by</option>
                  <option value="/instructor/courses?filter=free">Free</option>
                  <option value="/instructor/courses?filter=newest">Newest</option>
                  <option value="/instructor/courses?filter=premium">Premium</option>
                  <option value="/instructor/courses?filter=viewed">Most Viewed</option>
                </select>
              </form>
            </div>
          </div>
          {/* Search and select END */}

          {/* Course list table START */}
          <div className="table-responsive border-0">
            <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
              {/* Table head */}
              <thead>
                <tr>
                  <th scope="col" className="border-0 rounded-start">Course Title</th>
                  <th scope="col" className="border-0">Students</th>
                  <th scope="col" className="border-0">Status</th>
                  <th scope="col" className="border-0">Price</th>
                  <th scope="col" className="border-0 rounded-end">Action</th>
                </tr>
              </thead>

              {/* Table body START */}
              <tbody>
                {/* Table item */}
                {courses && courses.length > 0 ? (
                  courses.map((course) => (
                    <TableCourseItem key={course.id} course={course} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No data found</td>
                  </tr>
                )}
              </tbody>
              {/* Table body END */}
            </table>
          </div>
          {/* Course list table END */}

          {/* Pagination START */}
          <div className="d-sm-flex justify-content-sm-between align-items-sm-center mt-4 mt-sm-3 pagination-container">
            {/* Pagination placeholder */}
          </div>
          {/* Pagination END */}
        </div>
        {/* Card body START */}
      </div>
    </>
  );
}
