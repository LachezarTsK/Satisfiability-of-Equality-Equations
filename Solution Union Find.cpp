
#include <array>
#include <string>
#include <vector>
using namespace std;

/*
  Abridged Version of Union Find.
  Join by rank is not necessary for this particular problem.
 */
class Solution {
    
    inline static const int ALPHABET_SIZE = 26;
    array<int, ALPHABET_SIZE> rootsOfEqualElements;
    
public:
    bool equationsPossible(vector<string>& equations) {
        iota(rootsOfEqualElements.begin(), rootsOfEqualElements.end(), 0);

        for (const auto& equation : equations) {
            if (equation[1] == '=') {
                int rootFirst = findRoot(equation[0] - 'a');
                int rootSecond = findRoot(equation[3] - 'a');
                rootsOfEqualElements[rootFirst] = rootsOfEqualElements[rootSecond];
            }
        }

        for (const auto& equation : equations) {
            if (equation[1] == '!') {
                int rootFirst = findRoot(equation[0] - 'a');
                int rootSecond = findRoot(equation[3] - 'a');
                if (rootFirst == rootSecond) {
                    return false;
                }
            }
        }

        return true;
    }

private:
    int findRoot(int index) {
        if (rootsOfEqualElements[index] != index) {
            rootsOfEqualElements[index] = findRoot(rootsOfEqualElements[index]);
        }
        return rootsOfEqualElements[index];
    }
};
