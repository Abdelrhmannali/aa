import React, { useState } from 'react';
import './DataTable.css';

const DataTable = ({
  title = 'All Leads',
  titleAr = 'جميع العملاء',
  lang = 'en',
  rows = [],
  columns = [],
  page = 1,
  pageSize = 10,
  total = 0,
  translate = {},
  onPageChange,
  onFilter,
  onSort
}) => {
  const [currentPage, setCurrentPage] = useState(page);
  
  const totalPages = Math.ceil(total / pageSize);
  
  const indexNumber = (idx) => {
    return (currentPage - 1) * pageSize + idx + 1;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (onPageChange) onPageChange(newPage);
    }
  };

  const getColumnHeader = (col) => {
    if (lang === 'ar') {
      return translate[col] || col;
    }
    return col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1');
  };

  const renderCellContent = (row, col) => {
    if (col === 'status') {
      return <span className="status-badge new-lead">{row[col]}</span>;
    }
    if (col === 'active') {
      return row.active === 1 
        ? (lang === 'ar' ? 'نشط' : 'Active')
        : (lang === 'ar' ? 'متوقف' : 'Inactive');
    }
    return row[col];
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-number ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="data-table-container">
      {/* Header */}
      <div className="table-header">
        <h2 className="table-title">
          {lang === 'ar' ? titleAr : title}
        </h2>
        <div className="table-actions">
          <button className="action-btn filter-btn" onClick={onFilter}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 7H21L15 13V19L9 15V13L3 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {lang === 'ar' ? 'تصفية' : 'Filter'}
          </button>
          <button className="action-btn sort-btn" onClick={onSort}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M10 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {lang === 'ar' ? 'ترتيب' : 'Sort By'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>No.</th>
              {columns.map(col => (
                <th key={col}>{getColumnHeader(col)}</th>
              ))}
              <th>{lang === 'ar' ? 'الإجراءات' : 'Action'}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={row.id || idx}>
                <td className="number-cell">{String(indexNumber(idx)).padStart(2, '0')}</td>
                {columns.map(col => (
                  <td key={col}>
                    {renderCellContent(row, col)}
                  </td>
                ))}
                <td className="action-cell">
                  <span className="action-text">Zoom meeting</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <div className="pagination-info">
          <span className="show-text">Show</span>
          <select className="page-size-select" defaultValue={pageSize}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="row-text">Row</span>
        </div>
        
        <div className="pagination-controls">
          {renderPaginationNumbers()}
          {currentPage < totalPages && (
            <button 
              className="pagination-next"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;