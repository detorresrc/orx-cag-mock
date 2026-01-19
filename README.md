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
- **URL**: `GET /api/client/activeClientList`
- **Response**: List of active clients

### 2. Get Active Contracts
- **URL**: `GET /api/client/contractList?clientReferenceId=CRI001&clientName=ABC`
- **Query Params**: 
  - `clientReferenceId` (required)
  - `clientName` (required)
- **Response**: List of contracts for the client

### 3. Get Operation Units
- **URL**: `GET /api/client/operationUnitList?contractId=CON001`
- **Query Params**: 
  - `contractId` (required)
- **Response**: List of operation units for the contract

### 4. Get Assigned CAGs (Paginated)
- **URL**: `GET /api/cag/assignedCAGList?operationUnitId=OU001&size=5&page=0`
- **Query Params**: 
  - `operationUnitId` (required)
  - `size` (optional, default: 5)
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
  "ouCagIds": ["OUCAG001", "OUCAG002"],
  "status": "INACTIVE"
}
```
- **Response**: 200 status code

### 7. Assign CAGs
- **URL**: `POST /api/cag/assign`
- **Body**:
```json
{
  "operationUnitId": "OU001",
  "cagIds": ["CAG001", "CAG002"]
}
```
- **Response**: 200 status code

## Data Storage

All data is stored in memory in `data.js`. The server includes initial seed data for testing.
