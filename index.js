const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

//cart-total?newItemPrice=1200&cartTotal=0>
function totalCart(newItemPrice, cartTotal) {
  return cartTotal + newItemPrice;
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(totalCart(newItemPrice, cartTotal).toString());
});

//membership-discount?cartTotal=3600&isMember=true

function calculateMembershipDiscount(cartTotal, isMember) {
  if (isMember === 'true') {
    return cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    return cartTotal;
  }
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(calculateMembershipDiscount(cartTotal, isMember).toString());
});

//calculate-tax?cartTotal=3600
function calculateTax(cartTotal) {
  return (cartTotal * taxRate) / 100;
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal).toString());
});

//estimate-delivery?shippingMethod=express&distance=600

function calculateEstimateTime(shippingMethod, distance) {
  console.log(shippingMethod, distance);
  if (shippingMethod === 'Standard') {
    return distance / 50;
  } else {
    return distance / 100;
  }
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(calculateEstimateTime(shippingMethod, distance).toString());
});

//shipping-cost?weight=2&distance=600
function calculateShippingCost(weight, distance) {
  return weight * distance * 0.1;
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance).toString());
});

// /loyalty-points?purchaseAmount=3600

function calculateLoyaltyPoint(purchaseAmount) {
  return purchaseAmount * 2;
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoint(purchaseAmount).toString());
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
