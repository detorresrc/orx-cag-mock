const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const data = require('./data');

const app = express();
const PORT = 8080;

app.use(cors());
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
 * /api/client/activeClientList:
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
 *                       clientName:
 *                         type: string
 *                         example: ABC
 *                       clientReferenceId:
 *                         type: string
 *                         example: CRI001
 */
app.get('/api/client/activeClientList', (req, res) => {
  res.json({ clientList: data.clients });
});

/**
 * @swagger
 * /api/client/contractList:
 *   get:
 *     summary: Get active contracts by client reference ID and name
 *     tags: [Client]
 *     parameters:
 *       - in: query
 *         name: clientReferenceId
 *         required: true
 *         schema:
 *           type: string
 *         example: CRI001
 *       - in: query
 *         name: clientName
 *         required: true
 *         schema:
 *           type: string
 *         example: ABC
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
 *                       contractId:
 *                         type: string
 *                         example: CON001
 *                       effectiveDate:
 *                         type: string
 *                         format: date
 *                         example: 2023-01-01
 *                       terminationDate:
 *                         type: string
 *                         format: date
 *                         nullable: true
 *                         example: 2024-12-31
 */
app.get('/api/client/contractList', (req, res) => {
  const { clientReferenceId, clientName } = req.query;
  
  const contracts = data.contracts
    .filter(contract => 
      contract.clientReferenceId === clientReferenceId && 
      contract.clientName === clientName
    )
    .map(({ clientReferenceId, clientName, ...rest }) => rest);
  
  res.json({ contractList: contracts });
});

/**
 * @swagger
 * /api/client/operationUnitList:
 *   get:
 *     summary: Get active operation units by contract ID
 *     tags: [Client]
 *     parameters:
 *       - in: query
 *         name: contractId
 *         required: true
 *         schema:
 *           type: string
 *         example: CON001
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
 *                       operationUnitId:
 *                         type: string
 *                         example: OU001
 *                       operationUnitName:
 *                         type: string
 *                         example: Manufacturing
 */
app.get('/api/client/operationUnitList', (req, res) => {
  const { contractId } = req.query;
  
  const operationUnits = data.operationUnits
    .filter(ou => ou.contractId === contractId)
    .map(({ contractId, ...rest }) => rest);
  
  res.json({ operationUnitList: operationUnits });
});

/**
 * @swagger
 * /api/cag/assignedCAGList:
 *   get:
 *     summary: Get assigned CAGs by operation unit ID with pagination
 *     tags: [CAG]
 *     parameters:
 *       - in: query
 *         name: operationUnitId
 *         required: true
 *         schema:
 *           type: string
 *         example: OU001
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 5
 *         example: 5
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
 *                       operationUnitId:
 *                         type: string
 *                       cagId:
 *                         type: string
 *                       startDate:
 *                         type: string
 *                         format: date
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         nullable: true
 *                       ouCagStatus:
 *                         type: string
 *                       carrierId:
 *                         type: string
 *                       assignmentLevel:
 *                         type: string
 *                         enum: [Carrier, Account, Group]
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
 *                 count:
 *                   type: integer
 *                   description: Total count of CAGs
 */
app.get('/api/cag/assignedCAGList', (req, res) => {
  const { operationUnitId, size = 5, page = 0 } = req.query;
  
  const pageSize = parseInt(size);
  const pageNum = parseInt(page);
  
  const filteredCAGs = data.assignedCAGs.filter(
    cag => cag.operationUnitId === operationUnitId
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
      cag.ouCagStatus = status;
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
 *               - operationUnitId
 *               - cagIds
 *             properties:
 *               operationUnitId:
 *                 type: string
 *                 example: OU001
 *               cagIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["CAG001", "CAG002", "CAG003"]
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
  const { operationUnitId, cagIds } = req.body;
  
  if (!operationUnitId || !cagIds || !Array.isArray(cagIds)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  
  cagIds.forEach((cagId, index) => {
    const newOuCagId = `OUCAG${String(data.assignedCAGs.length + index + 1).padStart(3, '0')}`;
    const cagMapping = data.cagMappings.find(c => c.cagId === cagId);
    
    const newAssignment = {
      ouCagId: newOuCagId,
      operationUnitId: operationUnitId,
      cagId: cagId,
      startDate: new Date().toISOString().split('T')[0],
      endDate: null,
      ouCagStatus: "ACTIVE",
      carrierId: cagMapping?.carrierId || "CAR999",
      assignmentLevel: "Carrier",
      carrierName: cagMapping?.carrierName || "Unknown",
      accountId: cagMapping?.accountId || "AC999",
      accountName: cagMapping?.accountName || "Unknown",
      groupId: cagMapping?.groupId || "GR999",
      groupName: cagMapping?.groupName || "Unknown"
    };
    
    data.assignedCAGs.push(newAssignment);
  });
  
  res.status(200).json({ message: 'CAGs assigned successfully' });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
  console.log(`\nSwagger UI available at: http://localhost:${PORT}/api-docs`);
  console.log(`OpenAPI JSON spec at: http://localhost:${PORT}/api-docs.json`);
  console.log('\nAvailable endpoints:');
  console.log('GET  /api/client/activeClientList');
  console.log('GET  /api/client/contractList?clientReferenceId=CRI001&clientName=ABC');
  console.log('GET  /api/client/operationUnitList?contractId=CON001');
  console.log('GET  /api/cag/assignedCAGList?operationUnitId=OU001&size=5&page=0');
  console.log('GET  /api/cag/allListByConditions?assignmentLevel=carrier&carrierId=CR001...');
  console.log('PUT  /api/cag/updateStatus');
  console.log('POST /api/cag/assign');
});
