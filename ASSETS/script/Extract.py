import re
import datetime
import calendar
filepath = 'new 1.txt'
datepattern = '%d-%m-%Y'
List = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
f=open(filepath, 'r')
file = f.readline()
count=0
while file:
    x = re.findall('\d\d-\d\d-\d\d\d\d', file)
    #print(x)
    z1=re.findall(r'\b(\w+day)\b',file)
    z2=re.findall('tomorrow',file)
    z3=re.findall('morning',file)
    z4=re.findall('evening',file)
    z4=re.findall('afternoon',file)
    z5 = re.findall('\d \w\w', file)
    y = []
    i=0
    count+=1
    #print(z2)
    
    if z1 or z2 or z3 or z4 or z5 or x:
        list1=file.split(".")
        for element in list1:
            if  (len(z1)!= 0 and z1[0] in list1[i]) or ( len(z2)!= 0 and  z2[0] in list1[i]) or (len(x)!= 0 and x[0] in list1[i]) or (len(z3)!= 0 and z3[0] in list1[i])or (len(z4)!= 0 and z4[0] in list1[i]) or (len(z5)!= 0 and z5[0] in list1[i]):
            #if z2[0] in list1[i]:S
                print("Line {} : {}".format(count,list1[i].strip()))
            i+=1

         
            

  #  pos = f.tell()
  #  print("Current Position: %d" % (pos))
  #  for day in z2:
  #      print(day)
    file=f.readline()
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
	
for item in res: print(item)
