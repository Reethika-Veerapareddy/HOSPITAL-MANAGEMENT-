from datetime import datetime
from extensions import db

class Doctor(db.Model):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)

    doctor_id = db.Column(
        db.String(20),
        unique=True,
        nullable=False
    )

    full_name = db.Column(
        db.String(120),
        nullable=False
    )

    specialization = db.Column(
        db.String(120),
        nullable=False
    )

    qualification = db.Column(
        db.String(120),
        nullable=False
    )

    experience = db.Column(
        db.Integer,
        nullable=False,
        default=0
    )

    phone = db.Column(
        db.String(20),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    consultation_fee = db.Column(
        db.Float,
        nullable=False
    )

    availability = db.Column(
        db.String(20),
        nullable=False,
        default='Available'
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            'id': self.id,
            'doctor_id': self.doctor_id,
            'full_name': self.full_name,
            'specialization': self.specialization,
            'qualification': self.qualification,
            'experience': self.experience,
            'phone': self.phone,
            'email': self.email,
            'consultation_fee': self.consultation_fee,
            'availability': self.availability,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }