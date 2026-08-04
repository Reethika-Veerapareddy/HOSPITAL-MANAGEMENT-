from flask import Blueprint, request, jsonify
from extensions import db
from models.doctor import Doctor

doctors_bp = Blueprint('doctors', __name__)

# Get all doctors
@doctors_bp.route('/', methods=['GET'])
def get_doctors():
    search = request.args.get('search', '').strip()

    query = Doctor.query

    if search:
        query = query.filter(
            Doctor.full_name.ilike(f'%{search}%')
        )

    doctors = query.order_by(Doctor.id.desc()).all()

    return jsonify([
        doctor.to_dict() for doctor in doctors
    ]), 200


# Get single doctor profile
@doctors_bp.route('/<int:id>', methods=['GET'])
def get_doctor(id):
    doctor = Doctor.query.get_or_404(id)

    return jsonify(doctor.to_dict()), 200


# Add new doctor
@doctors_bp.route('/', methods=['POST'])
def add_doctor():
    data = request.get_json()

    required = [
        'doctor_id',
        'full_name',
        'specialization',
        'qualification',
        'experience',
        'phone',
        'email',
        'consultation_fee'
    ]

    for field in required:
        if field not in data or data[field] in ['', None]:
            return jsonify({
                'message': f'{field} is required'
            }), 400

    existing = Doctor.query.filter(
        (Doctor.doctor_id == data['doctor_id']) |
        (Doctor.email == data['email'])
    ).first()

    if existing:
        return jsonify({
            'message': 'Doctor ID or Email already exists'
        }), 400

    doctor = Doctor(
        doctor_id=data['doctor_id'],
        full_name=data['full_name'],
        specialization=data['specialization'],
        qualification=data['qualification'],
        experience=int(data['experience']),
        phone=data['phone'],
        email=data['email'],
        consultation_fee=float(data['consultation_fee']),
        availability=data.get(
            'availability',
            'Available'
        )
    )

    db.session.add(doctor)
    db.session.commit()

    return jsonify({
        'message': 'Doctor added successfully',
        'doctor': doctor.to_dict()
    }), 201


# Update doctor
@doctors_bp.route('/<int:id>', methods=['PUT'])
def update_doctor(id):
    doctor = Doctor.query.get_or_404(id)

    data = request.get_json()

    doctor.doctor_id = data['doctor_id']
    doctor.full_name = data['full_name']
    doctor.specialization = data['specialization']
    doctor.qualification = data['qualification']
    doctor.experience = int(data['experience'])
    doctor.phone = data['phone']
    doctor.email = data['email']
    doctor.consultation_fee = float(data['consultation_fee'])
    doctor.availability = data['availability']

    db.session.commit()

    return jsonify({
        'message': 'Doctor updated successfully',
        'doctor': doctor.to_dict()
    }), 200


# Delete doctor
@doctors_bp.route('/<int:id>', methods=['DELETE'])
def delete_doctor(id):
    doctor = Doctor.query.get_or_404(id)

    db.session.delete(doctor)
    db.session.commit()

    return jsonify({
        'message': 'Doctor deleted successfully'
    }), 200