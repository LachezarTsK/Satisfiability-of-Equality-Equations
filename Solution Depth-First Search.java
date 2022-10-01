
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class Solution {

    private static final int ALPHABET_SIZE = 26;
    private static final int ROOT_NOT_MARKED = -1;

    int[] rootsOfEqualElements = new int[ALPHABET_SIZE];
    Set<Integer>[] graph = new HashSet[ALPHABET_SIZE];

    public boolean equationsPossible(String[] equations) {
        Arrays.fill(rootsOfEqualElements, ROOT_NOT_MARKED);
        initializeGraph(equations);

        for (int i = 0; i < ALPHABET_SIZE; ++i) {
            if (this.rootsOfEqualElements[i] == ROOT_NOT_MARKED) {
                markRootByDepthFirstSearch(i, i);
            }
        }

        for (String equation : equations) {
            if (equation.charAt(1) == '!' && rootsAreEqual(equation)) {
                return false;
            }
        }
        return true;
    }

    private void markRootByDepthFirstSearch(int element, int root) {
        if (this.rootsOfEqualElements[element] != ROOT_NOT_MARKED) {
            return;
        }
        this.rootsOfEqualElements[element] = root;
        for (int current : graph[element]) {
            markRootByDepthFirstSearch(current, root);
        }
    }

    private void initializeGraph(String[] equations) {
        for (int i = 0; i < ALPHABET_SIZE; ++i) {
            graph[i] = new HashSet<>();
        }

        for (String equation : equations) {
            if (equation.charAt(1) == '=') {
                graph[equation.charAt(0) - 'a'].add(equation.charAt(3) - 'a');
                graph[equation.charAt(3) - 'a'].add(equation.charAt(0) - 'a');
            }
        }
    }

    private boolean rootsAreEqual(String equation) {
        return rootsOfEqualElements[equation.charAt(0) - 'a'] == rootsOfEqualElements[equation.charAt(3) - 'a'];
    }
}
