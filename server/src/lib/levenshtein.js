// server/src/lib/levenshtein.js
function distance(a = '', b = '') {
  a = a.toLowerCase();
  b = b.toLowerCase();
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}
function fuzzyOk(a, b) {
  if (!a || !b) return false;
  if (a.toLowerCase().includes(b.toLowerCase())) return true;
  const d = distance(a, b);
  if (a.length <= 3) return a[0].toLowerCase() === b[0].toLowerCase();
  return d <= 2;
}
module.exports = { distance, fuzzyOk };
