function getRandomData(numPoints, center, min, max, cycles) {
  var result = [];
  var phase = Math.random() * Math.PI;
  var y = center;

  function randomPlusMinus() {
    return Math.random() * 2 - 1;
  }

  $.each(cycles, function (i, thisCycle) {
    thisCycle.phase = Math.random() * Math.PI;
    thisCycle.increment = Math.PI / thisCycle.length;
  });

  for (var i = 0; i < numPoints; i++) {
    $.each(cycles, function (i, thisCycle) {
      thisCycle.phase += thisCycle.increment * randomPlusMinus();
      y +=
        Math.sin(thisCycle.phase) *
          (thisCycle.variance / thisCycle.length) *
          (randomPlusMinus() * thisCycle.noise) +
        thisCycle.trend / thisCycle.length;
    });
    if (min) y = Math.max(y, min);
    if (max) y = Math.min(y, max);
    result.push(y);
  }

  return result;
}

var data = getRandomData(365, 80, 20, 100, [
  { length: 7, variance: 50, noise: 1, trend: 0 },
  { length: 365, variance: 30, noise: 1, trend: 0 },
  { length: 700, variance: 2, noise: 0, trend: 100 },
]);
