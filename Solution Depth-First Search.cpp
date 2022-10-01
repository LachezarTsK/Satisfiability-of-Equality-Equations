
#include <array>
#include <string>
#include <vector>
using namespace std;

class Solution {
    
    inline static const int ALPHABET_SIZE = 26;
    inline static const int ROOT_NOT_MARKED = -1;
    array<int, ALPHABET_SIZE> rootsOfEqualElements;
    array<unordered_set<int>, ALPHABET_SIZE> graph;

public:

    bool equationsPossible(vector<string>& equations) {

        //C++20: std::ranges::fill(rootsOfEqualElements, ROOT_NOT_MARKED);
        fill(rootsOfEqualElements.begin(), rootsOfEqualElements.end(), ROOT_NOT_MARKED);
        initializeGraph(equations);

        for (int i = 0; i < ALPHABET_SIZE; ++i) {
            if (rootsOfEqualElements[i] == ROOT_NOT_MARKED) {
                markRootByDepthFirstSearch(i, i);
            }
        }

        for (const auto& equation : equations) {
            if (equation[1] == '!' && rootsAreEqual(equation)) {
                return false;
            }
        }
        return true;
    }


private:
    void markRootByDepthFirstSearch(int element, int root) {
        if (rootsOfEqualElements[element] != ROOT_NOT_MARKED) {
            return;
        }
        rootsOfEqualElements[element] = root;
        for (const auto& current : graph[element]) {
            markRootByDepthFirstSearch(current, root);
        }
    }

    void initializeGraph(const vector<string>& equations) {
        for (const auto& equation : equations) {
            if (equation[1] == '=') {
                graph[equation[0] - 'a'].insert(equation[3] - 'a');
                graph[equation[3] - 'a'].insert(equation[0] - 'a');
            }
        }
    }

    bool rootsAreEqual(const string& equation) {
        return rootsOfEqualElements[equation[0] - 'a'] == rootsOfEqualElements[equation[3] - 'a'];
    }
};
