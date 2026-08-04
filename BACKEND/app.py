from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, ma, jwt

from blueprints.auth import auth_bp
from blueprints.doctors import doctors_bp
from blueprints.patients import patients_bp
from blueprints.appointments import appointments_bp
from routes.blood_routes import blood_bp

from routes.blood_request_routes import blood_request_bp



app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for React frontend
CORS(
    app,
    resources={r'/api/*': {'origins': 'http://localhost:5173'}},
    supports_credentials=True
)

db.init_app(app)
ma.init_app(app)
jwt.init_app(app)

@app.route('/')
def home():
    return {'message': 'Backend connected successfully'}

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(doctors_bp, url_prefix='/api/doctors')
app.register_blueprint(patients_bp, url_prefix='/api/patients')
app.register_blueprint(appointments_bp, url_prefix='/api/appointments')
app.register_blueprint(
blood_bp,
url_prefix="/api/blood"
)
app.register_blueprint(blood_request_bp, url_prefix="/api/blood")

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)