export const formatDate = (dateString) => {
  if (!dateString) return '';
  if (typeof dateString !== 'string') return dateString;
  // Convert YYYY-MM-DD or YYYY-MM-DDTHH:mm... to YYYY/MM/DD
  const parts = dateString.split('T')[0].split('-');
  if (parts.length === 3) {
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
  }
  return dateString.replace(/-/g, '/');
};
