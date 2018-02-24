import json
filepath = 'C:/Users/parita_johari/Documents/GitHub/CERBO/APIs/DataCleaning/database3.txt'

pairs=[]
list = []
grp = ""
i = ''
b = []
dict = {}
#words = set(nltk.corpus.words.words())
try:
	with open(filepath, 'r') as f:
		for file in f:
			list.append(file)
			
	for a in list:
		b = a.split('#')
		if(b[0] in dict.keys()):
			i = dict[b[0]] + b[-1]
		dict[b[0]] = i
	i=27;
	
	
	d={}
	
	for k,v in dict.items():
		fi = open("cleanData"+str(i)+".json","w")
		d[k] = v
		fi.write(json.dumps(d))
		fi.close()
		i=i+1
			
	#json = json.dumps(dict)
	#print(list)
	#n = filepath.split('.')[0]
	#fii = open("cleanData.json","w")
	#fii.write(json)
finally:
	#f.close()
	#fi.close()
	print("Close")
	
