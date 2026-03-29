export const formatDate = (dateStr) =>
  new Intl.DateTimeFormat('en-US', {
    year:  'numeric',
    month: 'short',
    day:   'numeric',
  }).format(new Date(dateStr));

export const getCurrentMonthYear = () => {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    year:  now.getFullYear(),
  };
};