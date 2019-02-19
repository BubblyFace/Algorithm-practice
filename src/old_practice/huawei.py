class huawei():
    #empty
    def Compressed(test):
        if not any(test):
            return "False"
        n = len(test)
        outputList = []
        output = ""
        inx = test[0]
        inxNum = 0
        i = 0
        while i < n:
            if test[i] == inx:
                inxNum += 1
            else:
                outputList.append([[inx],[inxNum]])
                inx = test[i+1]
                inxNum = 0
            i += 1
        #string concat
        j = 0
        while j < len(outputList):
            if outputList[j][1] != 1:
                output += (str(outputList[j][1])  + str(outputList[j][0]))
            if outputList[j][1] == 1:
                output += outputList[j][0]
            j += 1
        return output

test = "abfdsaf"
print(huawei.Compressed(test))
        
