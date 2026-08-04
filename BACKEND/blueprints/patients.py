from flask import Blueprint, request, jsonify
from extensions import db
from models.patient import Patient
from datetime import datetime

patients_bp = Blueprint('patients', __name__)

@patients_bp.route('/', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return jsonify([patient.to_dict() for patient in patients])

@patients_bp.route('/<int:id>', methods=['GET'])
def get_patient(id):
    patient = Patient.query.get_or_404(id)
    return jsonify(patient.to_dict())
def generate_patient_id():
    last_patient = Patient.query.order_by(Patient.id.desc()).first()

    if last_patient is None:
        return 'PAT0001'

    try:
        last_number = int(last_patient.patient_id.replace('PAT', ''))
    except (ValueError, AttributeError):
        last_number = 0

    new_number = last_number + 1
    return f'PAT{new_number:04d}'

@patients_bp.route('/', methods=['POST'])
def add_patient():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'message': 'No data received'}), 400

        # Validate required fields
        required_fields = ['full_name', 'age', 'gender', 'phone']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'message': f'{field} is required'}), 400

        # Generate patient ID
        patient_id = generate_patient_id()

        # Safe date conversion
        dob = None
        if data.get('date_of_birth'):
            try:
                dob = datetime.strptime(
                    data['date_of_birth'],
                    '%Y-%m-%d'
                ).date()
            except ValueError:
                return jsonify({
                    'message': 'Invalid date format'
                }), 400

        patient = Patient(
            patient_id=patient_id,
            full_name=data.get('full_name'),
            date_of_birth=dob,
            age=int(data.get('age', 0)),
            gender=data.get('gender'),
            blood_group=data.get('blood_group'),
            marital_status=data.get('marital_status'),
            aadhaar_number=data.get('aadhaar_number'),
            phone=data.get('phone'),
            alternate_phone=data.get('alternate_phone'),
            email=data.get('email'),
            address=data.get('address'),
            city=data.get('city'),
            state=data.get('state'),
            pincode=data.get('pincode'),
            emergency_contact_name=data.get('emergency_contact_name'),
            emergency_contact_phone=data.get('emergency_contact_phone'),
            emergency_contact_relation=data.get('emergency_contact_relation'),
            department=data.get('department'),
            assigned_doctor=data.get('assigned_doctor'),
            patient_type=data.get('patient_type', 'OP'),
            insurance_provider=data.get('insurance_provider'),
            insurance_number=data.get('insurance_number'),
            allergies=data.get('allergies'),
            medical_conditions=data.get('medical_conditions'),
            notes=data.get('notes')
        )

        db.session.add(patient)
        db.session.commit()

        return jsonify({
            'message': 'Patient added successfully',
            'patient': patient.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        print('ADD PATIENT ERROR:', str(e))
        return jsonify({
            'message': str(e)
        }), 500

@patients_bp.route('/<int:id>', methods=['PUT'])
def update_patient(id):
    patient = Patient.query.get_or_404(id)
    data = request.get_json()

    patient.full_name = data.get('full_name')
    patient.age = int(data.get('age', 0))
    patient.gender = data.get('gender')
    patient.blood_group = data.get('blood_group')
    patient.phone = data.get('phone')
    patient.email = data.get('email')
    patient.address = data.get('address')

    db.session.commit()

    return jsonify({
        'message': 'Patient updated successfully',
        'patient': patient.to_dict()
    })

@patients_bp.route('/<int:id>', methods=['DELETE'])
def delete_patient(id):
    patient = Patient.query.get_or_404(id)

    db.session.delete(patient)
    db.session.commit()

    return jsonify({
        'message': 'Patient deleted successfully'
    })