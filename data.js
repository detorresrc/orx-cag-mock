// In-memory data store
const data = {
  clients: [
    { clientId: "01b92b7e-f570-4519-bc55-853132a9d3a7", clientName: "Acmsad Health", clientReferenceId: "ACMSAD" },
    { clientId: "04a3832e-0b8a-40bc-8626-392cf860835d", clientName: "Aramex", clientReferenceId: "CRI003" },
    { clientId: "08869ddd-b970-4c33-b7de-b921de6bdf0b", clientName: "Acmsad Health", clientReferenceId: "ACMSAD" },
    { clientId: "0b1f9636-e187-4320-95e6-46dc6f5fbf72", clientName: "Acmsad Health", clientReferenceId: "ACMSAD" },
    { clientId: "0d864a0b-6bf4-4a2f-be5e-f6cf4f713b51", clientName: "Acmsad Health", clientReferenceId: "ACMSAD" },
    { clientId: "11a11626-66b9-4ea6-a0e3-b2a100221fa2", clientName: "Acmsad Health", clientReferenceId: "ACMSAD" },
    { clientId: "12fcc073-7fe7-49c8-94b4-e9b0b1ceb4ae", clientName: "M&M", clientReferenceId: "CRI004" }
  ],

  contracts: [
    { clientId: "04a3832e-0b8a-40bc-8626-392cf860835d", contractInternalId: "571027ad-84fe-40bc-b555-8c3dac5d56ec", contractId: "CON003", effectiveDate: "2025-01-01", terminateDate: "2026-12-31" },
    { clientId: "04a3832e-0b8a-40bc-8626-392cf860835d", contractInternalId: "7f74eb25-7fdb-4fe0-adc2-406da78588b9", contractId: "CON001", effectiveDate: "2025-01-01", terminateDate: "2026-01-31" },
    { clientId: "01b92b7e-f570-4519-bc55-853132a9d3a7", contractInternalId: "8a1b2c3d-4e5f-6789-abcd-ef0123456789", contractId: "CON002", effectiveDate: "2024-02-15", terminateDate: null },
    { clientId: "12fcc073-7fe7-49c8-94b4-e9b0b1ceb4ae", contractInternalId: "9b2c3d4e-5f67-89ab-cdef-012345678901", contractId: "CON004", effectiveDate: "2023-06-01", terminateDate: null }
  ],

  operationUnits: [
    { contractInternalId: "571027ad-84fe-40bc-b555-8c3dac5d56ec", operationUnitInternalId: "e417a6ee-aaec-4c24-a417-e7e5401bfdd7", operationUnitId: "OU004", operationUnitName: "OU - West Region" },
    { contractInternalId: "571027ad-84fe-40bc-b555-8c3dac5d56ec", operationUnitInternalId: "e559a889-ddb2-4004-9c30-3be455cdbdd1", operationUnitId: "OU006", operationUnitName: "OU - East Region" },
    { contractInternalId: "7f74eb25-7fdb-4fe0-adc2-406da78588b9", operationUnitInternalId: "f1a2b3c4-d5e6-7890-abcd-ef1234567890", operationUnitId: "OU001", operationUnitName: "OU - North Region" },
    { contractInternalId: "8a1b2c3d-4e5f-6789-abcd-ef0123456789", operationUnitInternalId: "a2b3c4d5-e6f7-8901-bcde-f12345678901", operationUnitId: "OU002", operationUnitName: "OU - South Region" }
  ],

  assignedCAGs: [
    {
      ouCagId: "OUCAG001",
      operationUnitId: "OU006",
      operationUnitInternalId: "e559a889-ddb2-4004-9c30-3be455cdbdd1",
      cagId: "CAG001",
      effectiveStartDate: "2023-01-01",
      effectiveEndDate: null,
      assigmentStatus: "ACTIVE",
      carrierId: "CAR001",
      carrierName: "United Health Carrier",
      assignmentLevel: "CARRIER",
      accountId: "ACC001",
      accountName: "Optum Rx Account",
      groupId: "GRP001",
      groupName: "Optum Group A"
    },
    {
      ouCagId: "OUCAG002",
      operationUnitId: "OU006",
      operationUnitInternalId: "e559a889-ddb2-4004-9c30-3be455cdbdd1",
      cagId: "CAG002",
      effectiveStartDate: "2024-03-01",
      effectiveEndDate: null,
      assigmentStatus: "ACTIVE",
      carrierId: "CAR002",
      carrierName: "Blue Cross Blue Shield",
      assignmentLevel: "ACCOUNT",
      accountId: "ACC002",
      accountName: "BCBS Premium",
      groupId: "GRP002",
      groupName: "Premium Group B"
    },
    {
      ouCagId: "OUCAG003",
      operationUnitId: "OU004",
      operationUnitInternalId: "e417a6ee-aaec-4c24-a417-e7e5401bfdd7",
      cagId: "CAG003",
      effectiveStartDate: "2024-02-01",
      effectiveEndDate: "2024-11-30",
      assigmentStatus: "ACTIVE",
      carrierId: "CAR001",
      carrierName: "United Health Carrier",
      assignmentLevel: "GROUP",
      accountId: "ACC001",
      accountName: "Optum Rx Account",
      groupId: "GRP003",
      groupName: "Optum Group C"
    },
    {
      ouCagId: "OUCAG004",
      operationUnitId: "OU006",
      operationUnitInternalId: "e559a889-ddb2-4004-9c30-3be455cdbdd1",
      cagId: "CAG004",
      effectiveStartDate: "2021-09-15",
      effectiveEndDate: null,
      assigmentStatus: "SUSPENDED",
      carrierId: "CAR003",
      carrierName: "Aetna Insurance Services",
      assignmentLevel: "ACCOUNT",
      accountId: "ACC004",
      accountName: "Aetna Specialty",
      groupId: "GRP004",
      groupName: "Specialty Group"
    },
    {
      ouCagId: "OUCAG005",
      operationUnitId: "OU001",
      operationUnitInternalId: "f1a2b3c4-d5e6-7890-abcd-ef1234567890",
      cagId: "CAG005",
      effectiveStartDate: "2024-04-01",
      effectiveEndDate: "2024-12-31",
      assigmentStatus: "ACTIVE",
      carrierId: "CAR001",
      carrierName: "United Health Carrier",
      assignmentLevel: "CARRIER",
      accountId: "ACC001",
      accountName: "Optum Rx Account",
      groupId: "GRP001",
      groupName: "Optum Group A"
    }
  ],

  cagMappings: [
    { cagId: "CAG001", carrierId: "CR001", carrierName: "CR_A", accountId: "AC001", accountName: "AC_A", groupId: "GR001", groupName: "GR_A" },
    { cagId: "CAG002", carrierId: "CR001", carrierName: "CR_A", accountId: "AC001", accountName: "AC_A", groupId: "GR002", groupName: "GR_B" },
    { cagId: "CAG003", carrierId: "CR001", carrierName: "CR_A", accountId: "AC002", accountName: "AC_B", groupId: "GR001", groupName: "GR_A" },
    { cagId: "CAG004", carrierId: "CR002", carrierName: "CR_B", accountId: "AC003", accountName: "AC_C", groupId: "GR003", groupName: "GR_C" },
    { cagId: "CAG005", carrierId: "CR001", carrierName: "CR_A", accountId: "AC001", accountName: "AC_A", groupId: "GR001", groupName: "GR_A" },
    { cagId: "CAG006", carrierId: "CR003", carrierName: "CR_C", accountId: "AC004", accountName: "AC_D", groupId: "GR004", groupName: "GR_D" }
  ]
};

module.exports = data;
