from extensions import db
from datetime import datetime

class BloodInventory(db.Model):
    __tablename__ = "blood_inventory"

    id = db.Column(db.Integer, primary_key=True)

    blood_group = db.Column(db.String(5), nullable=False)

    component = db.Column(db.String(50), nullable=False)

    units = db.Column(db.Integer, nullable=False)

    collection_date = db.Column(db.Date)

    expiry_date = db.Column(db.Date)

    status = db.Column(db.String(20), default="Available")

    hospital_name = db.Column(db.String(100), default="Smart Hospital")

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "blood_group": self.blood_group,
            "component": self.component,
            "units": self.units,
            "collection_date": str(self.collection_date) if self.collection_date else None,
            "expiry_date": str(self.expiry_date) if self.expiry_date else None,
            "status": self.status,
            "hospital_name": self.hospital_name,
            "created_at": str(self.created_at),
        }