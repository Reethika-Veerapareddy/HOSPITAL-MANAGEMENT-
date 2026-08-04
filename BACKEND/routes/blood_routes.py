from flask import Blueprint, request, jsonify
from services.blood_service import fetch_inventory, create_blood, remove_blood

blood_bp = Blueprint("blood", __name__)

@blood_bp.route("/inventory", methods=["GET"])
def inventory():
    return jsonify(fetch_inventory())

@blood_bp.route("/inventory", methods=["POST"])
def add_inventory():
    try:
        data = request.get_json()
        print("Received data:", data)

        blood = create_blood(data)

        return jsonify({
            "message": "Blood stock added successfully",
            "id": blood.id
        }), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            "message": str(e)
        }), 500

@blood_bp.route("/inventory/<int:id>", methods=["DELETE"])
def delete_inventory(id):
    if remove_blood(id):
        return jsonify({"message": "Deleted successfully"})

    return jsonify({"message": "Blood stock not found"}), 404