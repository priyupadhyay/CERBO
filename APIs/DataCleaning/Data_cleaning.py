import nltk
import json
filepath = 'C:/Users/kartik_pawar/Downloads/supreme_court_dialogs_corpus_v1.01/supreme_court_dialogs_corpus_v1.01/supreme.conversations.txt'

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
		b = a.split('+++$+++')
		if(b[0] in dict.keys()):
			i = dict[b[0]] + b[-1]
		dict[b[0]] = i
	i=1;
	
	for k,v in dict.items():
		fi = open("cleanData"+i+".txt","w")
		fi.write("{Title: "+k+"Value:"+v)
		fi.close
		i++
			
	json = json.dumps(dict)
	#print(list)
	#n = filepath.split('.')[0]
	fi = open("cleanData.json","w")
	fi.write(json)
finally:
	f.close()
	fi.close()

