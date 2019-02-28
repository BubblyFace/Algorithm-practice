class Solution:
    # 边际条件考虑过少，匹配后的情况没有考虑完全
    def strStr(self, haystack: str, needle: str) -> int:
        if len(needle) < 1:
            return 0
        index = 0;
        match_l= 0

        len_h = len(haystack)
        len_n = len(needle)

        if len_n > len_h:
            return -1
        elif haystack == needle:
            return  0
        else:
            while match_l < len(needle) and index < len_h:
                if haystack[index] == needle[match_l]:
                    match_l = match_l + 1
                    index = index + 1
                else:
                    index = index - match_l + 1
                    match_l = 0
        if match_l == len(needle):
            return index - match_l
        else:
            return -1
