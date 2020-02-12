# Definition for singly-linked list.
import math

class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        list_rt = ListNode((l1.val + l2.val) % 10)
        node_final = list_rt

        if l1.next is None and l2.next is None:
            if (l1.val + l2.val) >= 10:
                node_final.next = ListNode(1)
            return list_rt

        if l1.next is None:
            if (l1.val + l2.val) >= 10:
                w_n = l2.next

                while w_n.val is 9:
                    w_n.val = 0
                    if w_n.next is None:
                        w_n.next = ListNode(0)
                    w_n = w_n.next
                w_n.val = w_n.val + 1
            node_final.next = l2.next
            return list_rt

        if l2.next is None:
            if (l1.val + l2.val) >= 10:
                w_n = l1.next
                while w_n.val is 9:
                    w_n.val = 0
                    if w_n.next is None:
                        w_n.next = ListNode(0)
                    w_n = w_n.next
                w_n.val = w_n.val + 1
            node_final.next = l1.next
            return list_rt

        is_num_carry = False

        if (l1.val + l2.val) >= 10:
            is_num_carry = True

        l1 = l1.next
        l2 = l2.next

        n_1 = l1.val
        n_2 = l2.val

        while l1 is not None or l2 is not None:

            if is_num_carry:
                current_result = n_1 + n_2 + 1
                is_num_carry = False
            else:
                current_result = n_1 + n_2

            if current_result >= 10:
                is_num_carry = True

            node_final.next = ListNode(current_result % 10)
            node_final = node_final.next

            if (l1 is None or l1.next is None) and (l2 is None or l2.next is None) and is_num_carry:
                node_final.next = ListNode(1)
                node_final = node_final.next

            if l1 is not None:
                if l1.next is None:
                    l1 = l1.next
                    n_1 = 0
                else:
                    l1 = l1.next
                    n_1 = l1.val
            else:
                n_1 = 0

            if l2 is not None:
                if l2.next is None:
                    l2 = l2.next
                    n_2 = 0
                else:
                    l2 = l2.next
                    n_2 = l2.val
            else:
                n_2 = 0

        return list_rt