/* eslint-disable no-undef */
export const validate = item => {
  const errorFields = [];
  Object.keys(item).forEach((key) => {
    if(typeof(item[key]) === 'string' &&  item[key].length < 1) {
      errorFields.push(key);
    }
    if(!item[key] && typeof item[key] !== 'number') {
      errorFields.push(key);
    }
  })

  if(errorFields.length < 1) {
    return (true, []);
  } 

  return (false, errorFields);
}