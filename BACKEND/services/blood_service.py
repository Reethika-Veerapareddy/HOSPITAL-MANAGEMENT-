from repositories.blood_repository import (
    get_all_blood,
    add_blood,
    delete_blood
)

def fetch_inventory():
    blood_list = get_all_blood()

    result = []

    for blood in blood_list:
        result.append({
            "id": blood.id,
            "blood_group": blood.blood_group,
            "component": blood.component,
            "units": blood.units,
            "collection_date": str(blood.collection_date) if blood.collection_date else None,
            "expiry_date": str(blood.expiry_date) if blood.expiry_date else None,
            "status": blood.status,
            "hospital_name": blood.hospital_name
        })

    return result

def create_blood(data):
    blood_data = {
        "blood_group": data.get("blood_group"),
        "component": data.get("component"),
        "units": int(data.get("units", 0)),
        "collection_date": data.get("collection_date"),
        "expiry_date": data.get("expiry_date"),
        "status": data.get("status", "Available"),
        "hospital_name": data.get("hospital_name", "Smart Hospital")
    }

    return add_blood(blood_data)

def remove_blood(id):
    return delete_blood(id)