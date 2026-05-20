# API Documentation - Sito Paulo Zefi

## Base URL

```
Development: http://localhost:3000/api
Production: https://api.paulin-zefi.com/api
```

---

## Endpoints

### 1. Contacts (POST)

**Endpoint:** `POST /contacts`

**Description:** Send a contact message

**Request Body:**
```json
{
  "nome": "string (2-100 chars)",
  "email": "string (valid email)",
  "oggetto": "string (3-200 chars)",
  "messaggio": "string (10-5000 chars)"
}
```

**Response (201 Created):**
```json
{
  "success": boolean,
  "message": "string"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Giovanni",
    "email": "giovanni@example.com",
    "oggetto": "Richiesta informazioni",
    "messaggio": "Vorrei sapere di più sulla Lega di Alessio."
  }'
```

---

### 2. Publications (GET)

**Endpoint:** `GET /publications`

**Description:** Get all publications

**Response (200 OK):**
```json
[
  {
    "id": "string",
    "title": "string",
    "type": "libro|articolo|ricerca",
    "description": "string",
    "year": number,
    "icon": "string (FontAwesome class)"
  }
]
```

**Example cURL:**
```bash
curl http://localhost:3000/api/publications
```

---

### 3. Publications by ID (GET)

**Endpoint:** `GET /publications/:id`

**Description:** Get a specific publication

**Response (200 OK):**
```json
{
  "id": "string",
  "title": "string",
  "type": "libro|articolo|ricerca",
  "description": "string",
  "year": number,
  "icon": "string"
}
```

---

### 4. Gallery (GET)

**Endpoint:** `GET /gallery`

**Description:** Get all gallery items

**Response (200 OK):**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "imageUrl": "string (image URL)",
    "thumbUrl": "string (thumbnail URL)",
    "category": "string"
  }
]
```

---

### 5. Gallery by ID (GET)

**Endpoint:** `GET /gallery/:id`

**Description:** Get a specific gallery item

**Response (200 OK):**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "imageUrl": "string",
  "thumbUrl": "string",
  "category": "string"
}
```

---

### 6. Content (GET)

**Endpoint:** `GET /content`

**Description:** Get all content (biography, stories, timeline)

**Response (200 OK):**
```json
{
  "biography": {
    "portraitUrl": "string",
    "bioText": "string",
    "stats": [
      {
        "label": "string",
        "value": "string"
      }
    ],
    "timelineItems": [
      {
        "year": "string",
        "title": "string",
        "description": "string"
      }
    ]
  },
  "stories": [
    {
      "id": number,
      "icon": "string",
      "era": "string",
      "title": "string",
      "description": "string"
    }
  ]
}
```

---

### 7. Biography (GET)

**Endpoint:** `GET /content/biography`

**Description:** Get biography data only

**Response (200 OK):**
```json
{
  "portraitUrl": "string",
  "bioText": "string",
  "stats": [...],
  "timelineItems": [...]
}
```

---

### 8. Stories (GET)

**Endpoint:** `GET /content/stories`

**Description:** Get all stories

**Response (200 OK):**
```json
[
  {
    "id": number,
    "icon": "string",
    "era": "string",
    "title": "string",
    "description": "string"
  }
]
```

---

### 9. Timeline (GET)

**Endpoint:** `GET /content/timeline`

**Description:** Get timeline items

**Response (200 OK):**
```json
[
  {
    "year": "string",
    "title": "string",
    "description": "string"
  }
]
```

---

## Frontend Services

### ContactService
```typescript
sendMessage(data: ContactMessage): Observable<ContactResponse>
```

### PublicationsService
```typescript
getPublications(): Observable<Publication[]>
getPublicationById(id: string): Observable<Publication>
```

### GalleryService
```typescript
getGallery(): Observable<GalleryItem[]>
getGalleryItemById(id: string): Observable<GalleryItem>
```

### ContentService
```typescript
getContent(): Observable<ContentData>
getBiography(): Observable<Biography>
getStories(): Observable<Story[]>
getTimeline(): Observable<TimelineItem[]>
```

---

## Error Handling

All endpoints return errors with HTTP status codes:

- **400 Bad Request** - Invalid input data
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

**Error Response Format:**
```json
{
  "statusCode": number,
  "message": "string",
  "timestamp": "ISO8601 string"
}
```

---

## CORS

CORS is enabled with the following configuration:
- **Origin:** `http://localhost:4200` (dev) or production domain
- **Credentials:** Allowed

---

## Authentication

Currently not implemented for public endpoints. Admin endpoints will use JWT bearer tokens.

---

## Development & Testing

### Start Backend
```bash
cd backend
npm run start:dev
```

### Start Frontend
```bash
cd frontend
npm start
```

### Test API
```bash
# All publications
curl http://localhost:3000/api/publications

# All gallery items
curl http://localhost:3000/api/gallery

# All content
curl http://localhost:3000/api/content
```

---

**Version:** 1.0  
**Last Updated:** 20 Maggio 2026  
**Status:** Development
