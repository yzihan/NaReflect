from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import os
import polars as pl

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


def login_ret(df, name, password):
    if len(df.filter((pl.col('name')==name) & (pl.col('password')==password))) > 0:
        user_id = df.filter((pl.col('name')==name) & (pl.col('password')==password))['id'][0]
        return jsonify({'res':True, 'message':'Welcome back, '+name+'!', 'id': user_id})
    elif len(df.filter(pl.col('name')==name)) > 0:
        return jsonify({'res':False, 'message':'Incorrect password!'})
    else:
        return jsonify({'res':False, 'message':'Account does not exist! Please register.'})

def upload_pic_ret():
    return jsonify({'res': True, 'message': 'Successfully upload!'})

def register_ret(df, df_path, email, name, password):
    if len(df.filter(pl.col('email')==email)) > 0:
        return jsonify({'res':False, 'message':'Acount already exists! Please log in.'})
    elif len(df.filter(pl.col('name')==name)) > 0 :
        return jsonify({'res':False, 'message':'This name has been used, please use another name.'})
    elif len(name)==0 or name.find(' ') != -1 or name[0].isnumeric():
        return jsonify({'res':False, 'message':'Invalid name! Please do not include space or use number as the first letter.'})
    else:
        id = df.height
        df_new = pl.DataFrame({'id':id, 'email':[email], 'name':[name], 'password':[password]})
        df = df.extend(df_new)
        df.write_csv(df_path)
        return jsonify({'res':True, 'message':'Welcome, '+name+'!', 'id': id})

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
    return jsonify({'res':True})


basedir = os.path.abspath(os.path.dirname(__file__))

df_path = 'user_database.csv'
user_path = 'user_info/'
os.makedirs(user_path, exist_ok=True)
if not os.path.exists(df_path):
    df = pl.DataFrame({'id':0, 'email':['tester@gmail.com'], 'name':['tester'], 'password':['tester']})
    df.write_csv(df_path)
else:
    df = pl.read_csv(df_path)
    if len(df) <= 1:
        df = pl.DataFrame({'id':0, 'email':['tester@gmail.com'], 'name':['tester'], 'password':['tester']})

app = Flask(__name__)
CORS(app, resources=r'/*')
with app.app_context():
    @app.route('/login/', methods=['POST'])
    def login():
        if request.method == 'POST':
            content = request.get_json()
            return login_ret(df, content['user'], content['password'])
    @app.route('/register/', methods=['POST'])
    def register():
        if request.method == 'POST':
            content = request.get_json()
            return register_ret(df, df_path, content['email'], content['user'], content['password'])
    @app.route('/description/', methods=['GET', 'POST'])
    def desc():
        if request.method == 'POST':
            content = request.get_json()
            return desc_ret(content['user'], user_path, content['title'], content['style'], content['desc'])
    @app.route('/history/', methods=['GET'])
    def history():
        if request.method == 'GET':
            request.args.get('')

    @app.route('/upload_photo/', methods=['POST','GET'])
    def up_photo():
        print(request.form)
        print(request.files)
        img = request.files['file']
        username = request.form.get('username')
        path = basedir + '\\user_info\\'
        file_path = path + username + '\\'+ img.filename
        with open(file_path, mode='a', encoding='utf-8') as file:
            print(file_path)
            img.save(file_path)
            return jsonify({
                'res': 'success'
            })



    #res = app.test_client().post('/login', json={'user':'mm','password':'123'})
    #print(res)
    #print(res.get_json())

if __name__ == '__main__':
    app.run(debug=True, port=3001)

    #app.test_client().get('/login', query_string='get')
    print('main')



