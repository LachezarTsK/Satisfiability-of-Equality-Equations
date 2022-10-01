
import java.util.stream.IntStream;

public class Solution {

    private static final int ALPHABET_SIZE = 26;
    int[] rootsOfEqualElements = IntStream.range(0, ALPHABET_SIZE).toArray();

    public boolean equationsPossible(String[] equations) {

        for (String equation : equations) {
            if (equation.charAt(1) == '=') {
                int rootFirst = findRoot(equation.charAt(0) - 'a');
                int rootSecond = findRoot(equation.charAt(3) - 'a');
                rootsOfEqualElements[rootFirst] = rootsOfEqualElements[rootSecond];
            }
        }

        for (String equation : equations) {
            if (equation.charAt(1) == '!') {
                int rootFirst = findRoot(equation.charAt(0) - 'a');
                int rootSecond = findRoot(equation.charAt(3) - 'a');
                if (rootFirst == rootSecond) {
                    return false;
                }
            }
        }

        return true;
    }

    private int findRoot(int index) {
        if (rootsOfEqualElements[index] != index) {
            rootsOfEqualElements[index] = findRoot(rootsOfEqualElements[index]);
        }
        return rootsOfEqualElements[index];
    }
}
