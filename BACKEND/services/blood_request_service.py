from repositories.blood_request_repository import (
    get_all_requests,
    create_request,
    update_request_status,
    delete_request
)


def fetch_requests():
    requests = get_all_requests()
    return [request.to_dict() for request in requests]


def create_emergency_request(data):
    request = create_request(data)
    return request.to_dict()


def change_request_status(request_id, status):
    request = update_request_status(request_id, status)

    if request:
        return request.to_dict()

    return None


def remove_request(request_id):
    return delete_request(request_id)