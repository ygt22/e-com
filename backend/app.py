from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy data for coupon validation
coupons = {
    "SAVE10": 10,  # 10% discount
    "SAVE20": 20,  # 20% discount
}

@app.route('/api/apply-coupon', methods=['POST'])
def validate_coupon():
    try:
        data = request.get_json()  # Gelen JSON verisini al
        coupon_code = data.get("couponCode", "").strip()  # Kupon kodunu al ve temizle

        # Kupon kodunu doğrula
        if coupon_code in coupons:
            discount = coupons[coupon_code]
            return jsonify({"success": True, "discount": discount})
        else:
            return jsonify({"success": False, "message": "Invalid coupon code."})
    except Exception as e:
        # Hata durumunda genel bir yanıt döndür
        return jsonify({"success": False, "message": "An error occurred.", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
