const { BadRequestError } = require("../expressError");

/* THIS NEEDS SOME GREAT DOCUMENTATION.
  * This function takes in the data from the user that will be updated

  * Passes in the user data as the dataToUpdate and updates it with jsToSql as the new values

  * The data(object) then gets mapped over to sanitize on update

*/

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2'] setting up to sanitize
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
