// src/utils/formatters.js

export const formatDate = (isoString) => {
  if (!isoString) return '';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  }).format(new Date(isoString));
};
