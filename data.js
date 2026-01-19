// In-memory data store
const data = {
  clients: [
    { clientName: "ABC", clientReferenceId: "CRI001" },
    { clientName: "XYZ", clientReferenceId: "CRI002" },
    { clientName: "DEF", clientReferenceId: "CRI003" }
  ],

  contracts: [
    { clientReferenceId: "CRI001", clientName: "ABC", contractId: "CON001", effectiveDate: "2023-01-01", terminationDate: "2024-12-31" },
    { clientReferenceId: "CRI001", clientName: "ABC", contractId: "CON002", effectiveDate: "2024-02-15", terminationDate: null },
    { clientReferenceId: "CRI001", clientName: "ABC", contractId: "CON003", effectiveDate: "2022-06-01", terminationDate: "2023-05-31" },
    { clientReferenceId: "CRI002", clientName: "XYZ", contractId: "CON004", effectiveDate: "2023-06-01", terminationDate: null },
    { clientReferenceId: "CRI003", clientName: "DEF", contractId: "CON005", effectiveDate: "2024-01-01", terminationDate: null }
  ],

  operationUnits: [
    { contractId: "CON001", operationUnitId: "OU001", operationUnitName: "Manufacturing" },
    { contractId: "CON001", operationUnitId: "OU002", operationUnitName: "Logistics" },
    { contractId: "CON001", operationUnitId: "OU003", operationUnitName: "Sales" },
    { contractId: "CON002", operationUnitId: "OU004", operationUnitName: "Marketing" },
    { contractId: "CON003", operationUnitId: "OU005", operationUnitName: "HR" }
  ],

  assignedCAGs: [
    {
      ouCagId: "OUCAG001",
      operationUnitId: "OU001",
      cagId: "CAG001",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      ouCagStatus: "ACTIVE",
      carrierId: "CAR001",
      assignmentLevel: "Carrier",
      carrierName: "Carrier_A",
      accountId: "AC001",
      accountName: "Account_A",
      groupId: "GR001",
      groupName: "Group_A"
    },
    {
      ouCagId: "OUCAG002",
      operationUnitId: "OU001",
      cagId: "CAG002",
      startDate: "2024-03-01",
      endDate: null,
      ouCagStatus: "ACTIVE",
      carrierId: "CAR002",
      assignmentLevel: "Account",
      carrierName: "Carrier_B",
      accountId: "AC002",
      accountName: "Account_B",
      groupId: "GR002",
      groupName: "Group_B"
    },
    {
      ouCagId: "OUCAG003",
      operationUnitId: "OU001",
      cagId: "CAG003",
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      ouCagStatus: "ACTIVE",
      carrierId: "CAR001",
      assignmentLevel: "Group",
      carrierName: "Carrier_A",
      accountId: "AC001",
      accountName: "Account_A",
      groupId: "GR003",
      groupName: "Group_C"
    },
    {
      ouCagId: "OUCAG004",
      operationUnitId: "OU002",
      cagId: "CAG004",
      startDate: "2024-01-15",
      endDate: null,
      ouCagStatus: "INACTIVE",
      carrierId: "CAR003",
      assignmentLevel: "Carrier",
      carrierName: "Carrier_C",
      accountId: "AC003",
      accountName: "Account_C",
      groupId: "GR004",
      groupName: "Group_D"
    },
    {
      ouCagId: "OUCAG005",
      operationUnitId: "OU001",
      cagId: "CAG005",
      startDate: "2024-04-01",
      endDate: "2024-12-31",
      ouCagStatus: "ACTIVE",
      carrierId: "CAR001",
      assignmentLevel: "Carrier",
      carrierName: "Carrier_A",
      accountId: "AC001",
      accountName: "Account_A",
      groupId: "GR001",
      groupName: "Group_A"
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
