var keys = {
  up: [38, 75, 87],
  down: [40, 74, 83],
  left: [37, 65, 72],
  right: [39, 68, 76],
  start_game: [13, 32]
};

module.exports = function(value) {
  for (var key in keys) {
    if (
      keys[key] instanceof Array &&
      keys[key].indexOf(value) >= 0
    ) {
      return key;
    }
  }
  return null;
};
