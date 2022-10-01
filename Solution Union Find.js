
/*
 Abridged Version of Union Find.
 Join by rank is not necessary for this particular problem.
 */
/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function (equations) {
    const ALPHABET_SIZE = 26;
    const asciiCodeFor_a = 97;
    this.rootsOfEqualElements = Array.from(new Array(ALPHABET_SIZE).keys());

    for (let equation of equations) {
        if (equation.charAt(1) === '=') {
            let rootFirst = findRoot(equation.codePointAt(0) - asciiCodeFor_a);
            let rootSecond = findRoot(equation.codePointAt(3) - asciiCodeFor_a);
            rootsOfEqualElements[rootFirst] = rootsOfEqualElements[rootSecond];
        }
    }

    for (let equation of equations) {
        if (equation.charAt(1) === '!') {
            let rootFirst = findRoot(equation.codePointAt(0) - asciiCodeFor_a);
            let rootSecond = findRoot(equation.codePointAt(3) - asciiCodeFor_a);
            if (rootFirst === rootSecond) {
                return false;
            }
        }
    }

    return true;
};


/**
 * @param {number} index
 * @return {number}
 */
function findRoot(index) {
    if (this.rootsOfEqualElements[index] !== index) {
        this.rootsOfEqualElements[index] = findRoot(this.rootsOfEqualElements[index]);
    }
    return this.rootsOfEqualElements[index];
}
