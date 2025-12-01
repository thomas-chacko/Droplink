# Links Management API Documentation

Complete API documentation for managing user links in the DropLink application.

## Authentication

All endpoints require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 1. Get All Links
**GET** `/api/links`

Retrieves all links for the authenticated user, sorted by order.

**Response:**
```json
{
  "success": true,
  "message": "Links fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f191e810c19729de860ea",
      "title": "My Portfolio",
      "url": "https://example.com",
      "description": "Check out my work",
      "icon": "https://example.com/icon.png",
      "order": 0,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Link
**GET** `/api/links/[id]`

Retrieves a specific link by ID.

**Response:**
```json
{
  "success": true,
  "message": "Link fetched successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My Portfolio",
    "url": "https://example.com",
    ...
  }
}
```

**Error Responses:**
- `400` - Invalid link ID
- `404` - Link not found

---

### 3. Create Link
**POST** `/api/links`

Creates a new link for the authenticated user.

**Request Body:**
```json
{
  "title": "My Portfolio",
  "url": "https://example.com",
  "description": "Check out my work",
  "icon": "https://example.com/icon.png",
  "isActive": true
}
```

**Required Fields:**
- `title` (string, max 100 chars)
- `url` (string, valid URL with http/https, max 2048 chars)

**Optional Fields:**
- `description` (string, max 255 chars)
- `icon` (string, max 255 chars)
- `isActive` (boolean, default: true)

**Response:**
```json
{
  "success": true,
  "message": "Link created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f191e810c19729de860ea",
    "title": "My Portfolio",
    "url": "https://example.com",
    "order": 0,
    "isActive": true,
    ...
  }
}
```

---

### 4. Update Link
**PUT** `/api/links/[id]`

Updates an existing link.

**Request Body:**
```json
{
  "title": "Updated Title",
  "url": "https://newurl.com",
  "description": "New description",
  "icon": "https://newicon.com/icon.png",
  "isActive": false,
  "order": 5
}
```

All fields are optional. Only provided fields will be updated.

**Response:**
```json
{
  "success": true,
  "message": "Link updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

---

### 5. Delete Link
**DELETE** `/api/links/[id]`

Deletes a link permanently.

**Response:**
```json
{
  "success": true,
  "message": "Link deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    ...
  }
}
```

---

### 6. Reorder Links
**PATCH** `/api/links/reorder`

Updates the order of multiple links in a single request.

**Request Body:**
```json
{
  "links": [
    { "id": "507f1f77bcf86cd799439011", "order": 0 },
    { "id": "507f1f77bcf86cd799439012", "order": 1 },
    { "id": "507f1f77bcf86cd799439013", "order": 2 }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Links reordered successfully",
  "data": [
    // Array of all links in new order
  ]
}
```

---

### 7. Toggle Link Status
**PATCH** `/api/links/toggle/[id]`

Toggles the `isActive` status of a link.

**Response:**
```json
{
  "success": true,
  "message": "Link activated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "isActive": true,
    ...
  }
}
```

---

## Usage Examples

### Using the Service Layer

```typescript
import { linkServices } from '@/services/linkServices';

// Get all links
const { data } = await linkServices.getAllLinks();

// Create a link
await linkServices.createLink({
  title: 'My Website',
  url: 'https://example.com',
  description: 'My personal website'
});

// Update a link
await linkServices.updateLink('linkId', {
  title: 'Updated Title'
});

// Delete a link
await linkServices.deleteLink('linkId');

// Reorder links
await linkServices.reorderLinks([
  { id: 'link1', order: 0 },
  { id: 'link2', order: 1 }
]);

// Toggle link status
await linkServices.toggleLink('linkId');
```

### Using with Zustand Store

```typescript
import { useLinkStore } from '@/store/useLinkStore';
import { linkServices } from '@/services/linkServices';

function MyComponent() {
  const { links, setLinks, setLoading, setError } = useLinkStore();

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await linkServices.getAllLinks();
      if (response.success && Array.isArray(response.data)) {
        setLinks(response.data);
      }
    } catch (error) {
      setError('Failed to fetch links');
    } finally {
      setLoading(false);
    }
  };

  // Use in your component
}
```

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing or invalid token)
- `404` - Not Found
- `500` - Internal Server Error

---

## Validation Rules

### Title
- Required
- Max length: 100 characters
- Cannot be empty or whitespace only

### URL
- Required
- Must be valid URL
- Must start with `http://` or `https://`
- Max length: 2048 characters

### Description
- Optional
- Max length: 255 characters

### Icon
- Optional
- Max length: 255 characters
- Should be a valid URL

---

## Database Schema

```typescript
{
  userId: ObjectId (ref: User, indexed)
  title: String (required, max: 100)
  url: String (required, max: 2048)
  description: String (optional, max: 255)
  icon: String (optional, max: 255)
  order: Number (default: 0, indexed)
  isActive: Boolean (default: true, indexed)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

**Indexes:**
- `userId + order` (compound)
- `userId + isActive` (compound)
- `userId` (single)
- `order` (single)
- `isActive` (single)
