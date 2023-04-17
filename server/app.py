from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import polars as pl
import base64
from segmentation import segmentation
import json

basedir = os.path.abspath(os.path.dirname(__file__))


def login_ret(df, name, password):
    if len(df.filter((pl.col('name') == name) & (pl.col('password') == password))) > 0:
        user_id = df.filter((pl.col('name') == name) & (pl.col('password') == password))['id'][0]
        return jsonify({'res': True, 'message': 'Welcome back, ' + name + '!', 'id': user_id})
    elif len(df.filter(pl.col('name') == name)) > 0:
        return jsonify({'res': False, 'message': 'Incorrect password!'})
    else:
        return jsonify({'res': False, 'message': 'Account does not exist! Please register.'})


def register_ret(df, df_path, email, name, password):
    if len(df.filter(pl.col('email') == email)) > 0:
        return jsonify({'res': False, 'message': 'Acount already exists! Please log in.'})
    elif len(df.filter(pl.col('name') == name)) > 0:
        return jsonify({'res': False, 'message': 'This name has been used, please use another name.'})
    elif len(name) == 0 or name.find(' ') != -1 or name[0].isnumeric():
        return jsonify(
            {'res': False, 'message': 'Invalid name! Please do not include space or use number as the first letter.'})
    else:
        id = df.height
        df_new = pl.DataFrame({'id': id, 'email': [email], 'name': [name], 'password': [password]})
        df = df.extend(df_new)
        df.write_csv(df_path)
        return jsonify({'res': True, 'message': 'Welcome, ' + name + '!', 'id': id})


df_path = 'user_database.csv'
user_path = 'user_info/'
os.makedirs(user_path, exist_ok=True)
if not os.path.exists(df_path):
    df = pl.DataFrame({'id': 0, 'email': ['tester@gmail.com'], 'name': ['tester'], 'password': ['tester']})
    df.write_csv(df_path)
else:
    df = pl.read_csv(df_path)
    if len(df) <= 1:
        df = pl.DataFrame({'id': 0, 'email': ['tester@gmail.com'], 'name': ['tester'], 'password': ['tester']})

recording_path = 'recordings.csv'
if not os.path.exists(recording_path):
    recording = pl.DataFrame({'user': 'xxx', 'content': 'xxx'})
    recording.write_csv(recording_path)
else:
    recording = pl.read_csv(recording_path)
    if len(df) <= 1:
        recording = pl.DataFrame({'user': 'xxx', 'content': 'xxx'})
        recording.write_csv(recording_path)

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


    @app.route('/upload_photo/', methods=['POST', 'GET'])
    def up_photo():
        img = request.files['file']
        username = request.form.get('username')
        character_name = request.form.get('characterName')
        suffix = '.' + img.filename.split('.')[1]
        path = basedir + '/user_info/' + username
        os.makedirs(path, exist_ok=True)
        mask_path = basedir + '/masked_user_info/' + username
        os.makedirs(mask_path, exist_ok=True)
        file_path = path + '/' + character_name + suffix
        with open(file_path, mode='a', encoding='utf-8') as file:
            img.save(file_path)
            segmentation('/user_info/', username, character_name, suffix)
            new_path = os.path.abspath(os.path.dirname(__file__)) + '/masked_user_info/' + username + '/' + character_name + '.png'
            with open(new_path, 'rb') as f:
                img = f.read()
                img = base64.b64encode(img).decode()
            return jsonify({
                'res': 'success',
                'img': {
                    'name': character_name,
                    'src': 'data:image/png;base64,' + img
                }
            })


    @app.route('/obtain_photo/', methods=['GET'])
    def down_photo():
        username = request.args.get('username')
        imgs = []
        path = os.path.abspath(os.path.dirname(__file__)) + '/masked_user_info/' + username
        print(path)
        for dirPath, dirNames, fileNames in os.walk(path):
            for file in fileNames:
                file_path = path + '/' + file
                with open(file_path, 'rb') as f:
                    img = f.read()
                    img = base64.b64encode(img).decode()
                    imgs.append({
                        'name': file.split('.')[0],
                        'src': img
                    })
        return jsonify({
            'res': 'success',
            'imgs': imgs
        })


    @app.route('/save_recording/', methods=['POST', 'GET'])
    def save_recording():
        content = request.get_json()
        new_recording_df = pl.DataFrame({'user': content['user'], 'content': json.dumps(content['data'])})
        recordings = pl.read_csv(recording_path)
        existing_df = recordings.filter((pl.col('user') == content['user']))
        if existing_df.is_empty():
            new_recording_df.write_csv(recording_path)
            print('add new')
        else:
            existing_df.update(new_recording_df)
            print('update')
        return jsonify({
            'res': 'success'
        })

    @app.route('/obtain_recording/', methods=['GET'])
    def obtain_recording():
        content = request.get_json()
        recordings = pl.read_csv(recording_path)
        existing_df = recordings.filter((pl.col('user') == content['user']))
        res = ''
        if existing_df.is_empty():
            res = 'no result'
        else:
            print(existing_df)
            print('update')
        return jsonify({
            'res': 'success'
        })

if __name__ == '__main__':
    app.run(debug=True, port=3001)
