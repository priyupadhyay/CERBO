import re
import datetime
filepath = 'sample.txt'
datepattern = '%d-%m-%Y'
with open(filepath, 'r') as f:
	file = f.read()
x = re.findall('\d\d-\d\d-\d\d\d\d', file)
y = []
for item in x:
	try:
		date = datetime.datetime.strptime(item, datepattern)
		y.append(date)
	except:
		pass
res = []
for item in y:
	a, b = str(item).split(' ')
	res.append(a)
	
print("res",res)