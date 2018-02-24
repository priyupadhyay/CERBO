import nltk
import json

filepath = 'Bdb001.trans'
list = []
grp = ""
i = 0
dict = {}
try:
	with open(filepath, 'r') as f:
		for file in f:
			line = file.split(",")[-1]
			words = set(nltk.corpus.words.words())
			a = " ".join(w for w in nltk.wordpunct_tokenize(line) if w.lower() in words or w.isnumeric())
			#list.append(a)
			if a != "":
				grp = grp + a +"\n"
			else:
				dict[i] = grp
				i = i+1
				grp = ""
			
	#print(list)
	n = filepath.split('.')[0]
	with open(n + '_data' + '.txt', 'w') as outfile:  
		json.dump(dict, outfile)
finally:
	f.close()
	outfile.close()

