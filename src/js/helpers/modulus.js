module.exports = function(n, m) {
  if (!n) return null;
  if (!m) return n;
  return ((n % m) + m) % m;
};
