
/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function (equations) {
    this.ALPHABET_SIZE = 26;
    this.asciiCodeFor_a = 97;
    this.ROOT_NOT_MARKED = -1;

    this.rootsOfEqualElements = new Array(this.ALPHABET_SIZE).fill(this.ROOT_NOT_MARKED);
    this.graph = new Array(this.ALPHABET_SIZE);
    initializeGraph(equations);

    for (let i = 0; i < this.ALPHABET_SIZE; ++i) {
        if (this.rootsOfEqualElements[i] === this.ROOT_NOT_MARKED) {
            markRootByDepthFirstSearch(i, i);
        }
    }

    for (let equation of equations) {
        if (equation.charAt(1) === '!' && rootsAreEqual(equation)) {
            return false;
        }
    }
    return true;
};

/**
 * @param {number} element
 * @param {number} root
 * @return {void}
 */
function markRootByDepthFirstSearch(element, root) {
    if (this.rootsOfEqualElements[element] !== this.ROOT_NOT_MARKED) {
        return;
    }
    this.rootsOfEqualElements[element] = root;
    for (let current of this.graph[element]) {
        markRootByDepthFirstSearch(current, root);
    }
}

/**
 * @param {string[]} equations
 * @return {void}
 */
function initializeGraph(equations) {
    for (let i = 0; i < this.ALPHABET_SIZE; ++i) {
        this.graph[i] = new Set();
    }

    for (let equation of equations) {
        if (equation.charAt(1) === '=') {
            this.graph[equation.codePointAt(0) - this.asciiCodeFor_a].add(equation.codePointAt(3) - this.asciiCodeFor_a);
            this.graph[equation.codePointAt(3) - this.asciiCodeFor_a].add(equation.codePointAt(0) - this.asciiCodeFor_a);
        }
    }
}

/**
 * @param {string} equation
 * @return {boolean}
 */
function rootsAreEqual(equation) {
    return this.rootsOfEqualElements[equation.codePointAt(0) - this.asciiCodeFor_a] === this.rootsOfEqualElements[equation.codePointAt(3) - this.asciiCodeFor_a];
}
