from flask import Blueprint, request, jsonify
from models.user import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    print('LOGIN ROUTE CALLED', flush=True)

    data = request.get_json(force=True)

    email = data.get('email', '').strip()
    password = data.get('password', '').strip()

    print(f'Email: {email}', flush=True)
    print(f'Password: {password}', flush=True)

    user = User.query.filter_by(email=email).first()

    print(f'User: {user}', flush=True)

    if user is None:
        return jsonify({'message': 'User not found'}), 401

    if user.password != password:
        return jsonify({'message': 'Wrong password'}), 401

    return jsonify({
        'access_token': 'hospital-token',
        'user': {
            'id': user.id,
            'full_name': user.full_name,
            'email': user.email,
            'role': user.role
        }
    }), 200