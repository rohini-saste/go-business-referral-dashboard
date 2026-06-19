import { Button } from 'antd';

const Pagination = ({ currentPage, totalEntries, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalEntries);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', flexWrap: 'wrap', gap: '16px' }}>
      <div style={{ color: '#666', fontSize: '14px' }}>
        Showing {startEntry}–{endEntry} of {totalEntries} entries
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button 
          disabled={currentPage === 1} 
          onClick={() => onPageChange(currentPage - 1)}
          style={{ borderRadius: '6px' }}
        >
          Previous
        </Button>
        {pages.map(page => (
          <Button 
            key={page} 
            type={page === currentPage ? 'primary' : 'default'}
            onClick={() => onPageChange(page)}
            style={{ 
              borderRadius: '6px', 
              background: page === currentPage ? '#5b5ce6' : undefined,
              borderColor: page === currentPage ? '#5b5ce6' : undefined
            }}
          >
            {page}
          </Button>
        ))}
        <Button 
          disabled={currentPage === totalPages || totalPages === 0} 
          onClick={() => onPageChange(currentPage + 1)}
          style={{ borderRadius: '6px' }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
