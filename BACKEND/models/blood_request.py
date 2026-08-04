from extensions import db
from datetime import datetime

class BloodRequest(db.Model):
    __tablename__ = 'blood_requests'

    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(100), nullable=False)
    blood_group = db.Column(db.String(5), nullable=False)
    units_required = db.Column(db.Integer, nullable=False)
    priority = db.Column(db.String(20), nullable=False)
    hospital_name = db.Column(db.String(100), default='Smart Hospital')
    required_time = db.Column(db.DateTime)
    contact_number = db.Column(db.String(15))
    status = db.Column(db.String(20), default='Pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "patient_name": self.patient_name,
            "blood_group": self.blood_group,
            "units_required": self.units_required,
            "priority": self.priority,
            "hospital_name": self.hospital_name,
            "required_time": str(self.required_time) if self.required_time else None,
            "contact_number": self.contact_number,
            "status": self.status,
            "created_at": str(self.created_at),
        }