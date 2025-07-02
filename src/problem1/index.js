var sum_to_n_a = function(n) {
    return n * (n + 1) / 2;
};

var sum_to_n_b = function(n) {
    let res = 0;
    for (let i = 1; i <= n; i++) {
        res += i;
    }
    return res;
};

var sum_to_n_c = function(n) {
    return n === 0 ? 0 : n + sum_to_n_d(n - 1);
};

//This is another method, but it's not recommended.
var sum_to_n_d = function(n) {
    let res = 0;
    Array.from({ length: n }, (_, i) => res += i + 1);
    return res;
};
