# SG personal tax calculator

This repository contains a small API server to calculate individual tax rates in Singapore.

## To start the server
```
yarn install
yarn start
```

## To calculate the tax
- Start the server
- Run `curl "http://localhost:3000/calculateTax?assessmentYear=2022&totalIncome=120000"`
- Currently the calculator works for assessment years `2022`, `2023` and `2024`
