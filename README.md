# About the project:
The project can be described succinctly in three key points:

## Role-Based Application Management:

 - The project implements a Flask-based backend to manage diverse user roles, including students, teachers, parents, and management personnel.

 - User entities can be retrieved, updated, and blocked, ensuring fine-grained control over user access and permissions within the application.

## Subscription and Coupon System:

 - The application features a robust subscription management system where administrators can create, modify, and delete subscription plans. Each plan includes details like name, amount, period, and features.

 - Additionally, a flexible coupon management system allows the generation of unique coupons with specific codes, discounts, limits, and expiration dates. Existing coupons can be updated or deleted as needed.
   
## Cross-Origin Resource Sharing and Data Calculations:

 - The project implements Cross-Origin Resource Sharing (CORS) to facilitate secure communication between the frontend and backend, enabling seamless interaction from different origins.

 - The backend includes functions for date formatting and tax calculations, essential for accurate financial transactions and presenting information to users.


# Commands to start

## Front-end
```
npm install
npm start
```

## Backend
```
cd AMS
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
pip install flask-cors
python admin_power.py
```


## UI Views

### Dashboard View
This image showcases the main dashboard of the application, providing an overview of key metrics and data.

![Dashboard View](https://github.com/ni-nitesh4now/AMS/raw/main/README%20files/dash.png)

### User Management
Here, you can manage and view detailed information about users, enabling seamless user administration.

![User Management](https://github.com/ni-nitesh4now/AMS/raw/main/README%20files/users.png)

### Subscription Management
This view displays the subscription management interface, allowing for efficient subscription tracking and management.

![Subscription Management](https://github.com/ni-nitesh4now/AMS/raw/main/README%20files/Subscription.png)

### Coupon Management
This image represents the coupon management section, where you can create, edit, and manage various coupons and promotions.

![Coupon Management](https://github.com/ni-nitesh4now/AMS/raw/main/README%20files/Coupon.png)

### Billing and Payments
This view illustrates the billing and payments interface, providing functionalities related to invoices, payments, and financial transactions.

![Billing and Payments](https://github.com/ni-nitesh4now/AMS/raw/main/README%20files/billing.png)
