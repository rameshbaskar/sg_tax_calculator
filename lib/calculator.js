const { getTaxSlabs } = require('./database');

const getTaxSlab = async (assessmentYear, totalIncome) => {
  const taxSlabs = await getTaxSlabs(assessmentYear);
  let nextSlabIncome = 0;
  let isMaxSlab = false;
  for (let taxSlab of taxSlabs) {
    isMaxSlab = false;
    if (taxSlab['next_slab_income'] === null) {
      isMaxSlab = true;
      nextSlabIncome = 0;
    }
    if (totalIncome <= taxSlab['slab_income'] + nextSlabIncome) {
      return taxSlab;
    } else {
      if (isMaxSlab) return taxSlab;
    }
  }
};

const getTaxAmount = async (assessmentYear, totalIncome) => {
  const taxSlab = await getTaxSlab(assessmentYear, totalIncome);
  return taxSlab['slab_tax'] + ((totalIncome - taxSlab['slab_income']) * taxSlab['next_slab_tax_rate'] / 100);
};

module.exports = {
  getTaxAmount
}