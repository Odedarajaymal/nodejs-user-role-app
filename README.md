# Node.js User and Role Management API

This project is a simple User and Role management system built using Node.js, Express, and MongoDB. It includes functionalities like user and role CRUD operations, role-based access control, bulk updates, and search capabilities.

## Features

- **User Management**: Create, read, update, and delete (CRUD) operations for users.
- **Role Management**: CRUD operations for roles, including assigning access modules to roles.
- **Role-Based Access Control**: Check if a user has access to a specific module based on their role.
- **Bulk Update**: Update multiple users with the same or different data in a single API call.
- **Search Functionality**: Search users and roles based on partial matches (e.g., searching for "a" will return results like "Alice", "Aaron", etc.).

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing users and roles.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Odedarajaymal/nodejs-user-role-app
    cd nodejs-user-role-app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and configure the following environment variables:

    ```env
    MONGO_URI=mongodb://localhost:27017/your-database-name
    PORT=5000
    ```

4. **Run the application**:

    ```bash
    npm run dev
    ```

    The application will start running on `http://localhost:5000`.

## API Endpoints

### **User Endpoints**

- **Create User**: `POST /api/users`
- **Get User by ID**: `GET /api/users/:id`
- **Update User**: `PUT /api/users/:id`
- **Delete User**: `DELETE /api/users/:id`
- **Get All Users**: `GET /api/users`
- **Search Users**: `GET /api/users?search=query`

### **Role Endpoints**

- **Create Role**: `POST /api/roles`
- **Get Role by ID**: `GET /api/roles/:id`
- **Update Role**: `PUT /api/roles/:id`
- **Delete Role**: `DELETE /api/roles/:id`
- **Get All Roles**: `GET /api/roles`
- **Search Roles**: `GET /api/roles?search=query`

### **Role-Based Access Control**

- **Check User Access**: `POST /api/users/check-access`
- **update-access-modules**: `POST /api/roles/update-access-modules`
- **Add Module to Role**: `PATCH /api/roles/add-access-module`
- **Remove Module from Role**: `PATCH /api/roles/remove-access-module`

### **Bulk Update Endpoints**

- **Bulk Update Same Data**: `PUT /api/users/bulk/same`
- **Bulk Update Different Data**: `PUT /api/users/bulk/different`

## nodejs-user-role-app.postman_collection.json

{
	"info": {
		"_postman_id": "38069eeb-e056-4d8e-a331-8ddba1cbe053",
		"name": "nodejs-user-role-app",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "24755582"
	},
	"item": [
		{
			"name": "Role-APIs",
			"item": [
				{
					"name": "get-Roles",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "create-role",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "get-role-by-id",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "update-Role",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "delete-Role",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "updateAccessModules",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "add-access-module",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "remove-access-module",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				}
			]
		},
		{
			"name": "User-APIs",
			"item": [
				{
					"name": "create-user",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "update-user",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "get-user-by-id",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "delete-user",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "get-users",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "check-access",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "update-all-user-same-data",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "update-all-user-different-data",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				}
			]
		},
		{
			"name": "Signup-login-APIs",
			"item": [
				{
					"name": "signup-API",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				},
				{
					"name": "login-API",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				}
			]
		}
	]
}