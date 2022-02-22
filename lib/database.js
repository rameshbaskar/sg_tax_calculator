require('dotenv').config();
const mysql = require('mysql');

const dbConn = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: true
});

const queryDb = async (sql) => {
  return new Promise((resolve, reject) => {
    dbConn.query(sql, function (error, results) {
      if (error) reject(error);
      resolve(results);
    });
  });
};

const deleteTaxSlabs = async () => {
  await queryDb(`TRUNCATE TABLE tax_rates;`);
};

const getTaxSlabs = async (assessmentYear) => {
  return await queryDb(`SELECT * FROM tax_rates WHERE assessment_year = '${assessmentYear}';`);
};

const createTaxRecord = async (data) => {
  const sql = `INSERT INTO tax_rates (
    assessment_year,
    slab_income,
    slab_tax,
    next_slab_income,
    next_slab_tax_rate
  ) VALUES (
    '${data.assessmentYear}',
    ${data.slabIncome},
    ${data.slabTax},
    ${data.nextSlabIncome},
    ${data.nextSlabTaxRate}
  );`;
  await queryDb(sql);
};

module.exports = {
  getTaxSlabs,
  createTaxRecord,
  deleteTaxSlabs
}