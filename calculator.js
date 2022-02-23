const csv = require('csvtojson');

const SOURCE_DATA_FILE = './taxRates.csv';

const getTaxSlabs = async (assessmentYear) => {
  const jsonData = await csv().fromFile(SOURCE_DATA_FILE);
  const filteredResults = jsonData.filter((record) => record.assessmentYear === assessmentYear);
  const taxSlabs = [];
  let nextSlabIncome;
  let isMaxSlab = false;
  for (let record of filteredResults) {
    isMaxSlab = false;
    if (record.nextSlabIncome === 'NA') {
      isMaxSlab = true;
      nextSlabIncome = 0.00;
    } else {
      nextSlabIncome = parseFloat(record.nextSlabIncome);
    }
    taxSlabs.push({
      slabIncome: parseFloat(record.slabIncome),
      slabTaxAmount: parseFloat(record.slabTaxAmount),
      nextSlabIncome: nextSlabIncome,
      nextSlabTaxRate: parseFloat(record.nextSlabTaxRate),
      isMaxSlab: isMaxSlab
    });
  }
  return taxSlabs;
};

const getTaxSlab = async (assessmentYear, totalIncome) => {
  const taxSlabs = await getTaxSlabs(assessmentYear);
  for (let taxSlab of taxSlabs) {
    if (totalIncome <= taxSlab.slabIncome + taxSlab.nextSlabIncome) {
      return taxSlab;
    } else {
      if (taxSlab.isMaxSlab) return taxSlab;
    }
  }
};

const getTaxAmount = async (assessmentYear, totalIncome) => {
  const taxSlab = await getTaxSlab(assessmentYear, totalIncome);
  return taxSlab.slabTaxAmount + ((totalIncome - taxSlab.slabIncome) * taxSlab.nextSlabTaxRate / 100);
};

module.exports = {
  getTaxAmount
}