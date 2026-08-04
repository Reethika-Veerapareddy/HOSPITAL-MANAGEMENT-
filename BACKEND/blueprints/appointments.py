from flask import Blueprint, request, jsonify
from datetime import datetime
from extensions import db
from models.appointment import Appointment

appointments_bp = Blueprint('appointments', __name__)

@appointments_bp.route('/', methods=['GET'])
def get_appointments():
    appointments = Appointment.query.order_by(Appointment.appointment_date.desc()).all()
    return jsonify([a.to_dict() for a in appointments]), 200

@appointments_bp.route('/', methods=['POST'])
def add_appointment():
    data = request.get_json()

    date_obj = datetime.strptime(
        data['appointment_date'],
        '%Y-%m-%d'
    ).date()

    existing = Appointment.query.filter_by(
        doctor_id=data['doctor_id'],
        appointment_date=date_obj,
        appointment_time=data['appointment_time']
    ).first()

    if existing:
        return jsonify({
            'message': 'Doctor already has an appointment at this time'
        }), 400

    appointment = Appointment(
        appointment_id=data['appointment_id'],
        patient_id=data['patient_id'],
        doctor_id=data['doctor_id'],
        appointment_date=date_obj,
        appointment_time=data['appointment_time'],
        status=data.get('status', 'Confirmed'),
        notes=data.get('notes')
    )

    db.session.add(appointment)
    db.session.commit()

    return jsonify({
        'message': 'Appointment booked successfully',
        'appointment': appointment.to_dict()
    }), 201

@appointments_bp.route('/<int:id>', methods=['PUT'])
def update_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    data = request.get_json()

    date_obj = datetime.strptime(
        data['appointment_date'],
        '%Y-%m-%d'
    ).date()

    existing = Appointment.query.filter(
        Appointment.id != id,
        Appointment.doctor_id == data['doctor_id'],
        Appointment.appointment_date == date_obj,
        Appointment.appointment_time == data['appointment_time']
    ).first()

    if existing:
        return jsonify({
            'message': 'Doctor already has an appointment at this time'
        }), 400

    appointment.patient_id = data['patient_id']
    appointment.doctor_id = data['doctor_id']
    appointment.appointment_date = date_obj
    appointment.appointment_time = data['appointment_time']
    appointment.status = data['status']
    appointment.notes = data.get('notes')

    db.session.commit()

    return jsonify({
        'message': 'Appointment updated successfully',
        'appointment': appointment.to_dict()
    }), 200

@appointments_bp.route('/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    appointment = Appointment.query.get_or_404(id)

    db.session.delete(appointment)
    db.session.commit()

    return jsonify({
        'message': 'Appointment deleted successfully'
    }), 200