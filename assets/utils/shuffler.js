export const shuffle = (t) => Array.from(sample(t, t.length));

function* sample(t, n) {
  const rand = (n) => Math.floor(Math.random() * n);

  function swap(t, i, j) {
    let q = t[i];
    t[i] = t[j];
    t[j] = q;
    return t;
  }

  let r = Array.from(t);
  while (n > 0 && r.length) {
    const i = rand(r.length); // 1
    swap(r, i, r.length - 1); // 2
    yield r.pop(); // 3
    n = n - 1;
  }
}
