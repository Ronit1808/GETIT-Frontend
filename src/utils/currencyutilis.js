/**
 * Utility function to format numbers to Indian currency
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
export const formatToIndianCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  