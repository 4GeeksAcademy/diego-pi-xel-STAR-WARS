from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from api.models import db, Users, Posts, Characters, Planets, Starships, FavoritesCharacters, FavoritesPlanets, FavoritesStarships
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import requests


api = Blueprint('api', __name__)
CORS(api) 
 

@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend"
    return jsonify(response_body), 200


@api.route("/login", methods=["POST"]) 
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    if not user:
        response_body["message"] = "Bad email or password"
        return jsonify(response_body), 401
    access_token = create_access_token(identity={'email': user.email, 'user_id': user.id, 'is_admin': user.is_admin})
    response_body["message"] = f'Welcome {email}'
    response_body["access_token"] = access_token
    response_body['results'] = user.serialize()  # Asegúrate de que el método serialize() esté definido en tu modelo
    return jsonify(response_body), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    current_user = get_jwt_identity()
    response_body["logged_in_as"] = current_user
    return jsonify(response_body), 200


@api.route('/users', methods=['GET'])
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    result = [row.serialize() for row in rows]
    response_body['message'] = 'List of Users and their posts (GET)'
    response_body['results'] = result
    return jsonify(response_body), 200


@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'List of all posts (GET)'
        response_body['results'] = result
        return jsonify(response_body), 200
    if request.method == 'POST':
        data = request.json
        post = Posts(
            title=data.get('title'),
            description=data.get('description'),
            body=data.get('body'),
            date=datetime.now(),
            image_url=data.get('image_url'),
            user_id=data.get('user_id'),
        )
        db.session.add(post)
        db.session.commit()
        response_body['message'] = 'Creating a new post (POST)'
        response_body['results'] = post.serialize()
        return jsonify(response_body), 200


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'Post {id} not found'
        return jsonify(response_body), 404
    current_user = get_jwt_identity()
    if row.user_id != current_user['user_id']:
        response_body['message'] = f'You cannot manage post {id}'
        return jsonify(response_body), 401
    if request.method == 'GET':
        response_body['message'] = f'Retrieving data for post {id}'
        response_body['result'] = row.serialize()
        return jsonify(response_body), 200
    if request.method == 'PUT':
        data = request.json
        row.title = data.get('title')
        row.description = data.get('description')
        row.body = data.get('body')
        row.date = datetime.now()
        row.image_url = data.get('image_url')
        db.session.commit()
        response_body['message'] = f'Post {id} updated'
        response_body['result'] = row.serialize()
        return jsonify(response_body), 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Post {id} deleted'
        return jsonify(response_body), 200


@api.route('/characters', methods=['GET'])
def characters():
    response_body = {}
    url = "https://swapi.dev/api/people"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        for row in data['results']:
            character = Characters(
                name=row.get("name"),
                height=row.get("height"),
                mass=row.get("mass"),
                hair_color=row.get("hair_color"),
                skin_color=row.get("skin_color"),
                eye_color=row.get("eye_color"),
                birth_year=row.get("birth_year")
            )
            db.session.add(character)
        db.session.commit()
        response_body['results'] = data
    return jsonify(response_body), 200


