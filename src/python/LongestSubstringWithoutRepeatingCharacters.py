class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # A loop record all the char in string, largest output is the size of dict
        dict = {}
        dict_len = 0

        for i in str:
            if dict[str[i]] is None:
                dict[str[i]] = False
                dict_len = dict_len + 1

        # give a v to record longest
        length_max = 1

        # handle special
        if dict_len == 1:
            return length_max

        if dict_len == len(s):
            return len(s)

        # from start to record the number of unshow char, once they occur repeating. from the repeating char
        # to start a new line.
        current_str = []
        current_longest = 0

        for i in str:
            if dict[str[i]] is False:
                dict[str[i]] = True
                current_str.append(str[i])
                current_longest += 1
                if current_longest > length_max:
                    length_max = current_longest
            else:
                for j in current_str:
                    dict[str[j]] = False
                    current_str = []
                    current_longest = 0

        return length_max


test = Solution()

print(test.lengthOfLongestSubstring('word'))
print(test.lengthOfLongestSubstring('hello'))
