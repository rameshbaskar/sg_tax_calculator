const { createTaxRecord, deleteTaxSlabs } = require('../lib/database');
const csv = require('csvtojson');

const DATA_SOURCE = 'seeds/sg_tax_rates.csv';

const seedTaxRates = async () => {
  await deleteTaxSlabs();
  const records = await csv().fromFile(DATA_SOURCE);
  for (let record of records) {
    await createTaxRecord({
      assessmentYear: record['assessment_year'],
      slabIncome: record['slab_income'],
      slabTax: record['slab_tax'],
      nextSlabIncome: record['next_slab_income'] || null,
      nextSlabTaxRate: record['next_slab_tax_rate']
    });
  }
};

seedTaxRates().then(() => console.log('Done!'));