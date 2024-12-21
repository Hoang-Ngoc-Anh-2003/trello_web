/**
 * Viet hoa chu cai dau
 */
/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = val => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

/**
 * Example:
 */
//   const stringTest = 'trungquandev'
//   const capString = capitalizeFirstLetter(stringTest)

//   console.log('stringTest:', stringTest)
//   console.log('capString:', capString)

// --------------------------------------------------------------

export const generatePlaceholderCar = column => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true,
  };
};