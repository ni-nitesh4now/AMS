from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId
from datetime import datetime
from flask_cors import CORS  # Import the CORS module
import flask_cors


app = Flask(__name__)
flask_cors.cross_origin(
    origins='http://localhost:3000/',
    methods=['GET', 'POST', 'HEAD', 'OPTIONS', 'PUT', 'DELETE'],
    headers=None,
    supports_credentials=False,
    max_age=None,
    send_wildcard=True,
    always_send=True,
    automatic_options=False
)

# Enable CORS for all routes
CORS(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/newdatabase'
mongo = PyMongo(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/newdatabse_management"
mongo_m = PyMongo(app)

# API endpoints supporting CRUD operations
# def get_entities(collection_name, dbinitialize):
#     all_entities = list(dbinitialize.db[collection_name].find())
#     return jsonify(all_entities)
#Wrong code above

#correct code
def get_entities(collection_name, mongo):
    collection = mongo.db[collection_name]
    all_entities = list(collection.find())
    # Convert ObjectId to string for JSON serialization
    for entity in all_entities:
        entity['_id'] = str(entity['_id'])
    
    return jsonify(all_entities)


def get_entity(collection_name, entity_id, dbinitialize):
    entity = dbinitialize.db[collection_name].find_one({"_id": entity_id})
    return entity

def update_entity(collection_name, entity_id, entity_data, dbinitialize):
    result = dbinitialize.db[collection_name].update_one({"_id": entity_id},
                                                  {"$set": entity_data})
    if result.modified_count == 0:
        return jsonify({"error": f"{collection_name.capitalize()} notfound"}), 404
    updated_entity = dbinitialize.db[collection_name].find_one({"_id": entity_id})
    return jsonify(updated_entity)

def block_entity(collection_name, entity_id, db_initialize):
    entity = db_initialize.db[collection_name].find_one({"_id": entity_id})
    if not entity:
        return jsonify({"error": f"{collection_name.capitalize()} not found"}), 404

    new_blocked_value = not entity.get("blocked", False)  # Toggle the 'blocked' value
    result = db_initialize.db[collection_name].update_one({"_id": entity_id}, {"$set": {"blocked": new_blocked_value}})

    if result.modified_count == 0:
        return jsonify({"error": f"Failed to update {collection_name.capitalize()}'s 'blocked' status"}), 500

    updated_entity = db_initialize.db[collection_name].find_one({"_id": entity_id})

    return jsonify(updated_entity), 200

def delete_entity(collection_name, entity_id):
    deleted_entity = mongo.db[collection_name].find_one_and_delete({"_id": entity_id})
    if deleted_entity is None:
        return jsonify({"error": f"{collection_name.capitalize()} not found"}), 404
    return jsonify(deleted_entity)

# Calculate total amount including tax
# @app.route('/calculate_total', methods=['GET'])
def calculate_total(amount, tax_regime, tax_excluded):
    if  tax_excluded == True :
        total = amount
    elif tax_regime is not None:
        total = amount + (amount * tax_regime / 100)
    return total

def format_date(date):
    date_obj = datetime.strptime(date, "%Y-%m-%d")
    year = date_obj.year
    month = date_obj.month
    day = date_obj.day
    return datetime(year, month, day)
           
def check_expire(coupon_id):
    coupon = get_entity(coupon_id)
    if coupon and coupon['expire_date'] > datetime.now():
        return True
    else:
        return False

# subscription CRUD operations
                                                                                    # All API's checked by ARPIT
# get all subscriptions 
@app.route('/subscriptions', methods=['GET'])
def get_subscriptions():
    return get_entities('subscription_manage', mongo)

# get one subscription
@app.route('/subscription/<string:subscription_id>', methods=['GET'])
def get_subscription(subscription_id):
    return get_entities('subscription_manage', subscription_id, mongo)

# create a new subscription
@app.route('/create_subscription', methods=['POST'])
def create_subscription():
    name = request.form.get('name')
    amount = int(request.form.get('amount'))
    period = request.form.get('period')
    description = request.form.get('description')
    feature_offering = request.form.get('feature_offering')
    tax_regime = int(request.form.get('tax_regime'))
    tax_excluded = request.form.get('tax_excluded')
    total = calculate_total(amount,tax_regime, tax_excluded)

    new_subscription ={
        "_id": str(ObjectId()),
        'name': name,
        'amount': amount,
        'period': period,
        'description': description,
        'feature_offering': feature_offering,
        'tax_regime': tax_regime,
        'tax_excluded': tax_excluded,
        'total': total
    }
    try:
        inserted_id = mongo.db.subscription_manage.insert_one(new_subscription).inserted_id
        inserted = mongo.db.subscription_manage.find_one({"_id": inserted_id})
        return jsonify({"_id": str(inserted["_id"])})
    except Exception as e:
        return jsonify({"error": "Error occurred while creating the class"}), 500
    
# update subscription requires existing subscription id
@app.route('/update_subscription/<string:subscription_id>', methods=['PUT'])
def update_subscription(subscription_id):
    name = request.form.get('name')
    amount = int(request.form.get('amount'))
    period = request.form.get('period')
    description = request.form.get('description')
    feature_offering = request.form.get('feature_offering')
    tax_regime = int(request.form.get('tax_regime'))
    tax_excluded = request.form.get('tax_excluded')
    total = calculate_total(amount,tax_regime, tax_excluded)

    update_subscription ={
        'name': name,
        'amount': amount,
        'period': period,
        'description': description,
        'feature_offering': feature_offering,
        'tax_regime': tax_regime,
        'total': total
    }
    return update_entity('subscription_manage', subscription_id, update_subscription, mongo)

# delete subscription requires existing subscription id
@app.route('/delete_subscription/<string:subscription_id>', methods=['DELETE'])
def delete_subscription(subscription_id):
    return delete_entity('subscription_manage', subscription_id)

#get all users on platform
@app.route('/get_all_platform/users', methods = ['GET'])
def all_platform_users():
    all_entities = []
    projection = {"_id":1, "user_Id":1, "name": 1, "email": 1, "phone": 1}
    students = list(mongo.db.student_profile.find(projection=projection))
    teachers = list(mongo.db.teachet_profile.find(projection=projection))
    managements = list(mongo_m.db.management_profile.find(projection=projection))
    parents = list(mongo.db.parent_profile.find(projection=projection))
    all_entities = all_entities + students + teachers + managements + parents
    return jsonify(all_entities)

@app.route('/edit_user/<string:_id>')
def edit_user_details(_id):
    update_user_id = request.form.get('user_id')
    if mongo.db.student_profile.find_one({"_id": _id}) is not None:
        # entity = mongo.db.student_profile.find_one({"_id": _id})
        collection_name = 'student_profile'
        dbinitialize = mongo
    elif mongo.db.teacher_profile.find_one({"_id": _id}) is not None:
        # entity = mongo.db.teacher_profile.find_one({"_id": _id})
        collection_name = 'teacher_profile'
        dbinitialize = mongo
    elif mongo_m.db.management_profile.find_one({"_id": _id}) is not None:
        # entity = mongo_m.db.management_profile.find_one({"_id": _id})
        collection_name = 'management_profile'
        dbinitialize = mongo
    elif mongo.db.parent_profile.find_one({"_id": _id}) is not None:
        # entity = mongo.db.parent_profile.find_one({"_id": _id})
        collection_name = 'parent_profile'
        dbinitialize = mongo
    entity_data = {
        'user_id': update_user_id
    }
    return update_entity(collection_name, _id, entity_data, dbinitialize)

# use same api for block and suspend
#block single user, which can be possible from admin site
@app.route('/block_user/<string:email>', methods = ['PUT'])
def block_single_user(email):
    dbinitialize = ""
    if mongo.db.users.find_one({"email": email}) is not None:
        entity = mongo.db.users.find_one({"email": email})
        dbinitialize = mongo
    elif mongo_m.db.users.find_one({"email": email}) is not None:
        entity = mongo_m.db.users.find_one({"email": email})
        dbinitialize = mongo_m
    try:
        new_blocked_value = not entity.get("blocked", False)  # Toggle the 'blocked' value
        result = dbinitialize.db.users.update_one({"_id": entity["_id"]}, {"$set": {"blocked": new_blocked_value}})

        if result.modified_count == 0:
            return jsonify({"error": "Failed to update user's 'blocked' status"}), 500

        updated_entity = dbinitialize.db.users.find_one({"_id": entity["_id"]})
        return updated_entity, 200
    except Exception as e:
        return jsonify({"error": "Error occurred while blocking user"}), 500
    

# Coupon CRUD operations
@app.route('/get_all_coupon', methods = ['GET'])
def get_all_coupon():
    return get_entities('coupons_collection', mongo)

#Create new coupon
@app.route('/generate_coupon', methods=['POST'])
def generate_coupon():
    try:
        coupon_code = request.form.get('coupon_code')
        coupon_type = request.form.get('coupon_type')
        discount = int(request.form.get('discount'))
        start_date = request.form.get('start_date')
        expire_date = request.form.get('expire_date')
        description = request.form.get('description')
        entity_data = {
            '_id': coupon_code, 
            'discount': discount, 
            'coupon_type': coupon_type,
            'description': description,
            'start_date':start_date, 
            'expire_date': expire_date, 
            'used': False,
            'created_at': datetime.now(),
            'updated_at': "Not updated"
            }
        inserted_id = mongo.db.coupons_collection.insert_one(entity_data).inserted_id
        inserted = mongo.db.coupons_collection.find_one({"_id": inserted_id})
        return jsonify({"_id": str(inserted["_id"])}), 200
    except ValueError as e:
        return "Invalid discount value. Please enter a valid number.", 404


# update existing coupon 
@app.route('/update_coupon/<string:coupon_id>', methods = ['PUT'])
def update_coupon(coupon_id):
    coupon_code = request.form.get('coupon_code')
    coupon_type = request.form.get('coupon_type')
    discount = int(request.form.get('discount'))
    start_date = request.form.get('start_date')
    expire_date = request.form.get('expire_date')
    description = request.form.get('description')
    entity_data = {
        '_id':coupon_code,
        'coupon_type':coupon_type,
        'discount':discount,
        'start_date':start_date,
        'expire_date':expire_date,
        'description':description,
        'updated_at':datetime.now()
    }
    return update_entity('coupons_collection', coupon_id, entity_data, mongo )

#delete existing coupon
@app.route('/delete_coupon/<string:coupon_id>', methods = ['DELETE'])
def delete_coupon(coupon_id):
    return delete_entity('coupons_collection', coupon_id)

if __name__ == '__main__':
    app.run(debug=True)