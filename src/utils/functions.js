export const formatDate = (date) => {
  return new Date(date).toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });
};
