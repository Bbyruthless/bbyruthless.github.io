// Attach all the copy click events to the 'total' fields
var inputs = document.querySelectorAll('input[type=number]:read-only');

var clickEvent = function (ele) {
  return function () {
    ele.select();
    document.execCommand('Copy');
    alert('Copied!');
  };
};

inputs.forEach(function (ele) {
  ele.addEventListener('click', clickEvent(ele));
});

// Wire up all the calculations
// Values
var nuggetsQuantity = document.getElementById('q_nugget');
var nuggetsPrice = document.getElementById('p_nugget');
var nuggetsTotal = document.getElementById('t_nugget');
var dustQuantity = document.getElementById('q_dust');
var dustPrice = document.getElementById('p_dust');
var dustTotal = document.getElementById('t_dust');
var goldTotal = document.getElementById('g_total');

var sameMatQuantity = document.getElementById('q_mat');
var sameMatPrice = document.getElementById('p_mat');
var sameMatTotal = document.getElementById('t_mat');
var sameMatGrandTotal = document.getElementById('same_total');

var aluminiumQuantity = document.getElementById('q_alu');
var aluminiumPrice = document.getElementById('p_alu');
var aluminiumTotal = document.getElementById('t_alu');
var copperQuantity = document.getElementById('q_cop');
var copperPrice = document.getElementById('p_cop');
var copperTotal = document.getElementById('t_cop');
var electronicsQuantity = document.getElementById('q_ele');
var electronicsPrice = document.getElementById('p_ele');
var electronicsTotal = document.getElementById('t_ele');
var glassQuantity = document.getElementById('q_gla');
var glassPrice = document.getElementById('p_gla');
var glassTotal = document.getElementById('t_gla');
var plasticQuantity = document.getElementById('q_pla');
var plasticPrice = document.getElementById('p_pla');
var plasticTotal = document.getElementById('t_pla');
var rubberQuantity = document.getElementById('q_rub');
var rubberPrice = document.getElementById('p_rub');
var rubberTotal = document.getElementById('t_rub');
var scrapQuantity = document.getElementById('q_scr');
var scrapPrice = document.getElementById('p_scr');
var scrapTotal = document.getElementById('t_scr');
var steelQuantity = document.getElementById('q_ste');
var steelPrice = document.getElementById('p_ste');
var steelTotal = document.getElementById('t_ste');
var woodQuantity = document.getElementById('q_woo');
var woodPrice = document.getElementById('p_woo');
var woodTotal = document.getElementById('t_woo');

var individualGrandTotal = document.getElementById('individual_total')

var grandTotal = document.getElementById('grand_total');

// Total
var updateTotals = function () {
  nuggetsTotal.value = Number(nuggetsQuantity.value * nuggetsPrice.value);
  dustTotal.value = Number(dustQuantity.value * dustPrice.value);
  goldTotal.value = Number(nuggetsTotal.value) + Number(dustTotal.value);

  sameMatTotal.value = Number(sameMatQuantity.value) * Number(sameMatPrice.value);
  sameMatGrandTotal.value = Number(sameMatTotal.value);

  aluminiumTotal.value = Number(aluminiumQuantity.value) * Number(aluminiumPrice.value);
  copperTotal.value = Number(copperQuantity.value) * Number(copperPrice.value);
  electronicsTotal.value = Number(electronicsQuantity.value) * Number(electronicsPrice.value);
  glassTotal.value = Number(glassQuantity.value) * Number(glassPrice.value);
  plasticTotal.value = Number(plasticQuantity.value) * Number(plasticPrice.value);
  rubberTotal.value = Number(rubberQuantity.value) * Number(rubberPrice.value);
  scrapTotal.value = Number(scrapQuantity.value) * Number(scrapPrice.value);
  steelTotal.value = Number(steelQuantity.value) * Number(steelPrice.value);
  woodTotal.value = Number(woodQuantity.value) * Number(woodPrice.value);

  individualGrandTotal.value = Number(aluminiumTotal.value) + Number(copperTotal.value) +
    Number(electronicsTotal.value) + Number(glassTotal.value) + Number(plasticTotal.value) +
    Number(rubberTotal.value) + Number(scrapTotal.value) + Number(steelTotal.value) +
    Number(woodTotal.value);

  grandTotal.value = Number(goldTotal.value) + (isSameMatPricingEle.checked ?
    Number(sameMatGrandTotal.value) :
    Number(individualGrandTotal.value));
};

var onPriceUpdate = function (fieldSuffix) {
  return function (event) {
    set(fieldSuffix, event.target.value);
    updateTotals();
  }
};

// Calculation listeners
nuggetsQuantity.addEventListener('input', updateTotals);
nuggetsPrice.addEventListener('input', onPriceUpdate('nugget'));
dustQuantity.addEventListener('input', updateTotals);
dustPrice.addEventListener('input', onPriceUpdate('dust'));

sameMatQuantity.addEventListener('input', updateTotals);
sameMatPrice.addEventListener('input', onPriceUpdate('mat'));

aluminiumQuantity.addEventListener('input', updateTotals);
aluminiumPrice.addEventListener('input', onPriceUpdate('alu'));
copperQuantity.addEventListener('input', updateTotals);
copperPrice.addEventListener('input', onPriceUpdate('cop'));
electronicsQuantity.addEventListener('input', updateTotals);
electronicsPrice.addEventListener('input', onPriceUpdate('ele'));
glassQuantity.addEventListener('input', updateTotals);
glassPrice.addEventListener('input', onPriceUpdate('gla'));
plasticQuantity.addEventListener('input', updateTotals);
plasticPrice.addEventListener('input', onPriceUpdate('pla'));
rubberQuantity.addEventListener('input', updateTotals);
rubberPrice.addEventListener('input', onPriceUpdate('rub'));
scrapQuantity.addEventListener('input', updateTotals);
scrapPrice.addEventListener('input', onPriceUpdate('scr'));
steelQuantity.addEventListener('input', updateTotals);
steelPrice.addEventListener('input', onPriceUpdate('ste'));
woodQuantity.addEventListener('input', updateTotals);
woodPrice.addEventListener('input', onPriceUpdate('woo'));

var sameMatPricingTable = document.getElementById('same');
var individualMatPricingTable = document.getElementById('individual');
var isSameMatPricingEle = document.querySelector('#is_same');

isSameMatPricingEle.addEventListener('change', function () {
  var isSameMatPricing = isSameMatPricingEle.checked;
  if (isSameMatPricing) {
    individualMatPricingTable.style.display = 'none';
    sameMatPricingTable.style.display = 'table';
  } else {
    individualMatPricingTable.style.display = 'table';
    sameMatPricingTable.style.display = 'none';
  }
  updateTotals();
});



const suffixesToLoad = [
  { suffix: 'nugget', defaultVal: 200 },
  { suffix: 'dust', defaultVal: 10 },
  { suffix: 'mat' },
  { suffix: 'alu' },
  { suffix: 'cop' },
  { suffix: 'ele' },
  { suffix: 'gla' },
  { suffix: 'pla' },
  { suffix: 'rub' },
  { suffix: 'scr' },
  { suffix: 'ste' },
  { suffix: 'woo' }
]

var loadFromLocalStorage = function (priceObj) {
  var fieldId = 'p_' + priceObj.suffix;
  var element = document.getElementById(fieldId);
  var value = get(priceObj.suffix, priceObj.defaultVal);
  element.value = value;
};

suffixesToLoad.forEach(loadFromLocalStorage);
