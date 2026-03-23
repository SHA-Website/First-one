const memberImageModules = import.meta.glob("../assets/students/*.{png,jpg,jpeg}", {
  eager: true,
});

const imageByRollNo = Object.entries(memberImageModules).reduce((acc, [path, module]) => {
  const filename = path.split("/").pop() ?? "";
  const [baseName] = filename.split(".");
  // Supports both "25CSR292.ext" and legacy "25CSR292_NAME.ext" file names.
  const rollNo = (baseName.includes("_") ? baseName.split("_")[0] : baseName)?.toUpperCase();
  if (rollNo) {
    acc[rollNo] = module.default;
  }
  return acc;
}, {});

export const getMemberImageByRollNo = (rollNo) =>
  imageByRollNo[rollNo?.toUpperCase()] ?? null;

export const MEMBERS = [
  { id: 1, rollNo: "25CSR292", name: "Srinikesh S S", role: "Secretary", dept: "CSE", cluster: "Cluster 1" },
  { id: 2, rollNo: "25CSR084", name: "Harini R", role: "Joint Secretary", dept: "CSE", cluster: "Cluster 1" },
  { id: 3, rollNo: "25CSR241", name: "Ritheka S", role: "Treasurer", dept: "CSE", cluster: "Cluster 1" },
  { id: 4, rollNo: "25CSR214", name: "Prakalya S B", role: "Joint Treasurer", dept: "CSE", cluster: "Cluster 1" },
  { id: 5, rollNo: "25CSR081", name: "Haresh V", role: "Executive Member", dept: "CSE", cluster: "Cluster 1" },
  { id: 6, rollNo: "25CSR090", name: "Harini Sri D", role: "Executive Member", dept: "CSE", cluster: "Cluster 1" },
  { id: 7, rollNo: "25CSR101", name: "Iniya S S", role: "Executive Member", dept: "CSE", cluster: "Cluster 1" },
  { id: 8, rollNo: "25CSR135", name: "Keerthivasan S S", role: "Executive Member", dept: "CSE", cluster: "Cluster 1" },
  { id: 9, rollNo: "25CSR149", name: "Lekkala Tharini", role: "Executive Member", dept: "CSE", cluster: "Cluster 1" },
  { id: 10, rollNo: "25CSR164", name: "Martin Roger J", role: "Executive Member", dept: "CSE", cluster: "Cluster 1" },
  { id: 11, rollNo: "25CSR237", name: "Reshma S", role: "Executive Member", dept: "CSE", cluster: "Cluster 1" },
  { id: 12, rollNo: "25CSR243", name: "Rithniha R", role: "Executive Member", dept: "CSE", cluster: "Cluster 1" },
  { id: 13, rollNo: "25CSR283", name: "Sivakumari G", role: "Executive Member", dept: "CSE", cluster: "Cluster 1" },
  { id: 14, rollNo: "25CSR296", name: "Subaranjani S R", role: "Executive Member", dept: "CSE", cluster: "Cluster 1" },

  { id: 15, rollNo: "25ALR059", name: "Varunesh N S", role: "Secretary", dept: "AIML", cluster: "Cluster 2" },
  { id: 16, rollNo: "25ADR144", name: "Sivaranjani P", role: "Joint Secretary", dept: "AIDS", cluster: "Cluster 2" },
  { id: 17, rollNo: "25ALR053", name: "Srinika M", role: "Treasurer", dept: "AIML", cluster: "Cluster 2" },
  { id: 18, rollNo: "25ADR017", name: "Darsani S M", role: "Joint Treasurer", dept: "AIDS", cluster: "Cluster 2" },
  { id: 19, rollNo: "25ADR037", name: "Ezhilarasan C", role: "Executive Member", dept: "AIDS", cluster: "Cluster 2" },
  { id: 20, rollNo: "25ADR066", name: "Kaviya K", role: "Executive Member", dept: "AIDS", cluster: "Cluster 2" },
  { id: 21, rollNo: "25ADR072", name: "Leelathar M", role: "Executive Member", dept: "AIDS", cluster: "Cluster 2" },
  { id: 22, rollNo: "25ADR078", name: "Manojavam S", role: "Executive Member", dept: "AIDS", cluster: "Cluster 2" },
  { id: 23, rollNo: "25ADR084", name: "Monish B", role: "Executive Member", dept: "AIDS", cluster: "Cluster 2" },
  { id: 24, rollNo: "25ALR001", name: "Aathira V K", role: "Executive Member", dept: "AIML", cluster: "Cluster 2" },
  { id: 25, rollNo: "25ALR035", name: "Nishaa S", role: "Executive Member", dept: "AIML", cluster: "Cluster 2" },
  { id: 26, rollNo: "25ALR040", name: "Prasanna D", role: "Executive Member", dept: "AIML", cluster: "Cluster 2" },
  { id: 27, rollNo: "25ALR041", name: "Preethika M", role: "Executive Member", dept: "AIML", cluster: "Cluster 2" },
  { id: 28, rollNo: "25ALR042", name: "Rakshitha K", role: "Executive Member", dept: "AIML", cluster: "Cluster 2" },

  { id: 29, rollNo: "25MTR021", name: "Dheepesh K", role: "Secretary", dept: "MTS", cluster: "Cluster 3" },
  { id: 30, rollNo: "25ECR057", name: "Eniya A", role: "Joint Secretary", dept: "ECE", cluster: "Cluster 3" },
  { id: 31, rollNo: "25ECR072", name: "Hareesh M", role: "Treasurer", dept: "ECE", cluster: "Cluster 3" },
  { id: 32, rollNo: "25MTR078", name: "Sanjeevkumar A", role: "Joint Treasurer", dept: "MTS", cluster: "Cluster 3" },
  { id: 33, rollNo: "25ECR041", name: "Dharani Seelan G", role: "Executive Member", dept: "ECE", cluster: "Cluster 3" },
  { id: 34, rollNo: "25ECR044", name: "Dharun Kumar P", role: "Executive Member", dept: "ECE", cluster: "Cluster 3" },
  { id: 35, rollNo: "25ECR091", name: "Jeevana V", role: "Executive Member", dept: "ECE", cluster: "Cluster 3" },
  { id: 36, rollNo: "25ECR098", name: "Johnmobin P", role: "Executive Member", dept: "ECE", cluster: "Cluster 3" },
  { id: 37, rollNo: "25ECR135", name: "Manasa R", role: "Executive Member", dept: "ECE", cluster: "Cluster 3" },
  { id: 38, rollNo: "25ECR166", name: "Phavan Sanjeen P", role: "Executive Member", dept: "ECE", cluster: "Cluster 3" },
  { id: 39, rollNo: "25ECR205", name: "M Santhosh", role: "Executive Member", dept: "ECE", cluster: "Cluster 3" },
  { id: 40, rollNo: "25ECR220", name: "Srinidhin M", role: "Executive Member", dept: "ECE", cluster: "Cluster 3" },
  { id: 41, rollNo: "25MTR006", name: "Arjun Bharani B", role: "Executive Member", dept: "MTS", cluster: "Cluster 3" },
  { id: 42, rollNo: "25MTR013", name: "Dharneshwaran M V", role: "Executive Member", dept: "MTS", cluster: "Cluster 3" },
  { id: 43, rollNo: "25MTR023", name: "Divakar M R", role: "Executive Member", dept: "MTS", cluster: "Cluster 3" },
  { id: 44, rollNo: "25MTR024", name: "Elambharathi K S", role: "Executive Member", dept: "MTS", cluster: "Cluster 3" },
  { id: 45, rollNo: "25MTR056", name: "S Nagul Krishna", role: "Executive Member", dept: "MTS", cluster: "Cluster 3" },
  { id: 46, rollNo: "25MTR070", name: "Rokini Sree M D", role: "Executive Member", dept: "MTS", cluster: "Cluster 3" },
  { id: 47, rollNo: "25MTR103", name: "Sujeeth S P", role: "Executive Member", dept: "MTS", cluster: "Cluster 3" },

  { id: 48, rollNo: "25EIR062", name: "Nithyashree P", role: "Secretary", dept: "EIE", cluster: "Cluster 4" },
  { id: 49, rollNo: "25EER103", name: "Shree Saran K S", role: "Joint Secretary", dept: "EEE", cluster: "Cluster 4" },
  { id: 50, rollNo: "25EIR103", name: "Shruthi Senthilkumar", role: "Treasurer", dept: "EIE", cluster: "Cluster 4" },
  { id: 51, rollNo: "25EER029", name: "Harikanth S", role: "Joint Treasurer", dept: "EEE", cluster: "Cluster 4" },
  { id: 52, rollNo: "25EER098", name: "Saravana Vel S", role: "Executive Member", dept: "EEE", cluster: "Cluster 4" },
  { id: 53, rollNo: "25EER104", name: "Sivachalam S", role: "Executive Member", dept: "EEE", cluster: "Cluster 4" },
  { id: 54, rollNo: "25EIR068", name: "Poojashri V", role: "Executive Member", dept: "EIE", cluster: "Cluster 4" },
  { id: 55, rollNo: "25EER001", name: "Abhisri P", role: "Executive Member", dept: "EEE", cluster: "Cluster 4" },
  { id: 56, rollNo: "25EER025", name: "Guhan V", role: "Executive Member", dept: "EEE", cluster: "Cluster 4" },
  { id: 57, rollNo: "25EER063", name: "Miruthulashree R", role: "Executive Member", dept: "EEE", cluster: "Cluster 4" },
  { id: 58, rollNo: "25EIR112", name: "Uvanbabu S", role: "Executive Member", dept: "EIE", cluster: "Cluster 4" },
  { id: 59, rollNo: "25EIR010", name: "Dhananjayan S", role: "Executive Member", dept: "EIE", cluster: "Cluster 4" },
  { id: 60, rollNo: "25EIR054", name: "Nandhana M", role: "Executive Member", dept: "EIE", cluster: "Cluster 4" },
  { id: 61, rollNo: "25EIR044", name: "Maneesha S", role: "Executive Member", dept: "EIE", cluster: "Cluster 4" },

  { id: 62, rollNo: "25MER038", name: "Panbalan P I", role: "Secretary", dept: "MECH", cluster: "Cluster 5" },
  { id: 63, rollNo: "25CHR050", name: "Suwathikaa S S", role: "Joint Secretary", dept: "CHEM", cluster: "Cluster 5" },
  { id: 64, rollNo: "25MER042", name: "Rohith S", role: "Treasurer", dept: "MECH", cluster: "Cluster 5" },
  { id: 65, rollNo: "25CHR009", name: "Gopikasri S", role: "Joint Treasurer", dept: "CHEM", cluster: "Cluster 5" },
  { id: 66, rollNo: "25CHR024", name: "Mahitha Shiree A S", role: "Executive Member", dept: "CHEM", cluster: "Cluster 5" },
  { id: 67, rollNo: "25CHR039", name: "Rekha M", role: "Executive Member", dept: "CHEM", cluster: "Cluster 5" },
  { id: 68, rollNo: "25MER015", name: "Harini K T S", role: "Executive Member", dept: "MECH", cluster: "Cluster 5" },
  { id: 69, rollNo: "25CHR038", name: "Ratish Kumar A", role: "Executive Member", dept: "CHEM", cluster: "Cluster 5" },
  { id: 70, rollNo: "25CHR036", name: "Priyadharshini M D", role: "Executive Member", dept: "CHEM", cluster: "Cluster 5" },
  { id: 71, rollNo: "25CHR020", name: "Kishore Kumar V", role: "Executive Member", dept: "CHEM", cluster: "Cluster 5" },
  { id: 72, rollNo: "25MER027", name: "Mohammed Yasir S", role: "Executive Member", dept: "MECH", cluster: "Cluster 5" },
  { id: 73, rollNo: "25MER021", name: "Kaushik C M", role: "Executive Member", dept: "MECH", cluster: "Cluster 5" },
  { id: 74, rollNo: "25MER049", name: "Sharan", role: "Executive Member", dept: "MECH", cluster: "Cluster 5" },

  { id: 75, rollNo: "25ITR037", name: "Hari Haraa Sudhan S", role: "Secretary", dept: "IT", cluster: "Cluster 6" },
  { id: 76, rollNo: "25CDR052", name: "Meenakshi M", role: "Joint Secretary", dept: "CSD", cluster: "Cluster 6" },
  { id: 77, rollNo: "25ITR130", name: "Saravanan S N", role: "Treasurer", dept: "IT", cluster: "Cluster 6" },
  { id: 78, rollNo: "25ITR067", name: "Kavinaya S", role: "Joint Treasurer", dept: "IT", cluster: "Cluster 6" },
  { id: 79, rollNo: "25CDR037", name: "Joshitha Gawri B", role: "Executive Member", dept: "CSD", cluster: "Cluster 6" },
  { id: 80, rollNo: "25ITR035", name: "Gurusaran R", role: "Executive Member", dept: "IT", cluster: "Cluster 6" },
  { id: 81, rollNo: "25CDR053", name: "A Mohamed Irfan", role: "Executive Member", dept: "CSD", cluster: "Cluster 6" },
  { id: 82, rollNo: "25CDR080", name: "Rose Angelin P", role: "Executive Member", dept: "CSD", cluster: "Cluster 6" },
  { id: 83, rollNo: "25ITR181", name: "Yogeshwaran V", role: "Executive Member", dept: "IT", cluster: "Cluster 6" },
  { id: 84, rollNo: "25ITR001", name: "Aakash P", role: "Executive Member", dept: "IT", cluster: "Cluster 6" },
  { id: 85, rollNo: "25ITR072", name: "Keshika K S", role: "Executive Member", dept: "IT", cluster: "Cluster 6" },
  { id: 86, rollNo: "25CDR107", name: "Suha Sajani S", role: "Executive Member", dept: "CSD", cluster: "Cluster 6" },
  { id: 87, rollNo: "25ITR160", name: "Tharun Vijay K V", role: "Executive Member", dept: "IT", cluster: "Cluster 6" },
];

const coordinatorRoles = ["Secretary", "Joint Secretary", "Treasurer", "Joint Treasurer"];

export const STUDENT_COORDINATORS = MEMBERS.filter((member) =>
  coordinatorRoles.includes(member.role)
).map((member) => ({
  ...member,
  image: getMemberImageByRollNo(member.rollNo),
  homepageCluster: member.cluster.replace(" ", "-"),
}));


