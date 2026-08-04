from datetime import datetime
from extensions import db

class Patient(db.Model):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)

    patient_id = db.Column(
        db.String(20),
        unique=True,
        nullable=False
    )

    full_name = db.Column(
        db.String(120),
        nullable=False
    )

    date_of_birth = db.Column(db.Date)

    age = db.Column(
        db.Integer,
        nullable=False
    )

    gender = db.Column(
        db.String(20),
        nullable=False
    )

    blood_group = db.Column(
        db.String(10)
    )

    marital_status = db.Column(
        db.String(20)
    )

    aadhaar_number = db.Column(
        db.String(20)
    )

    phone = db.Column(
        db.String(20),
        nullable=False
    )

    alternate_phone = db.Column(
        db.String(20)
    )

    email = db.Column(
        db.String(120)
    )

    address = db.Column(db.Text)

    city = db.Column(
        db.String(100)
    )

    state = db.Column(
        db.String(100)
    )

    pincode = db.Column(
        db.String(10)
    )

    emergency_contact_name = db.Column(
        db.String(120)
    )

    emergency_contact_phone = db.Column(
        db.String(20)
    )

    emergency_contact_relation = db.Column(
        db.String(50)
    )

    department = db.Column(
        db.String(100)
    )

    assigned_doctor = db.Column(
        db.String(120)
    )

    patient_type = db.Column(
        db.String(20),
        default='OP'
    )

    insurance_provider = db.Column(
        db.String(120)
    )

    insurance_number = db.Column(
        db.String(50)
    )

    allergies = db.Column(db.Text)

    medical_conditions = db.Column(db.Text)

    notes = db.Column(db.Text)

    registration_date = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'full_name': self.full_name,
            'date_of_birth': self.date_of_birth.strftime('%Y-%m-%d') if self.date_of_birth else None,
            'age': self.age,
            'gender': self.gender,
            'blood_group': self.blood_group,
            'marital_status': self.marital_status,
            'aadhaar_number': self.aadhaar_number,
            'phone': self.phone,
            'alternate_phone': self.alternate_phone,
            'email': self.email,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'pincode': self.pincode,
            'emergency_contact_name': self.emergency_contact_name,
            'emergency_contact_phone': self.emergency_contact_phone,
            'emergency_contact_relation': self.emergency_contact_relation,
            'department': self.department,
            'assigned_doctor': self.assigned_doctor,
            'patient_type': self.patient_type,
            'insurance_provider': self.insurance_provider,
            'insurance_number': self.insurance_number,
            'allergies': self.allergies,
            'medical_conditions': self.medical_conditions,
            'notes': self.notes,
            'registration_date': self.registration_date.strftime('%Y-%m-%d %H:%M:%S')
        }