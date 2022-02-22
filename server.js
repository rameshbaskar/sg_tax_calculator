const express = require('express');
const {getTaxAmount} = require('./lib/calculator');

const app = express();

app.get('/calculateTax', async (req, res) => {
  const assessmentYear = req.query.assessmentYear;
  const totalIncome = parseInt(req.query.totalIncome);
  const totalTax = await getTaxAmount(assessmentYear, totalIncome);
  res.send({
    assessmentYear: assessmentYear,
    totalIncome: `SGD ${totalIncome}`,
    totalTax: `SGD ${totalTax}`
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
