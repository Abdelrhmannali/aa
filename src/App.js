import React from 'react';
import "./style.css";
import DataTable from './Components/DataTable';

// Sample data that matches the design from the image
const sampleData = [
  {
    id: 1,
    'Lead name': 'Omnia Mohamed',
    Email: 'someone3@gmail.com',
    Phone: '(671) 555-0110',
    Status: 'New Lead',
    Action: 'Zoom meeting',
    Employee: 'Employee name',
    Source: 'Facebook'
  },
  {
    id: 2,
    'Lead name': 'Omnia Mohamed',
    Email: 'someone3@gmail.com',
    Phone: '(671) 555-0110',
    Status: 'New Lead',
    Action: 'Zoom meeting',
    Employee: 'Employee name',
    Source: 'Facebook'
  },
  {
    id: 3,
    'Lead name': 'Omnia Mohamed',
    Email: 'someone3@gmail.com',
    Phone: '(671) 555-0110',
    Status: 'New Lead',
    Action: 'Zoom meeting',
    Employee: 'Employee name',
    Source: 'Facebook'
  },
  {
    id: 4,
    'Lead name': 'Omnia Mohamed',
    Email: 'someone3@gmail.com',
    Phone: '(671) 555-0110',
    Status: 'New Lead',
    Action: 'Zoom meeting',
    Employee: 'Employee name',
    Source: 'Facebook'
  },
  {
    id: 5,
    'Lead name': 'Omnia Mohamed',
    Email: 'someone3@gmail.com',
    Phone: '(671) 555-0110',
    Status: 'New Lead',
    Action: 'Zoom meeting',
    Employee: 'Employee name',
    Source: 'Facebook'
  },
  {
    id: 6,
    'Lead name': 'Omnia Mohamed',
    Email: 'someone3@gmail.com',
    Phone: '(671) 555-0110',
    Status: 'New Lead',
    Action: 'Zoom meeting',
    Employee: 'Employee name',
    Source: 'Facebook'
  },
  {
    id: 7,
    'Lead name': 'Omnia Mohamed',
    Email: 'someone3@gmail.com',
    Phone: '(671) 555-0110',
    Status: 'New Lead',
    Action: 'Zoom meeting',
    Employee: 'Employee name',
    Source: 'Facebook'
  },
  {
    id: 8,
    'Lead name': 'Omnia Mohamed',
    Email: 'someone3@gmail.com',
    Phone: '(671) 555-0110',
    Status: 'New Lead',
    Action: 'Zoom meeting',
    Employee: 'Employee name',
    Source: 'Facebook'
  },
  {
    id: 9,
    'Lead name': 'Omnia Mohamed',
    Email: 'someone3@gmail.com',
    Phone: '(671) 555-0110',
    Status: 'New Lead',
    Action: 'Zoom meeting',
    Employee: 'Employee name',
    Source: 'Facebook'
  },
  {
    id: 10,
    'Lead name': 'Omnia Mohamed',
    Email: 'someone3@gmail.com',
    Phone: '(671) 555-0110',
    Status: 'New Lead',
    Action: 'Zoom meeting',
    Employee: 'Employee name',
    Source: 'Facebook'
  }
];

const columns = ['Lead name', 'Email', 'Phone', 'Status', 'Employee', 'Source'];

const arabicTranslations = {
  'Lead name': 'اسم العميل',
  'Email': 'البريد الإلكتروني',
  'Phone': 'الهاتف',
  'Status': 'الحالة',
  'Employee': 'الموظف',
  'Source': 'المصدر'
};

export default function App(){
  const handlePageChange = (page) => {
    console.log('Page changed to:', page);
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const handleSort = () => {
    console.log('Sort clicked');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <DataTable
        title="All Leads"
        titleAr="جميع العملاء"
        lang="en" // Change to 'ar' for Arabic
        rows={sampleData}
        columns={columns}
        page={1}
        pageSize={10}
        total={sampleData.length}
        translate={arabicTranslations}
        onPageChange={handlePageChange}
        onFilter={handleFilter}
        onSort={handleSort}
      />
    </div>
  );
}
