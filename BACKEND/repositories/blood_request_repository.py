from extensions import db
from models.blood_request import BloodRequest
from datetime import datetime


# Get all requests
def get_all_requests():
    return BloodRequest.query.order_by(BloodRequest.created_at.desc()).all()


# Get request by ID
def get_request_by_id(request_id):
    return BloodRequest.query.get(request_id)


# Create new emergency request
def create_request(data):
    required_time = None

    if data.get("required_time") and data.get("required_time") != "":
        required_time = datetime.strptime(
            data["required_time"],
            "%Y-%m-%dT%H:%M"
        )

    request = BloodRequest(
        patient_name=data.get("patient_name"),
        blood_group=data.get("blood_group"),
        units_required=int(data.get("units_required", 1)),
        priority=data.get("priority", "Urgent"),
        hospital_name=data.get("hospital_name", "Smart Hospital"),
        required_time=required_time,
        contact_number=data.get("contact_number"),
        status="Pending"
    )

    db.session.add(request)
    db.session.commit()

    return request


# Update request status
def update_request_status(request_id, status):
    request = BloodRequest.query.get(request_id)

    if not request:
        return None

    request.status = status
    db.session.commit()

    return request


# Delete request
def delete_request(request_id):
    request = BloodRequest.query.get(request_id)

    if not request:
        return False

    db.session.delete(request)
    db.session.commit()

    return True