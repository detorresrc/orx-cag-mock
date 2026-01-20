# CAG Mock API Server

Mock API server for CAG (Carrier-Account-Group) management system.

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:8080`

## API Documentation

Once the server is running, you can access:
- **Swagger UI**: http://localhost:8080/api-docs
- **OpenAPI JSON**: http://localhost:8080/api-docs.json

The Swagger UI provides an interactive interface to test all API endpoints.

## API Endpoints

### 1. Get Active Clients
- **URL**: `GET /api/clients/activeClientList`
- **Response**: List of active clients with UUID identifiers

### 2. Get Active Contracts
- **URL**: `GET /api/clients/contractList?clientId=04a3832e-0b8a-40bc-8626-392cf860835d`
- **Query Params**: 
  - `clientId` (required, UUID format)
- **Response**: List of contracts for the client

### 3. Get Operation Units
- **URL**: `GET /api/clients/activeOperationUnitList?contractInternalId=571027ad-84fe-40bc-b555-8c3dac5d56ec`
- **Query Params**: 
  - `contractInternalId` (required, UUID format)
- **Response**: List of operation units for the contract

### 4. Get Assigned CAGs (Paginated)
- **URL**: `GET /api/cag/assignedCAGList?operationUnitInternalId=e559a889-ddb2-4004-9c30-3be455cdbdd1&size=10&page=0`
- **Query Params**: 
  - `operationUnitInternalId` (required, UUID format)
  - `size` (optional, default: 10)
  - `page` (optional, default: 0)
- **Response**: Paginated list of assigned CAGs with total count

### 5. Get CAG Details by Conditions
- **URL**: `GET /api/cag/allListByConditions?assignmentLevel=carrier&carrierId=CR001&carrierName=CR_A&accountId=&accountName=&groupId=&groupName=&startDate=2024-01-01&endDate=2024-12-31`
- **Query Params**: All optional filters
- **Response**: Filtered list of CAG mappings

### 6. Update CAG Status
- **URL**: `PUT /api/cag/updateStatus`
- **Body**:
```json
{
  "ouCagIds": ["OUCAG001", "OUCAG004"],
  "status": "INACTIVE"
}
```
- **Response**: 200 status code

### 7. Assign CAGs
- **URL**: `POST /api/cag/assign`
- **Body**:
```json
{
  "operationUnitInternalId": "e559a889-ddb2-4004-9c30-3be455cdbdd1",
  "assignmentType": "Carrier",
  "cagIds": ["CAG002", "CAG003"]
}
```
- **Response**: 200 status code

## Data Storage

All data is stored in memory in `data.js`. The server includes initial seed data for testing.
