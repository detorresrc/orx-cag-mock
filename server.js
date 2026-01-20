const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const data = require('./data');

const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/**
 * @swagger
 * /api/clients/activeClientList:
 *   get:
 *     summary: Get all active clients
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: List of active clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       clientId:
 *                         type: string
 *                         format: uuid
 *                         example: 01b92b7e-f570-4519-bc55-853132a9d3a7
 *                       clientName:
 *                         type: string
 *                         example: Acmsad Health
 *                       clientReferenceId:
 *                         type: string
 *                         example: ACMSAD
 */
app.get('/api/clients/activeClientList', (req, res) => {
  res.json({ clientList: data.clients });
});

/**
 * @swagger
 * /api/clients/contractList:
 *   get:
 *     summary: Get active contracts by client ID
 *     tags: [Client]
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 04a3832e-0b8a-40bc-8626-392cf860835d
 *     responses:
 *       200:
 *         description: List of contracts for the specified client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contractList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       contractInternalId:
 *                         type: string
 *                         format: uuid
 *                         example: 571027ad-84fe-40bc-b555-8c3dac5d56ec
 *                       contractId:
 *                         type: string
 *                         example: CON003
 *                       effectiveDate:
 *                         type: string
 *                         format: date
 *                         example: 2025-01-01
 *                       terminateDate:
 *                         type: string
 *                         format: date
 *                         nullable: true
 *                         example: 2026-12-31
 */
app.get('/api/clients/contractList', (req, res) => {
  const { clientId } = req.query;
  
  const contracts = data.contracts
    .filter(contract => contract.clientId === clientId)
    .map(({ clientId, ...rest }) => rest);
  
  res.json({ contractList: contracts });
});

/**
 * @swagger
 * /api/clients/activeOperationUnitList:
 *   get:
 *     summary: Get active operation units by contract internal ID
 *     tags: [Client]
 *     parameters:
 *       - in: query
 *         name: contractInternalId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 571027ad-84fe-40bc-b555-8c3dac5d56ec
 *     responses:
 *       200:
 *         description: List of operation units for the specified contract
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 operationUnitList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       operationUnitInternalId:
 *                         type: string
 *                         format: uuid
 *                         example: e417a6ee-aaec-4c24-a417-e7e5401bfdd7
 *                       operationUnitId:
 *                         type: string
 *                         example: OU004
 *                       operationUnitName:
 *                         type: string
 *                         example: OU - West Region
 */
app.get('/api/clients/activeOperationUnitList', (req, res) => {
  const { contractInternalId } = req.query;
  
  const operationUnits = data.operationUnits
    .filter(ou => ou.contractInternalId === contractInternalId)
    .map(({ contractInternalId, ...rest }) => rest);
  
  res.json({ operationUnitList: operationUnits });
});

/**
 * @swagger
 * /api/cag/assignedCAGList:
 *   get:
 *     summary: Get assigned CAGs by operation unit internal ID with pagination
 *     tags: [CAG]
 *     parameters:
 *       - in: query
 *         name: operationUnitInternalId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: e559a889-ddb2-4004-9c30-3be455cdbdd1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         example: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 0
 *         example: 0
 *     responses:
 *       200:
 *         description: Paginated list of assigned CAGs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ouCagList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ouCagId:
 *                         type: string
 *                         example: OUCAG001
 *                       operationUnitId:
 *                         type: string
 *                         example: OU006
 *                       operationUnitInternalId:
 *                         type: string
 *                         format: uuid
 *                         example: e559a889-ddb2-4004-9c30-3be455cdbdd1
 *                       cagId:
 *                         type: string
 *                         example: CAG001
 *                       effectiveStartDate:
 *                         type: string
 *                         format: date
 *                         example: 2023-01-01
 *                       effectiveEndDate:
 *                         type: string
 *                         format: date
 *                         nullable: true
 *                       assigmentStatus:
 *                         type: string
 *                         example: ACTIVE
 *                       carrierId:
 *                         type: string
 *                         example: CAR001
 *                       carrierName:
 *                         type: string
 *                         example: United Health Carrier
 *                       assignmentLevel:
 *                         type: string
 *                         enum: [CARRIER, ACCOUNT, GROUP]
 *                         example: CARRIER
 *                       accountId:
 *                         type: string
 *                         example: ACC001
 *                       accountName:
 *                         type: string
 *                         example: Optum Rx Account
 *                       groupId:
 *                         type: string
 *                         example: GRP001
 *                       groupName:
 *                         type: string
 *                         example: Optum Group A
 *                 count:
 *                   type: integer
 *                   description: Total count of CAGs
 *                   example: 2
 */
app.get('/api/cag/assignedCAGList', (req, res) => {
  const { operationUnitInternalId, size = 10, page = 0 } = req.query;
  
  const pageSize = parseInt(size);
  const pageNum = parseInt(page);
  
  const filteredCAGs = data.assignedCAGs.filter(
    cag => cag.operationUnitInternalId === operationUnitInternalId
  );
  
  const startIndex = pageNum * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCAGs = filteredCAGs.slice(startIndex, endIndex);
  
  res.json({
    ouCagList: paginatedCAGs,
    count: filteredCAGs.length
  });
});

/**
 * @swagger
 * /api/cag/allListByConditions:
 *   get:
 *     summary: Get CAG details by search conditions
 *     tags: [CAG]
 *     parameters:
 *       - in: query
 *         name: assignmentLevel
 *         schema:
 *           type: string
 *           enum: [carrier, account, group]
 *         example: carrier
 *       - in: query
 *         name: carrierId
 *         schema:
 *           type: string
 *         example: CR001
 *       - in: query
 *         name: carrierName
 *         schema:
 *           type: string
 *         example: CR_A
 *       - in: query
 *         name: accountId
 *         schema:
 *           type: string
 *       - in: query
 *         name: accountName
 *         schema:
 *           type: string
 *       - in: query
 *         name: groupId
 *         schema:
 *           type: string
 *       - in: query
 *         name: groupName
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2024-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2024-12-31
 *     responses:
 *       200:
 *         description: Filtered list of CAG mappings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 entities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       cagId:
 *                         type: string
 *                       carrierId:
 *                         type: string
 *                       carrierName:
 *                         type: string
 *                       accountId:
 *                         type: string
 *                       accountName:
 *                         type: string
 *                       groupId:
 *                         type: string
 *                       groupName:
 *                         type: string
 */
app.get('/api/cag/allListByConditions', (req, res) => {
  const {
    assignmentLevel,
    carrierId,
    carrierName,
    accountId,
    accountName,
    groupId,
    groupName,
    startDate,
    endDate
  } = req.query;
  
  let filteredCAGs = [...data.cagMappings];
  
  if (carrierId) {
    filteredCAGs = filteredCAGs.filter(cag => cag.carrierId === carrierId);
  }
  if (carrierName) {
    filteredCAGs = filteredCAGs.filter(cag => cag.carrierName === carrierName);
  }
  if (accountId) {
    filteredCAGs = filteredCAGs.filter(cag => cag.accountId === accountId);
  }
  if (accountName) {
    filteredCAGs = filteredCAGs.filter(cag => cag.accountName === accountName);
  }
  if (groupId) {
    filteredCAGs = filteredCAGs.filter(cag => cag.groupId === groupId);
  }
  if (groupName) {
    filteredCAGs = filteredCAGs.filter(cag => cag.groupName === groupName);
  }
  
  res.json({ entities: filteredCAGs });
});

/**
 * @swagger
 * /api/cag/updateStatus:
 *   put:
 *     summary: Update status for assigned CAGs
 *     tags: [CAG]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ouCagIds
 *               - status
 *             properties:
 *               ouCagIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["OUCAG001", "OUCAG002", "OUCAG003"]
 *               status:
 *                 type: string
 *                 example: INACTIVE
 *     responses:
 *       200:
 *         description: Status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request body
 */
app.put('/api/cag/updateStatus', (req, res) => {
  const { ouCagIds, status } = req.body;
  
  if (!ouCagIds || !Array.isArray(ouCagIds) || !status) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  
  ouCagIds.forEach(ouCagId => {
    const cag = data.assignedCAGs.find(c => c.ouCagId === ouCagId);
    if (cag) {
      cag.assigmentStatus = status;
    }
  });
  
  res.status(200).json({ message: 'Status updated successfully' });
});

/**
 * @swagger
 * /api/cag/assign:
 *   post:
 *     summary: Assign CAGs to an operation unit
 *     tags: [CAG]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - operationUnitInternalId
 *               - assignmentType
 *               - cagIds
 *             properties:
 *               operationUnitInternalId:
 *                 type: string
 *                 format: uuid
 *                 example: e559a889-ddb2-4004-9c30-3be455cdbdd1
 *               assignmentType:
 *                 type: string
 *                 enum: [Carrier, Account, Group]
 *                 example: Carrier
 *               cagIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["CAG002", "CAG003"]
 *     responses:
 *       200:
 *         description: CAGs assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request body
 */
app.post('/api/cag/assign', (req, res) => {
  const { operationUnitInternalId, assignmentType, cagIds } = req.body;
  
  if (!operationUnitInternalId || !assignmentType || !cagIds || !Array.isArray(cagIds)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  
  // Find the operation unit to get its ID
  const operationUnit = data.operationUnits.find(ou => ou.operationUnitInternalId === operationUnitInternalId);
  
  cagIds.forEach((cagId, index) => {
    const newOuCagId = `OUCAG${String(data.assignedCAGs.length + index + 1).padStart(3, '0')}`;
    const cagMapping = data.cagMappings.find(c => c.cagId === cagId);
    
    const newAssignment = {
      ouCagId: newOuCagId,
      operationUnitId: operationUnit?.operationUnitId || "OU999",
      operationUnitInternalId: operationUnitInternalId,
      cagId: cagId,
      effectiveStartDate: new Date().toISOString().split('T')[0],
      effectiveEndDate: null,
      assigmentStatus: "ACTIVE",
      carrierId: cagMapping?.carrierId || "CAR999",
      carrierName: cagMapping?.carrierName || "Unknown Carrier",
      assignmentLevel: assignmentType.toUpperCase(),
      accountId: cagMapping?.accountId || "ACC999",
      accountName: cagMapping?.accountName || "Unknown Account",
      groupId: cagMapping?.groupId || "GRP999",
      groupName: cagMapping?.groupName || "Unknown Group"
    };
    
    data.assignedCAGs.push(newAssignment);
  });
  
  res.status(200).json({ message: 'CAGs assigned successfully' });
});

app.listen(PORT, HOST, () => {
  console.log(`Mock API server running on http://${HOST}:${PORT}`);
  console.log(`Local access: http://localhost:${PORT}`);
  console.log(`\nSwagger UI available at: http://localhost:${PORT}/api-docs`);
  console.log(`OpenAPI JSON spec at: http://localhost:${PORT}/api-docs.json`);
  console.log('\nServer is accessible from all network interfaces');
  console.log('Use your machine\'s IP address to access from other devices');
  console.log('\nAvailable endpoints:');
  console.log('GET  /api/clients/activeClientList');
  console.log('GET  /api/clients/contractList?clientId=04a3832e-0b8a-40bc-8626-392cf860835d');
  console.log('GET  /api/clients/activeOperationUnitList?contractInternalId=571027ad-84fe-40bc-b555-8c3dac5d56ec');
  console.log('GET  /api/cag/assignedCAGList?operationUnitInternalId=e559a889-ddb2-4004-9c30-3be455cdbdd1&size=10&page=0');
  console.log('GET  /api/cag/allListByConditions?assignmentLevel=carrier&carrierId=CR001...');
  console.log('PUT  /api/cag/updateStatus');
  console.log('POST /api/cag/assign');
});
