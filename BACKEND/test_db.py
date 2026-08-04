import pymysql

try:
    conn = pymysql.connect(
        host="localhost",
        user="root",
        password="reethu@2006",
        database="hospital_management",
        port=3306
    )
    print("Connected successfully!")
    conn.close()
except Exception as e:
    print("Connection failed:")
    print(e)