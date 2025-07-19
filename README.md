# Contact Management System

A full-stack contact management web application with RESTful API backend and responsive frontend interface.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [API Endpoints](#api-endpoints)
- [Request/Response Examples](#requestresponse-examples)
- [Error Handling](#error-handling)
- [Setup Instructions](#setup-instructions)
- [Frontend Features](#frontend-features)

## ✨ Features

- **Contact Management**: Create, Read, Update, Delete contacts
- **Search**: Search contacts by name (case-insensitive)
- **Filter**: Filter contacts by group (Friends, Work, Family, Other)
- **Sort**: Sort contacts by name (A-Z, Z-A)
- **Group Management**: Get available contact groups
- **Data Validation**: Email format validation, required fields, unique email constraint
- **Responsive UI**: Modern, mobile-friendly interface
- **Real-time Updates**: Instant UI updates after operations

## 🛠 Technology Stack

**Backend:**

- **Framework**: NestJS (Node.js)
- **Database**: MongoDB Atlas (Cloud)
- **ODM**: Mongoose
- **Validation**: class-validator, class-transformer
- **CORS**: Enabled for cross-origin requests

**Frontend:**

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox/Grid
- **JavaScript**: ES6+ with async/await
- **Icons**: Font Awesome 6
- **Responsive**: Mobile-first design

## 📚 API Endpoints

**Base URL:** `http://localhost:3001/api`

### Contact Endpoints

#### 1. Get All Contacts

```http
GET /api/contacts
```

**Query Parameters:**

- `search` (string, optional): Search contacts by name (case-insensitive)
- `group` (string, optional): Filter by group (`Friends`, `Work`, `Family`, `Other`)
- `sort` (string, optional): Sort order (`asc` for A-Z, `desc` for Z-A)
- `sortBy` (string, optional): Field to sort by (default: `name`)

**Example Requests:**

```http
GET /api/contacts
GET /api/contacts?search=john
GET /api/contacts?group=Work
GET /api/contacts?sort=desc
GET /api/contacts?search=alice&group=Family&sort=asc
```

#### 2. Get Contact by ID

```http
GET /api/contacts/:id
```

**Path Parameters:**

- `id` (string, required): MongoDB ObjectId of the contact

#### 3. Create New Contact

```http
POST /api/contacts
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "group": "Friends"
}
```

#### 4. Update Contact (Partial)

```http
PATCH /api/contacts/:id
Content-Type: application/json
```

**Request Body:** (All fields optional)

```json
{
  "name": "John Updated",
  "phone": "111-222-3333"
}
```

#### 5. Delete Contact

```http
DELETE /api/contacts/:id
```

**Path Parameters:**

- `id` (string, required): MongoDB ObjectId of the contact

#### 6. Get Available Groups

```http
GET /api/contacts/groups
```

**Description:** Returns list of all unique groups currently used by contacts.

## 📝 Request/Response Examples

### Contact Schema

```typescript
interface Contact {
  _id: string; // MongoDB ObjectId
  name: string; // Required
  email: string; // Required, unique, valid email format
  phone?: string; // Optional
  group: string; // Default: "Other", Options: "Friends", "Work", "Family", "Other"
  createdAt: Date; // Auto-generated
  updatedAt: Date; // Auto-generated
  __v: number; // MongoDB version key
}
```

### Validation Rules

- **name**: Required, string, trimmed
- **email**: Required, valid email format, unique, lowercase, trimmed
- **phone**: Optional, string, trimmed
- **group**: Optional, enum values: `Friends`, `Work`, `Family`, `Other` (default: `Other`)

## 🔍 API Response Examples

### 1. GET /api/contacts - Get All Contacts

**Request:**

```http
GET http://localhost:3001/api/contacts
```

**Response:**

```json
[
  {
    "_id": "687b20ee149cfb5ef7b73cc7",
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "111-222-3333",
    "group": "Friends",
    "createdAt": "2025-07-19T04:37:02.580Z",
    "updatedAt": "2025-07-19T04:42:07.448Z",
    "__v": 0
  },
  {
    "_id": "687b21a0149cfb5ef7b73cca",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "987-654-3210",
    "group": "Work",
    "createdAt": "2025-07-19T04:40:00.897Z",
    "updatedAt": "2025-07-19T04:40:00.897Z",
    "__v": 0
  },
  {
    "_id": "687b21eb149cfb5ef7b73ccc",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "group": "Family",
    "createdAt": "2025-07-19T04:41:15.445Z",
    "updatedAt": "2025-07-19T04:41:15.445Z",
    "__v": 0
  }
]
```

### 2. GET /api/contacts/:id - Get Contact by ID

**Request:**

```http
GET http://localhost:3001/api/contacts/687b20ee149cfb5ef7b73cc7
```

**Response:**

```json
{
  "_id": "687b20ee149cfb5ef7b73cc7",
  "name": "John Updated",
  "email": "john@example.com",
  "phone": "111-222-3333",
  "group": "Friends",
  "createdAt": "2025-07-19T04:37:02.580Z",
  "updatedAt": "2025-07-19T04:42:07.448Z",
  "__v": 0
}
```

### 3. POST /api/contacts - Create New Contact

**Request:**

```http
POST http://localhost:3001/api/contacts
Content-Type: application/json

{
  "name": "Bob Wilson",
  "email": "bob@example.com",
  "phone": "555-123-4567",
  "group": "Work"
}
```

**Response:**

```json
{
  "name": "Bob Wilson",
  "email": "bob@example.com",
  "phone": "555-123-4567",
  "group": "Work",
  "_id": "687b2345149cfb5ef7b73ccd",
  "createdAt": "2025-07-19T04:45:00.123Z",
  "updatedAt": "2025-07-19T04:45:00.123Z",
  "__v": 0
}
```

### 4. PATCH /api/contacts/:id - Update Contact

**Request:**

```http
PATCH http://localhost:3001/api/contacts/687b20ee149cfb5ef7b73cc7
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "111-222-3333"
}
```

**Response:**

```json
{
  "_id": "687b20ee149cfb5ef7b73cc7",
  "name": "John Updated",
  "email": "john@example.com",
  "phone": "111-222-3333",
  "group": "Friends",
  "createdAt": "2025-07-19T04:37:02.580Z",
  "updatedAt": "2025-07-19T04:42:07.448Z",
  "__v": 0
}
```

### 5. DELETE /api/contacts/:id - Delete Contact

**Request:**

```http
DELETE http://localhost:3001/api/contacts/687b20ee149cfb5ef7b73cc7
```

**Response:**

```
Status: 200 OK
(Empty response body)
```

### 6. GET /api/contacts/groups - Get Available Groups

**Request:**

```http
GET http://localhost:3001/api/contacts/groups
```

**Response:**

```json
["Friends", "Work", "Family"]
```

### 7. Search and Filter Examples

**Search by name:**

```http
GET http://localhost:3001/api/contacts?search=john
```

**Filter by group:**

```http
GET http://localhost:3001/api/contacts?group=Work
```

**Sort Z-A:**

```http
GET http://localhost:3001/api/contacts?sort=desc
```

**Combined filters:**

```http
GET http://localhost:3001/api/contacts?search=alice&group=Family&sort=asc
```

## ❌ Error Handling

### 1. Validation Error (400 Bad Request)

**Request:**

```http
POST http://localhost:3001/api/contacts
Content-Type: application/json

{
  "name": "",
  "email": "invalid-email"
}
```

**Response:**

```json
{
  "message": ["name should not be empty", "email must be an email"],
  "error": "Bad Request",
  "statusCode": 400
}
```

### 2. Contact Not Found (404 Not Found)

**Request:**

```http
GET http://localhost:3001/api/contacts/invalid-id
```

**Response:**

```json
{
  "message": "Contact with ID invalid-id not found",
  "error": "Not Found",
  "statusCode": 404
}
```

### 3. Duplicate Email (409 Conflict)

**Request:**

```http
POST http://localhost:3001/api/contacts
Content-Type: application/json

{
  "name": "Test User",
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "message": "Email already exists",
  "error": "Conflict",
  "statusCode": 409
}
```

### 4. Internal Server Error (500)

**Response:**

```json
{
  "message": "Internal server error",
  "error": "Internal Server Error",
  "statusCode": 500
}
```

## 🔧 HTTP Status Codes

- `200` - OK (GET, PATCH successful)
- `201` - Created (POST successful)
- `400` - Bad Request (Validation errors)
- `404` - Not Found (Contact not found)
- `409` - Conflict (Duplicate email)
- `500` - Internal Server Error

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/nhanbernie/sdn-pe-server.git
   cd sdn-pe-server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   The `.env` file is already configured with:

   ```env
   # Database Configuration
   MONGODB_URI=mongodb+srv://ttnhanbernie:7ejJf5ZPlMwM1yWa@cluster0.r7giazv.mongodb.net/myapp?retryWrites=true&w=majority&appName=Cluster0

   # Application Configuration
   PORT=3001
   NODE_ENV=development

   # JWT Configuration (for future use)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=1d
   ```

4. **Run the application**

   ```bash
   # Development mode (with auto-reload)
   npm run start:dev

   # Production build
   npm run build
   npm run start:prod
   ```

5. **Access the application**
   - **API Base URL**: `http://localhost:3001/api`
   - **Frontend Interface**: `http://localhost:3001/index.html`
   - **Health Check**: `http://localhost:3001/health`

## 🎨 Frontend Features

The application includes a complete frontend interface with:

### Main Features

- **Contact List View**: Display all contacts with avatar initials
- **Search Functionality**: Real-time search by contact name
- **Group Filtering**: Filter contacts by group (Friends, Work, Family, Other)
- **Sorting**: Sort contacts A-Z or Z-A
- **Add Contact**: Modal form to create new contacts
- **Edit Contact**: Click edit to modify existing contacts
- **Delete Contact**: Confirmation dialog before deletion
- **Responsive Design**: Works on desktop, tablet, and mobile

### UI Components

- **Modern Design**: Clean, professional interface
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Success Notifications**: Confirmation messages for actions
- **Empty State**: Helpful message when no contacts exist
- **Form Validation**: Client-side and server-side validation

### Technical Features

- **Real-time Updates**: UI updates immediately after operations
- **Debounced Search**: Optimized search with 300ms delay
- **Error Recovery**: Graceful handling of network errors
- **Accessibility**: Keyboard navigation and screen reader support

## 🧪 Testing the API

You can test the API using PowerShell commands:

```powershell
# Get all contacts
Invoke-RestMethod -Uri "http://localhost:3001/api/contacts" -Method Get

# Create a new contact
Invoke-RestMethod -Uri "http://localhost:3001/api/contacts" -Method Post -ContentType "application/json" -Body '{"name":"Test User","email":"test@example.com","group":"Friends"}'

# Search contacts
Invoke-RestMethod -Uri "http://localhost:3001/api/contacts?search=test" -Method Get

# Filter by group
Invoke-RestMethod -Uri "http://localhost:3001/api/contacts?group=Work" -Method Get

# Update a contact
Invoke-RestMethod -Uri "http://localhost:3001/api/contacts/CONTACT_ID" -Method Patch -ContentType "application/json" -Body '{"name":"Updated Name"}'

# Delete a contact
Invoke-RestMethod -Uri "http://localhost:3001/api/contacts/CONTACT_ID" -Method Delete
```

---

**Project**: Contact Management System
**Framework**: NestJS + MongoDB + Vanilla JavaScript
**Version**: 1.0.0
**Last Updated**: July 2025
