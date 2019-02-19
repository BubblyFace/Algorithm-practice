import sys 
import re


for line in sys.stdin:
    pattern = re.compile('/([a-zA-Z~!,;=&?\/\-_\(\)\.#$\+]{3,})*@([a-zA-Z]{1,119})\./g')
    emails = line.replace(pattern," ")
    print(emails)
