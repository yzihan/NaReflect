from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import ast
import time

CACHE = [] # A list storing the most recent 5 reframing history
MAX_STORE = 5 # The maximum number of history user would like to store

def input_error_message(error_type):
    # type: (str) -> str
    """Generate an input error message from error type."""
    return "[Error]: Invalid Input. " + error_type

def update_cache(cache, new_record):
    # type: List[List[str, str, str]] -> List[List[str, str, str]]
    """Update the cache to store the most recent five reframing histories."""
    cache.append(new_record)
    cache = cache[1:] if len(cache) > MAX_STORE else cache
    return cache

def test(input_text):
    global CACHE
    CACHE = update_cache(CACHE, [input_text])
    return 'Input: '+input_text

import os
import polars as pl
def login_ret(df, name, password):
    #print(password, password.type)
    print(len(df.filter(pl.col('password')==str(password))))
    if len(df.filter((pl.col('name')==name) & (pl.col('password')==password))) > 0:
        return jsonify({'res':True, 'message':'Welcome back, '+name+'!'})
    elif len(df.filter(pl.col('name')==name)) > 0:
        return jsonify({'res':False, 'message':'Incorrect password!'})
    else:
        return jsonify({'res':False, 'message':'Account does not exist! Please register.'})

def register_ret(df, df_path, email, name, password):
    if len(df.filter(pl.col('email')==email)) > 0:
        return jsonify({'res':False, 'message':'Acount already exists! Please log in.'})
    elif len(df.filter(pl.col('name')==name)) > 0 :
        return jsonify({'res':False, 'message':'This name has been used, please use another name.'})
    elif len(name)==0 or name.find(' ') != -1 or name[0].isnumeric():
        return jsonify({'res':False, 'message':'Invalid name! Please do not include space or use number as the first letter.'})
    else:
        df_new = pl.DataFrame({'email':[email], 'name':[name], 'password':[password]})
        df = df.extend(df_new)
        df.write_csv(df_path)
        return jsonify({'res':True, 'message':'Welcome, '+name+'!'})

def desc_ret(name, path, title, style, desc):
    path = os.path.join(path, name)
    os.makedirs(path, exist_ok=True)
    if len(title) == 0 or len(desc) == 0:
        return jsonify({'res':False, 'message':'Empty input!'})
    folder = ''.join([w.capitalize() for w in title.split()])
    if os.path.exists(os.path.join(path, name, folder)):
        return jsonify({'res':False, 'message':'This dream already exists, please use a new title!'})
    desc = desc.replace('\n','')
    desc += '.' if desc[-1] != '.' else ''
    time.sleep(3);
    # TODO: interpretation
    return jsonify({'res':True, 'folder':folder, 'title':title, 'style':style, 'desc':desc, 
        'sentences': ['This morning I had breakfast with my dad in the kitchen, with sunbeams streaming through the large windows. I was excited that I can finally go to the art museum with my friends Alice and Bella. ',
                      'Suddenly, it started raining outside. I went to the old train station nearby to wait for the train to go to the museum.',
                      'I was all wet when I arrived, but I didn’t care because I saw Alice and Bella waiting for me in the spacious halls of the art museum, with exquisite European oil paintings in golden ornate frames on the walls.',
                      'I forgot all about the weather, and we spent a lovely afternoon immersing in the beautiful paintings.'], 
        'chars':['My dad', '', 'Alice; Bella', ''], 
        'scenes':['scene1','s2','s3','s4'],
        'acts':['had breakfast in the kitchen, with sunbeams streaming through the large windows.', 
                'raining outside; went to the old train station nearby to wait for the train.', 
                'the spacious halls of the art museum, with exquisite European oil paintings in golden ornate frames on the walls.', 
                'immersing in the beautiful paintings.']})
    

df_path = 'user_database.csv'
user_path = 'user_info/'
os.makedirs(user_path, exist_ok=True)
if not os.path.exists(df_path):
    df = pl.DataFrame({'email':['tester@gmail.com'], 'name':['tester'], 'password':['tester']})
    df.write_csv(df_path)
else:
    df = pl.read_csv(df_path)
    if len(df) <= 1:
        df = pl.DataFrame({'email':['tester@gmail.com'], 'name':['tester'], 'password':['tester']})
print(df)
app = Flask(__name__)
CORS(app, resources=r'/*')
with app.app_context():
    @app.route('/login/', methods=['GET', 'POST'])
    def login():
        if request.method == 'POST':
            content = request.get_json()
            print(content)
            return login_ret(df, content['user'], content['password'])
    @app.route('/register/', methods=['GET', 'POST'])
    def register():
        if request.method == 'POST':
            content = request.get_json()
            return register_ret(df, df_path, content['email'], content['user'], content['password'])
    @app.route('/description/', methods=['GET', 'POST'])
    def desc():
        if request.method == 'POST':
            content = request.get_json()
            return desc_ret(content['user'], user_path, content['title'], content['style'], content['desc'])
    
    
        

    #res = app.test_client().post('/login', json={'user':'mm','password':'123'})
    #print(res)
    #print(res.get_json())

if __name__ == '__main__':
    app.run(debug=True, port=3001)
    
    #app.test_client().get('/login', query_string='get')
    print('main')