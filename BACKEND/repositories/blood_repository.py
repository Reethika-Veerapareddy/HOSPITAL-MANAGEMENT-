from extensions import db
from models.blood_inventory import BloodInventory
from datetime import datetime

# Get all blood inventory
def get_all_blood():
    return BloodInventory.query.order_by(BloodInventory.id.desc()).all()

# Get blood by ID
def get_blood_by_id(id):
    return BloodInventory.query.get(id)

# Add new blood stock
def add_blood(data):
    collection_date = None
    expiry_date = None

    if data.get("collection_date"):
        collection_date = datetime.strptime(
            data["collection_date"],
            "%Y-%m-%d"
        ).date()

    if data.get("expiry_date"):
        expiry_date = datetime.strptime(
            data["expiry_date"],
            "%Y-%m-%d"
        ).date()

    blood = BloodInventory(
        blood_group=data.get("blood_group"),
        component=data.get("component"),
        units=data.get("units"),
        collection_date=collection_date,
        expiry_date=expiry_date,
        status=data.get("status"),
        hospital_name=data.get("hospital_name")
    )

    db.session.add(blood)
    db.session.commit()

    return blood

# Update blood stock
def update_blood(id, data):
    blood = BloodInventory.query.get(id)

    if not blood:
        return None

    if "units" in data:
        blood.units = data["units"]

    if "status" in data:
        blood.status = data["status"]

    if "expiry_date" in data and data["expiry_date"]:
        blood.expiry_date = datetime.strptime(
            data["expiry_date"],
            "%Y-%m-%d"
        ).date()

    db.session.commit()

    return blood

# Delete blood stock
def delete_blood(id):
    blood = BloodInventory.query.get(id)

    if not blood:
        return False

    db.session.delete(blood)
    db.session.commit()

    return True