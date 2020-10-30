/**
* get limit and offset from the pageNumber and pageSize
* @param {integer} page - current page number
* @param {integer} size - page size
* @return {object} - {limit, offset} 
*/
const getPagination = (page, size) => {
  const limit = size ? size : 20;
  const offset = page ? (page-1) * limit : 0;

  return { limit, offset };
};
module.exports = getPagination;