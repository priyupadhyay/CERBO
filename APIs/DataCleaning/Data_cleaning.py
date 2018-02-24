import nltk



filepath = 'Bdb001.trans'
datepattern = '%d-%m-%Y'
with open(filepath, 'r') as f:
	for file in f:
		line = file.split(",")[-1]
		words = set(nltk.corpus.words.words())
		a = " ".join(w for w in nltk.wordpunct_tokenize(line) if w.lower() in words or not w.isalpha())
		
		print(a)

#print("res",res)
