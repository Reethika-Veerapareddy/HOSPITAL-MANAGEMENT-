from flask import Blueprint, request, jsonify
from services.blood_request_service import (
    fetch_requests,
    create_emergency_request,
    change_request_status,
    remove_request
)

blood_request_bp = Blueprint("blood_request", __name__)


@blood_request_bp.route("/requests", methods=["GET"])
def get_requests():
    return jsonify(fetch_requests())


@blood_request_bp.route("/requests", methods=["POST"])
def create_request_route():
    data = request.get_json()
    result = create_emergency_request(data)
    return jsonify(result), 201


@blood_request_bp.route("/requests/<int:request_id>", methods=["PUT"])
def update_request_route(request_id):
    data = request.get_json()
    result = change_request_status(request_id, data.get("status"))

    if result:
        return jsonify(result)

    return jsonify({"message": "Request not found"}), 404


@blood_request_bp.route("/requests/<int:request_id>", methods=["DELETE"])
def delete_request_route(request_id):
    if remove_request(request_id):
        return jsonify({"message": "Deleted successfully"})

    return jsonify({"message": "Request not found"}), 404