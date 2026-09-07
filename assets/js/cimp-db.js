/**
 * CIMP - BIIF Centralized Ecosystem Database & State Engine
 * Handles persistent storage, multi-tier approvals, role authentication,
 * OmniSearch, real-time analytics, and automatic website synchronization.
 */

(function () {
    'use strict';

    // Auto Clean Browser URL Bar (Removes .html and index.html cleanly)
    try {
        if (window.location.protocol !== 'file:') {
            const pathname = window.location.pathname;
            if (pathname.endsWith('.html') || pathname.includes('.html')) {
                let cleanPath = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
                if (!cleanPath) cleanPath = '/';
                const cleanUrl = cleanPath + window.location.search + window.location.hash;
                window.history.replaceState(null, document.title, cleanUrl);
            }
        }
    } catch (e) {}

    const STORAGE_KEY_PREFIX = 'cimp_biif_';

    // Initial Seed Data for Startups
    const SEED_STARTUPS = [
    {
        "id": "ST-001",
        "name": "KisanDost",
        "legalName": "AgriNXT Technologies Pvt Ltd",
        "brandName": "KisanDost",
        "initial": "K",
        "logo": "",
        "sector": "AgriTech",
        "sectorShort": "AgriTech",
        "sectorFull": "AgriTech / IoT & Smart Farming",
        "stage": "Idea Stage",
        "stageRaw": "Ideation",
        "incubationStage": "Pre-Incubation",
        "status": "Active",
        "founder": "Aarav Sharma",
        "coFounders": [
            "Aarav Sharma (70%)",
            "Praveen Kumar (30%)"
        ],
        "district": "Patna",
        "location": "Patna, Bihar",
        "desc": "IoT-based soil moisture and nutrient sensors connected with automated solar drip irrigation for smallholder farmers.",
        "color": "#2E7D32",
        "metric": "₹4 Lakh",
        "metricLabel": "Startup Bihar Status",
        "funding": "4 Lakh",
        "fundingRemark": "FUNDED",
        "regNoBihar": "SB2025010001",
        "dpiit": "Applied",
        "website": "https://www.kisandost.in",
        "social": [
            "https://linkedin.com/company/kisandost",
            "https://instagram.com/kisandost"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Arvind Swaminathan",
        "complianceScore": 91
    },
    {
        "id": "ST-002",
        "name": "AuraScan",
        "legalName": "AuraHealth Diagnostic Solutions Pvt Ltd",
        "brandName": "AuraScan",
        "initial": "A",
        "logo": "",
        "sector": "HealthTech",
        "sectorShort": "HealthTech",
        "sectorFull": "HealthTech / Digital Healthcare & AI",
        "stage": "Pre-Revenue",
        "stageRaw": "Prototype",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Pooja Kumari",
        "coFounders": [
            "Pooja Kumari (70%)",
            "Kunal Kishore (30%)"
        ],
        "district": "Gaya",
        "location": "Gaya, Bihar",
        "desc": "AI-powered cloud teleradiology platform delivering instant chest X-ray screening and preliminary radiology reports in rural clinics.",
        "color": "#C62828",
        "metric": "₹10 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "10 Lakh",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010002",
        "dpiit": "DIPP150002",
        "website": "https://www.aurascan.in",
        "social": [
            "https://linkedin.com/company/aurascan",
            "https://instagram.com/aurascan"
        ],
        "year": 2024,
        "assignedMentor": "Meera Venkatraman",
        "complianceScore": 92
    },
    {
        "id": "ST-003",
        "name": "GyanSetu",
        "legalName": "GyanSetu Edutech Pvt Ltd",
        "brandName": "GyanSetu",
        "initial": "G",
        "logo": "",
        "sector": "EdTech",
        "sectorShort": "EdTech",
        "sectorFull": "EdTech / EdTech & Gamified Learning",
        "stage": "Pre-Revenue",
        "stageRaw": "MVP",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Rohan Verma",
        "coFounders": [
            "Rohan Verma (70%)",
            "Neha Gupta (30%)"
        ],
        "district": "Muzaffarpur",
        "location": "Muzaffarpur, Bihar",
        "desc": "Interactive vernacular STEM gamified learning modules with offline sync capabilities designed for rural schools.",
        "color": "#1565C0",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010003",
        "dpiit": "Applied",
        "website": "https://www.gyansetu.in",
        "social": [
            "https://linkedin.com/company/gyansetu",
            "https://instagram.com/gyansetu"
        ],
        "year": 2024,
        "assignedMentor": "Prof. (Dr.) Rajeshwar Sen",
        "complianceScore": 93
    },
    {
        "id": "ST-004",
        "name": "MudrPay",
        "legalName": "VyaparMudr FinTech Pvt Ltd",
        "brandName": "MudrPay",
        "initial": "M",
        "logo": "",
        "sector": "FinTech",
        "sectorShort": "FinTech",
        "sectorFull": "FinTech / Fintech & Lending Infrastructure",
        "stage": "Revenue Stage",
        "stageRaw": "Early Stage",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Sneha Singh",
        "coFounders": [
            "Sneha Singh (70%)",
            "Rajeshwar Jha (30%)"
        ],
        "district": "Bhagalpur",
        "location": "Bhagalpur, Bihar",
        "desc": "Cash-flow based credit assessment and invoice discounting infrastructure for tier-2/3 retail distributors and kiranas.",
        "color": "#00838F",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010004",
        "dpiit": "DIPP150004",
        "website": "https://www.mudrpay.in",
        "social": [
            "https://linkedin.com/company/mudrpay",
            "https://instagram.com/mudrpay"
        ],
        "year": 2024,
        "assignedMentor": "Adv. Sunita Singhania",
        "complianceScore": 94
    },
    {
        "id": "ST-005",
        "name": "CoolSun",
        "legalName": "UrjaShakti Green Energy Pvt Ltd",
        "brandName": "CoolSun",
        "initial": "C",
        "logo": "",
        "sector": "CleanTech & Renewable Energy",
        "sectorShort": "CleanTech",
        "sectorFull": "CleanTech & Renewable Energy / CleanTech & Cold Chain",
        "stage": "Scaling",
        "stageRaw": "Scale",
        "incubationStage": "Acceleration",
        "status": "Active",
        "founder": "Vikram Aditya",
        "coFounders": [
            "Vikram Aditya (70%)",
            "Priyanka Roy (30%)"
        ],
        "district": "Darbhanga",
        "location": "Darbhanga, Bihar",
        "desc": "Micro cold-storage units powered by decentralised rooftop solar designed for horticulture and dairy produce.",
        "color": "#0D9488",
        "metric": "₹25 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "25 Lakh",
        "fundingRemark": "Not Applied Yet",
        "regNoBihar": "SB2025010005",
        "dpiit": "Applied",
        "website": "https://www.coolsun.in",
        "social": [
            "https://linkedin.com/company/coolsun",
            "https://instagram.com/coolsun"
        ],
        "year": 2024,
        "assignedMentor": "Vikramaditya Roy",
        "complianceScore": 95
    },
    {
        "id": "ST-006",
        "name": "MilletBhoj",
        "legalName": "MithilaNutri Superfoods Pvt Ltd",
        "brandName": "MilletBhoj",
        "initial": "M",
        "logo": "",
        "sector": "FoodTech & Processing",
        "sectorShort": "FoodTech",
        "sectorFull": "FoodTech & Processing / Food Processing & Superfoods",
        "stage": "Idea Stage",
        "stageRaw": "Ideation",
        "incubationStage": "Pre-Incubation",
        "status": "Active",
        "founder": "Ananya Mishra",
        "coFounders": [
            "Ananya Mishra (70%)",
            "Rahul Tripathy (30%)"
        ],
        "district": "Purnia",
        "location": "Purnia, Bihar",
        "desc": "Ready-to-cook preservative-free porridge and meal premixes manufactured from local ragi, sattu, and foxnuts.",
        "color": "#D97706",
        "metric": "₹4 Lakh",
        "metricLabel": "Startup Bihar Status",
        "funding": "4 Lakh",
        "fundingRemark": "FUNDED",
        "regNoBihar": "SB2025010006",
        "dpiit": "DIPP150006",
        "website": "https://www.milletbhoj.in",
        "social": [
            "https://linkedin.com/company/milletbhoj",
            "https://instagram.com/milletbhoj"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Nandini Parikh",
        "complianceScore": 96
    },
    {
        "id": "ST-007",
        "name": "VakilOS",
        "legalName": "VakilAI Systems Pvt Ltd",
        "brandName": "VakilOS",
        "initial": "V",
        "logo": "",
        "sector": "SaaS & Enterprise AI",
        "sectorShort": "SaaS",
        "sectorFull": "SaaS & Enterprise AI / Enterprise SaaS / LegalTech",
        "stage": "Pre-Revenue",
        "stageRaw": "Prototype",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Kunal Kishore",
        "coFounders": [
            "Kunal Kishore (70%)",
            "Shreya Sinha (30%)"
        ],
        "district": "Begusarai",
        "location": "Begusarai, Bihar",
        "desc": "Bilingual contract review, compliance tracking, and legal drafting AI assistant built for Indian SMEs.",
        "color": "#4F46E5",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010007",
        "dpiit": "Applied",
        "website": "https://www.vakilos.in",
        "social": [
            "https://linkedin.com/company/vakilos",
            "https://instagram.com/vakilos"
        ],
        "year": 2024,
        "assignedMentor": "Kunal Bhasin",
        "complianceScore": 97
    },
    {
        "id": "ST-008",
        "name": "GramGati",
        "legalName": "GraminGati Logistics Pvt Ltd",
        "brandName": "GramGati",
        "initial": "G",
        "logo": "",
        "sector": "Logistics & Supply Chain",
        "sectorShort": "Logistics",
        "sectorFull": "Logistics & Supply Chain / Logistics & Fleet Aggregation",
        "stage": "Pre-Revenue",
        "stageRaw": "MVP",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Priyanka Roy",
        "coFounders": [
            "Priyanka Roy (70%)",
            "Rajeshwar Jha (30%)"
        ],
        "district": "Samastipur",
        "location": "Samastipur, Bihar",
        "desc": "On-demand aggregation of mini-trucks and rural tempo fleets for farm-to-mandi perishable transit.",
        "color": "#B45309",
        "metric": "₹10 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "10 Lakh",
        "fundingRemark": "Under Review",
        "regNoBihar": "SB2025010008",
        "dpiit": "DIPP150008",
        "website": "https://www.gramgati.in",
        "social": [
            "https://linkedin.com/company/gramgati",
            "https://instagram.com/gramgati"
        ],
        "year": 2024,
        "assignedMentor": "Shweta Kulkarni",
        "complianceScore": 98
    },
    {
        "id": "ST-009",
        "name": "PunyaDhoop",
        "legalName": "PunyaCraft Ecoworks Pvt Ltd",
        "brandName": "PunyaDhoop",
        "initial": "P",
        "logo": "",
        "sector": "Waste Management",
        "sectorShort": "Waste Management",
        "sectorFull": "Waste Management / Circular Economy & Waste Upcycling",
        "stage": "Revenue Stage",
        "stageRaw": "Early Stage",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Aditya Kashyap",
        "coFounders": [
            "Aditya Kashyap (70%)",
            "Chandan Roy (30%)"
        ],
        "district": "Madhubani",
        "location": "Madhubani, Bihar",
        "desc": "Collection and processing of temple floral waste and crop residue into premium charcoal-free incense and planters.",
        "color": "#1E3A8A",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010009",
        "dpiit": "Applied",
        "website": "https://www.punyadhoop.in",
        "social": [
            "https://linkedin.com/company/punyadhoop",
            "https://instagram.com/punyadhoop"
        ],
        "year": 2024,
        "assignedMentor": "Anil Kumar Srivastava",
        "complianceScore": 99
    },
    {
        "id": "ST-010",
        "name": "AgriHawk",
        "legalName": "Vimanika Aerospace Pvt Ltd",
        "brandName": "AgriHawk",
        "initial": "A",
        "logo": "",
        "sector": "Drone & Robotics",
        "sectorShort": "Drone",
        "sectorFull": "Drone & Robotics / Drones & Aerospace",
        "stage": "Scaling",
        "stageRaw": "Scale",
        "incubationStage": "Acceleration",
        "status": "Active",
        "founder": "Neha Gupta",
        "coFounders": [
            "Neha Gupta (70%)",
            "Swati Prakash (30%)"
        ],
        "district": "Bhojpur",
        "location": "Bhojpur, Bihar",
        "desc": "Autonomous drone spraying services providing micro-dosage fertilizer application with obstacle avoidance.",
        "color": "#2563EB",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010010",
        "dpiit": "DIPP150010",
        "website": "https://www.agrihawk.in",
        "social": [
            "https://linkedin.com/company/agrihawk",
            "https://instagram.com/agrihawk"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Prachi Bhattacharya",
        "complianceScore": 90
    },
    {
        "id": "ST-011",
        "name": "MithilaVastra",
        "legalName": "KalaSetu Crafts Pvt Ltd",
        "brandName": "MithilaVastra",
        "initial": "M",
        "logo": "",
        "sector": "Handloom & Handicrafts",
        "sectorShort": "Handloom",
        "sectorFull": "Handloom & Handicrafts / Handloom & E-Commerce",
        "stage": "Idea Stage",
        "stageRaw": "Ideation",
        "incubationStage": "Pre-Incubation",
        "status": "Active",
        "founder": "Manish Tiwari",
        "coFounders": [
            "Manish Tiwari (70%)",
            "Harsh Vardhan (30%)"
        ],
        "district": "Saran",
        "location": "Saran, Bihar",
        "desc": "Direct-to-consumer e-commerce connecting certified rural artisans with urban domestic and export markets.",
        "color": "#1E3A8A",
        "metric": "₹25 Lakh",
        "metricLabel": "Startup Bihar Status",
        "funding": "25 Lakh",
        "fundingRemark": "FUNDED",
        "regNoBihar": "SB2025010011",
        "dpiit": "Applied",
        "website": "https://www.mithilavastra.in",
        "social": [
            "https://linkedin.com/company/mithilavastra",
            "https://instagram.com/mithilavastra"
        ],
        "year": 2024,
        "assignedMentor": "Ramanathan Iyer",
        "complianceScore": 91
    },
    {
        "id": "ST-012",
        "name": "KamraKhoj",
        "legalName": "KamraKhoj PropTech Pvt Ltd",
        "brandName": "KamraKhoj",
        "initial": "K",
        "logo": "",
        "sector": "PropTech & Co-living",
        "sectorShort": "PropTech",
        "sectorFull": "PropTech & Co-living / PropTech & Real Estate",
        "stage": "Pre-Revenue",
        "stageRaw": "Prototype",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Ritu Raj",
        "coFounders": [
            "Ritu Raj (70%)",
            "Kameshwar Nath (30%)"
        ],
        "district": "Rohtas",
        "location": "Rohtas, Bihar",
        "desc": "Digital discovery and booking platform offering verified student accommodation with zero brokerage in student hubs.",
        "color": "#1E3A8A",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010012",
        "dpiit": "DIPP150012",
        "website": "https://www.kamrakhoj.in",
        "social": [
            "https://linkedin.com/company/kamrakhoj",
            "https://instagram.com/kamrakhoj"
        ],
        "year": 2024,
        "assignedMentor": "Priyanka Deshmukh",
        "complianceScore": 92
    },
    {
        "id": "ST-013",
        "name": "JalSmart",
        "legalName": "JalRakshak Tech Pvt Ltd",
        "brandName": "JalSmart",
        "initial": "J",
        "logo": "",
        "sector": "IoT & Automation",
        "sectorShort": "IoT",
        "sectorFull": "IoT & Automation / IoT & Hardware Automation",
        "stage": "Pre-Revenue",
        "stageRaw": "MVP",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Deepak Choubey",
        "coFounders": [
            "Deepak Choubey (70%)",
            "Nandini Jha (30%)"
        ],
        "district": "Vaishali",
        "location": "Vaishali, Bihar",
        "desc": "GSM/IoT retrofit controller with dry-run protection and automated scheduling for residential and farm submersible pumps.",
        "color": "#1E3A8A",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Under Review",
        "regNoBihar": "SB2025010013",
        "dpiit": "Applied",
        "website": "https://www.jalsmart.in",
        "social": [
            "https://linkedin.com/company/jalsmart",
            "https://instagram.com/jalsmart"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Tariq Manzoor",
        "complianceScore": 93
    },
    {
        "id": "ST-014",
        "name": "MandiXpress",
        "legalName": "MandiDirect Online Pvt Ltd",
        "brandName": "MandiXpress",
        "initial": "M",
        "logo": "",
        "sector": "E-commerce (B2B)",
        "sectorShort": "E-commerce (B2B)",
        "sectorFull": "E-commerce (B2B) / B2B Agri Marketplace",
        "stage": "Revenue Stage",
        "stageRaw": "Early Stage",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Swati Prakash",
        "coFounders": [
            "Swati Prakash (70%)",
            "Rupali Verma (30%)"
        ],
        "district": "Saharsa",
        "location": "Saharsa, Bihar",
        "desc": "Wholesale procurement mobile app bridging farmers and neighbourhood vegetable vendors with daily scheduled deliveries.",
        "color": "#1E3A8A",
        "metric": "₹10 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "10 Lakh",
        "fundingRemark": "Shortlisted",
        "regNoBihar": "SB2025010014",
        "dpiit": "DIPP150014",
        "website": "https://www.mandixpress.in",
        "social": [
            "https://linkedin.com/company/mandixpress",
            "https://instagram.com/mandixpress"
        ],
        "year": 2024,
        "assignedMentor": "Siddharth Chawla",
        "complianceScore": 94
    },
    {
        "id": "ST-015",
        "name": "GatiWheels",
        "legalName": "GatiEV Mobility Solutions Pvt Ltd",
        "brandName": "GatiWheels",
        "initial": "G",
        "logo": "",
        "sector": "Mobility & EV",
        "sectorShort": "Mobility",
        "sectorFull": "Mobility & EV / EV Mobility & Micro-Transit",
        "stage": "Scaling",
        "stageRaw": "Scale",
        "incubationStage": "Acceleration",
        "status": "Active",
        "founder": "Alok Nath",
        "coFounders": [
            "Alok Nath (70%)",
            "Nandini Jha (30%)"
        ],
        "district": "Katihar",
        "location": "Katihar, Bihar",
        "desc": "Dockless shared electric two-wheelers for university campuses and industrial clusters with geofenced tracking.",
        "color": "#059669",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010015",
        "dpiit": "Applied",
        "website": "https://www.gatiwheels.in",
        "social": [
            "https://linkedin.com/company/gatiwheels",
            "https://instagram.com/gatiwheels"
        ],
        "year": 2024,
        "assignedMentor": "Ananya Mukherjee",
        "complianceScore": 95
    },
    {
        "id": "ST-016",
        "name": "ScoutKhel",
        "legalName": "KhelPratibha Intelligence Pvt Ltd",
        "brandName": "ScoutKhel",
        "initial": "S",
        "logo": "",
        "sector": "SportsTech",
        "sectorShort": "SportsTech",
        "sectorFull": "SportsTech / SportsTech & DeepTech",
        "stage": "Idea Stage",
        "stageRaw": "Ideation",
        "incubationStage": "Pre-Incubation",
        "status": "Active",
        "founder": "Divya Bharti",
        "coFounders": [
            "Divya Bharti (70%)",
            "Shalini Devi (30%)"
        ],
        "district": "Nalanda",
        "location": "Nalanda, Bihar",
        "desc": "Computer-vision video assessment app generating standardized metric scorecards for young athletics and cricket talent.",
        "color": "#1E3A8A",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010016",
        "dpiit": "DIPP150016",
        "website": "https://www.scoutkhel.in",
        "social": [
            "https://linkedin.com/company/scoutkhel",
            "https://instagram.com/scoutkhel"
        ],
        "year": 2024,
        "assignedMentor": "Rajiv Nambiar",
        "complianceScore": 96
    },
    {
        "id": "ST-017",
        "name": "RakshaSec",
        "legalName": "SurakshaShield Security Pvt Ltd",
        "brandName": "RakshaSec",
        "initial": "R",
        "logo": "",
        "sector": "Cybersecurity",
        "sectorShort": "Cybersecurity",
        "sectorFull": "Cybersecurity / Cybersecurity & IT Infrastructure",
        "stage": "Pre-Revenue",
        "stageRaw": "Prototype",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Praveen Kumar",
        "coFounders": [
            "Praveen Kumar (70%)",
            "Alok Nath (30%)"
        ],
        "district": "Siwan",
        "location": "Siwan, Bihar",
        "desc": "Endpoint protection and ransomware defense suite tailored for regional cooperative banks and retail networks.",
        "color": "#1E3A8A",
        "metric": "₹25 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "25 Lakh",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010017",
        "dpiit": "Applied",
        "website": "https://www.rakshasec.in",
        "social": [
            "https://linkedin.com/company/rakshasec",
            "https://instagram.com/rakshasec"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Bhupendra Nath Verma",
        "complianceScore": 97
    },
    {
        "id": "ST-018",
        "name": "BioKhet",
        "legalName": "BioVeda CropScience Pvt Ltd",
        "brandName": "BioKhet",
        "initial": "B",
        "logo": "",
        "sector": "Biotech & Life Sciences",
        "sectorShort": "Biotech",
        "sectorFull": "Biotech & Life Sciences / Agri-Biotech & Soil Science",
        "stage": "Pre-Revenue",
        "stageRaw": "MVP",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Shreya Sinha",
        "coFounders": [
            "Shreya Sinha (70%)",
            "Tarun Agrawal (30%)"
        ],
        "district": "Buxar",
        "location": "Buxar, Bihar",
        "desc": "Indigenous liquid bio-fertilizer and mycorrhizal formulations to restore soil microbial biodiversity.",
        "color": "#1E3A8A",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Under Review",
        "regNoBihar": "SB2025010018",
        "dpiit": "DIPP150018",
        "website": "https://www.biokhet.in",
        "social": [
            "https://linkedin.com/company/biokhet",
            "https://instagram.com/biokhet"
        ],
        "year": 2024,
        "assignedMentor": "Deepika Tandon",
        "complianceScore": 98
    },
    {
        "id": "ST-019",
        "name": "AtithiStay",
        "legalName": "AtithiOS Solutions Pvt Ltd",
        "brandName": "AtithiStay",
        "initial": "A",
        "logo": "",
        "sector": "Hospitality Tech",
        "sectorShort": "Hospitality Tech",
        "sectorFull": "Hospitality Tech / Hospitality Tech & SaaS",
        "stage": "Revenue Stage",
        "stageRaw": "Early Stage",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Abhishek Pandey",
        "coFounders": [
            "Abhishek Pandey (70%)",
            "Rupali Verma (30%)"
        ],
        "district": "West Champaran",
        "location": "West Champaran, Bihar",
        "desc": "Cloud PMS integrating contactless QR check-in, dynamic room pricing, and automated inventory reconciliation.",
        "color": "#4F46E5",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Shortlisted",
        "regNoBihar": "SB2025010019",
        "dpiit": "Applied",
        "website": "https://www.atithistay.in",
        "social": [
            "https://linkedin.com/company/atithistay",
            "https://instagram.com/atithistay"
        ],
        "year": 2024,
        "assignedMentor": "Suresh Chandra Mohapatra",
        "complianceScore": 99
    },
    {
        "id": "ST-020",
        "name": "LokRang OTT",
        "legalName": "Bhojpuria Stream Media Pvt Ltd",
        "brandName": "LokRang OTT",
        "initial": "L",
        "logo": "",
        "sector": "Media & OTT",
        "sectorShort": "Media",
        "sectorFull": "Media & OTT / Digital Media & Streaming",
        "stage": "Scaling",
        "stageRaw": "Scale",
        "incubationStage": "Acceleration",
        "status": "Active",
        "founder": "Nandini Jha",
        "coFounders": [
            "Nandini Jha (70%)",
            "Shreya Sinha (30%)"
        ],
        "district": "East Champaran",
        "location": "East Champaran, Bihar",
        "desc": "Hyperlocal OTT platform streaming folk music, regional cultural theatre, and rural educational documentaries.",
        "color": "#1E3A8A",
        "metric": "₹10 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "10 Lakh",
        "fundingRemark": "Not Applied Yet",
        "regNoBihar": "SB2025010020",
        "dpiit": "DIPP150020",
        "website": "https://www.lokrang ott.in",
        "social": [
            "https://linkedin.com/company/lokrang ott",
            "https://instagram.com/lokrang ott"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Farhan Qureshi",
        "complianceScore": 90
    },
    {
        "id": "ST-021",
        "name": "GauPure",
        "legalName": "GauAmrit Dairy Farms Pvt Ltd",
        "brandName": "GauPure",
        "initial": "G",
        "logo": "",
        "sector": "Animal Husbandry & Dairy",
        "sectorShort": "Animal Husbandry",
        "sectorFull": "Animal Husbandry & Dairy / DairyTech & Livestock Health",
        "stage": "Idea Stage",
        "stageRaw": "Ideation",
        "incubationStage": "Pre-Incubation",
        "status": "Active",
        "founder": "Sumit Sengupta",
        "coFounders": [
            "Sumit Sengupta (70%)",
            "Archana Prasad (30%)"
        ],
        "district": "Patna",
        "location": "Patna, Bihar",
        "desc": "IoT neck-collar cattle health monitoring coupled with farm-to-doorstep chilled unadulterated cow milk delivery.",
        "color": "#1E3A8A",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010021",
        "dpiit": "Applied",
        "website": "https://www.gaupure.in",
        "social": [
            "https://linkedin.com/company/gaupure",
            "https://instagram.com/gaupure"
        ],
        "year": 2024,
        "assignedMentor": "Kavita Singhal",
        "complianceScore": 91
    },
    {
        "id": "ST-022",
        "name": "VedGlow",
        "legalName": "VanAushadhi Herbal Care Pvt Ltd",
        "brandName": "VedGlow",
        "initial": "V",
        "logo": "",
        "sector": "Cosmetics & Herbal",
        "sectorShort": "Cosmetics",
        "sectorFull": "Cosmetics & Herbal / Ayurvedic Personal Care & D2C",
        "stage": "Pre-Revenue",
        "stageRaw": "Prototype",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Pallavi Thakur",
        "coFounders": [
            "Pallavi Thakur (70%)",
            "Ananya Mishra (30%)"
        ],
        "district": "Gaya",
        "location": "Gaya, Bihar",
        "desc": "Clinically-tested herbal skincare products extracted from locally cultivated medicinal plants like shatavari and neem.",
        "color": "#1E3A8A",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010022",
        "dpiit": "DIPP150022",
        "website": "https://www.vedglow.in",
        "social": [
            "https://linkedin.com/company/vedglow",
            "https://instagram.com/vedglow"
        ],
        "year": 2024,
        "assignedMentor": "Manish Poddar",
        "complianceScore": 92
    },
    {
        "id": "ST-023",
        "name": "RozgarMitra",
        "legalName": "RozgarMitra Talent Solutions Pvt Ltd",
        "brandName": "RozgarMitra",
        "initial": "R",
        "logo": "",
        "sector": "HRTech & Gig Economy",
        "sectorShort": "HRTech",
        "sectorFull": "HRTech & Gig Economy / HRTech & Workforce Enablement",
        "stage": "Pre-Revenue",
        "stageRaw": "MVP",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Sanjay Yadav",
        "coFounders": [
            "Sanjay Yadav (70%)",
            "Bipin Bihari (30%)"
        ],
        "district": "Muzaffarpur",
        "location": "Muzaffarpur, Bihar",
        "desc": "Digital skill certification, background check, and job discovery engine for informal daily-wage and trade technicians.",
        "color": "#1E3A8A",
        "metric": "₹25 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "25 Lakh",
        "fundingRemark": "Under Review",
        "regNoBihar": "SB2025010023",
        "dpiit": "Applied",
        "website": "https://www.rozgarmitra.in",
        "social": [
            "https://linkedin.com/company/rozgarmitra",
            "https://instagram.com/rozgarmitra"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Anirudh Banerjee",
        "complianceScore": 93
    },
    {
        "id": "ST-024",
        "name": "BharatSound",
        "legalName": "DesiTech Electronics Pvt Ltd",
        "brandName": "BharatSound",
        "initial": "B",
        "logo": "",
        "sector": "Consumer Electronics",
        "sectorShort": "Consumer Electronics",
        "sectorFull": "Consumer Electronics / Consumer Durables & Electronics",
        "stage": "Revenue Stage",
        "stageRaw": "Early Stage",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Megha Rani",
        "coFounders": [
            "Megha Rani (70%)",
            "Kunal Kishore (30%)"
        ],
        "district": "Bhagalpur",
        "location": "Bhagalpur, Bihar",
        "desc": "BLDC ceiling fans and smart surge-protected LED lighting fixtures built for fluctuating power grid conditions.",
        "color": "#1E3A8A",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Shortlisted",
        "regNoBihar": "SB2025010024",
        "dpiit": "DIPP150024",
        "website": "https://www.bharatsound.in",
        "social": [
            "https://linkedin.com/company/bharatsound",
            "https://instagram.com/bharatsound"
        ],
        "year": 2024,
        "assignedMentor": "Harishankar Pandey",
        "complianceScore": 94
    },
    {
        "id": "ST-025",
        "name": "KhelArena",
        "legalName": "KhelAdda Esports Pvt Ltd",
        "brandName": "KhelArena",
        "initial": "K",
        "logo": "",
        "sector": "Gaming & Esports",
        "sectorShort": "Gaming",
        "sectorFull": "Gaming & Esports / Gaming & Esports",
        "stage": "Scaling",
        "stageRaw": "Scale",
        "incubationStage": "Acceleration",
        "status": "Active",
        "founder": "Gaurav Ranjan",
        "coFounders": [
            "Gaurav Ranjan (70%)",
            "Sonalika Singh (30%)"
        ],
        "district": "Darbhanga",
        "location": "Darbhanga, Bihar",
        "desc": "Tournament hosting and team community platform for mobile gamers in tier-2/3 towns with instant UPI prize disbursements.",
        "color": "#1E3A8A",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Not Applied Yet",
        "regNoBihar": "SB2025010025",
        "dpiit": "Applied",
        "website": "https://www.khelarena.in",
        "social": [
            "https://linkedin.com/company/khelarena",
            "https://instagram.com/khelarena"
        ],
        "year": 2024,
        "assignedMentor": "Siddhartha Mukherjee",
        "complianceScore": 95
    },
    {
        "id": "ST-026",
        "name": "GharShobha",
        "legalName": "NirmanKala Spatial Tech Pvt Ltd",
        "brandName": "GharShobha",
        "initial": "G",
        "logo": "",
        "sector": "Interior & ConTech",
        "sectorShort": "Interior",
        "sectorFull": "Interior & ConTech / ConTech & Interior Design",
        "stage": "Idea Stage",
        "stageRaw": "Ideation",
        "incubationStage": "Pre-Incubation",
        "status": "Active",
        "founder": "Shalini Devi",
        "coFounders": [
            "Shalini Devi (70%)",
            "Aditya Kashyap (30%)"
        ],
        "district": "Purnia",
        "location": "Purnia, Bihar",
        "desc": "AR-driven web tool allowing homeowners to visualize modular kitchens and custom furniture with live bill of materials.",
        "color": "#1E3A8A",
        "metric": "₹10 Lakh",
        "metricLabel": "Startup Bihar Status",
        "funding": "10 Lakh",
        "fundingRemark": "FUNDED",
        "regNoBihar": "SB2025010026",
        "dpiit": "DIPP150026",
        "website": "https://www.gharshobha.in",
        "social": [
            "https://linkedin.com/company/gharshobha",
            "https://instagram.com/gharshobha"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Suniti Kumari",
        "complianceScore": 96
    },
    {
        "id": "ST-027",
        "name": "EcoDhaaga",
        "legalName": "ReshamGram Sustainable Apparels Pvt Ltd",
        "brandName": "EcoDhaaga",
        "initial": "E",
        "logo": "",
        "sector": "Textile & Apparel",
        "sectorShort": "Textile",
        "sectorFull": "Textile & Apparel / Textile & Sustainable Fashion",
        "stage": "Pre-Revenue",
        "stageRaw": "Prototype",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Naveen Shekhar",
        "coFounders": [
            "Naveen Shekhar (70%)",
            "Rahul Tripathy (30%)"
        ],
        "district": "Begusarai",
        "location": "Begusarai, Bihar",
        "desc": "Everyday breathable ethnic and fusion apparel crafted from organically grown desi cotton and natural dyes.",
        "color": "#1E3A8A",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010027",
        "dpiit": "Applied",
        "website": "https://www.ecodhaaga.in",
        "social": [
            "https://linkedin.com/company/ecodhaaga",
            "https://instagram.com/ecodhaaga"
        ],
        "year": 2024,
        "assignedMentor": "Amitabh Khare",
        "complianceScore": 97
    },
    {
        "id": "ST-028",
        "name": "JalMatsya",
        "legalName": "MatsyaVigyan Tech Pvt Ltd",
        "brandName": "JalMatsya",
        "initial": "J",
        "logo": "",
        "sector": "AquaCulture",
        "sectorShort": "AquaCulture",
        "sectorFull": "AquaCulture / AquaCulture Tech & Fisheries",
        "stage": "Pre-Revenue",
        "stageRaw": "MVP",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Kavita Kumari",
        "coFounders": [
            "Kavita Kumari (70%)",
            "Monika Sharma (30%)"
        ],
        "district": "Samastipur",
        "location": "Samastipur, Bihar",
        "desc": "Floating solar-powered water aerators equipped with dissolved oxygen sensors and automated mobile alerts.",
        "color": "#1E3A8A",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010028",
        "dpiit": "DIPP150028",
        "website": "https://www.jalmatsya.in",
        "social": [
            "https://linkedin.com/company/jalmatsya",
            "https://instagram.com/jalmatsya"
        ],
        "year": 2024,
        "assignedMentor": "Tanvi Sharma",
        "complianceScore": 98
    },
    {
        "id": "ST-029",
        "name": "JanSeva",
        "legalName": "JanSetu Digital Governance Pvt Ltd",
        "brandName": "JanSeva",
        "initial": "J",
        "logo": "",
        "sector": "GovTech & Civic",
        "sectorShort": "GovTech",
        "sectorFull": "GovTech & Civic / GovTech & Public Administration",
        "stage": "Revenue Stage",
        "stageRaw": "Early Stage",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Rahul Tripathy",
        "coFounders": [
            "Rahul Tripathy (70%)",
            "Nandini Jha (30%)"
        ],
        "district": "Madhubani",
        "location": "Madhubani, Bihar",
        "desc": "Multi-channel AI grievance recording and automated ticket routing workflow system for local municipal corporations.",
        "color": "#1E3A8A",
        "metric": "₹25 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "25 Lakh",
        "fundingRemark": "Shortlisted",
        "regNoBihar": "SB2025010029",
        "dpiit": "Applied",
        "website": "https://www.janseva.in",
        "social": [
            "https://linkedin.com/company/janseva",
            "https://instagram.com/janseva"
        ],
        "year": 2024,
        "assignedMentor": "Naveen Chandran",
        "complianceScore": 99
    },
    {
        "id": "ST-030",
        "name": "GramSafar",
        "legalName": "GramDarshan Experiential Tours Pvt Ltd",
        "brandName": "GramSafar",
        "initial": "G",
        "logo": "",
        "sector": "Travel & Tourism",
        "sectorShort": "Travel",
        "sectorFull": "Travel & Tourism / TravelTech & Experiential Tourism",
        "stage": "Scaling",
        "stageRaw": "Scale",
        "incubationStage": "Acceleration",
        "status": "Active",
        "founder": "Archana Prasad",
        "coFounders": [
            "Archana Prasad (70%)",
            "Abhishek Pandey (30%)"
        ],
        "district": "Bhojpur",
        "location": "Bhojpur, Bihar",
        "desc": "Village tourism discovery platform providing curated historical circuits, homestays, and local folk experiences.",
        "color": "#1E3A8A",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Not Applied Yet",
        "regNoBihar": "SB2025010030",
        "dpiit": "DIPP150030",
        "website": "https://www.gramsafar.in",
        "social": [
            "https://linkedin.com/company/gramsafar",
            "https://instagram.com/gramsafar"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Smriti Rekha Das",
        "complianceScore": 90
    },
    {
        "id": "ST-031",
        "name": "GaadiFix",
        "legalName": "MecanoFast Auto Services Pvt Ltd",
        "brandName": "GaadiFix",
        "initial": "G",
        "logo": "",
        "sector": "Automotive Aftermarket",
        "sectorShort": "Automotive Aftermarket",
        "sectorFull": "Automotive Aftermarket / Automotive Aftermarket & Service",
        "stage": "Idea Stage",
        "stageRaw": "Ideation",
        "incubationStage": "Pre-Incubation",
        "status": "Active",
        "founder": "Chandan Roy",
        "coFounders": [
            "Chandan Roy (70%)",
            "Sneha Singh (30%)"
        ],
        "district": "Saran",
        "location": "Saran, Bihar",
        "desc": "Doorstep two-wheeler and four-wheeler regular maintenance, roadside assistance, and battery replacement vans.",
        "color": "#1E3A8A",
        "metric": "₹4 Lakh",
        "metricLabel": "Startup Bihar Status",
        "funding": "4 Lakh",
        "fundingRemark": "FUNDED",
        "regNoBihar": "SB2025010031",
        "dpiit": "Applied",
        "website": "https://www.gaadifix.in",
        "social": [
            "https://linkedin.com/company/gaadifix",
            "https://instagram.com/gaadifix"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Arvind Swaminathan",
        "complianceScore": 91
    },
    {
        "id": "ST-032",
        "name": "Samarthya",
        "legalName": "DivyangShakti Innovations Pvt Ltd",
        "brandName": "Samarthya",
        "initial": "S",
        "logo": "",
        "sector": "Social Impact",
        "sectorShort": "Social Impact",
        "sectorFull": "Social Impact / Assistive Tech & Social Enterprise",
        "stage": "Pre-Revenue",
        "stageRaw": "Prototype",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Sonalika Singh",
        "coFounders": [
            "Sonalika Singh (70%)",
            "Pratibha Ranjan (30%)"
        ],
        "district": "Rohtas",
        "location": "Rohtas, Bihar",
        "desc": "3D-printed modular limb prosthetics and braille tablet overlays manufactured at low cost for rural clinics.",
        "color": "#1E3A8A",
        "metric": "₹10 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "10 Lakh",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010032",
        "dpiit": "DIPP150032",
        "website": "https://www.samarthya.in",
        "social": [
            "https://linkedin.com/company/samarthya",
            "https://instagram.com/samarthya"
        ],
        "year": 2024,
        "assignedMentor": "Meera Venkatraman",
        "complianceScore": 92
    },
    {
        "id": "ST-033",
        "name": "BhashaSetu",
        "legalName": "BhashaAI Intelligence Pvt Ltd",
        "brandName": "BhashaSetu",
        "initial": "B",
        "logo": "",
        "sector": "DeepTech & AI",
        "sectorShort": "DeepTech",
        "sectorFull": "DeepTech & AI / DeepTech & Speech AI",
        "stage": "Pre-Revenue",
        "stageRaw": "MVP",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Harsh Vardhan",
        "coFounders": [
            "Harsh Vardhan (70%)",
            "Vivek Anand (30%)"
        ],
        "district": "Vaishali",
        "location": "Vaishali, Bihar",
        "desc": "Speech-to-text API engine trained on regional dialects (Maithili, Bhojpuri, Magahi) for IVR and voice bots.",
        "color": "#1E3A8A",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010033",
        "dpiit": "Applied",
        "website": "https://www.bhashasetu.in",
        "social": [
            "https://linkedin.com/company/bhashasetu",
            "https://instagram.com/bhashasetu"
        ],
        "year": 2024,
        "assignedMentor": "Prof. (Dr.) Rajeshwar Sen",
        "complianceScore": 93
    },
    {
        "id": "ST-034",
        "name": "BhojPack",
        "legalName": "HaritPack Eco Industries Pvt Ltd",
        "brandName": "BhojPack",
        "initial": "B",
        "logo": "",
        "sector": "Packaging & Logistics",
        "sectorShort": "Packaging",
        "sectorFull": "Packaging & Logistics / Sustainable Packaging",
        "stage": "Revenue Stage",
        "stageRaw": "Early Stage",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Rashmi Sen",
        "coFounders": [
            "Rashmi Sen (70%)",
            "Sunita Murmu (30%)"
        ],
        "district": "Saharsa",
        "location": "Saharsa, Bihar",
        "desc": "Waterproof and heat-resistant takeaway containers and cushioning trays molded from bagasse and paddy straw.",
        "color": "#B45309",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010034",
        "dpiit": "DIPP150034",
        "website": "https://www.bhojpack.in",
        "social": [
            "https://linkedin.com/company/bhojpack",
            "https://instagram.com/bhojpack"
        ],
        "year": 2024,
        "assignedMentor": "Adv. Sunita Singhania",
        "complianceScore": 94
    },
    {
        "id": "ST-035",
        "name": "KleenPro",
        "legalName": "KleenPro Enterprise Services Pvt Ltd",
        "brandName": "KleenPro",
        "initial": "K",
        "logo": "",
        "sector": "Facility Management",
        "sectorShort": "Facility Management",
        "sectorFull": "Facility Management / Facility Management & Services",
        "stage": "Scaling",
        "stageRaw": "Scale",
        "incubationStage": "Acceleration",
        "status": "Active",
        "founder": "Rajeshwar Jha",
        "coFounders": [
            "Rajeshwar Jha (70%)",
            "Vikram Aditya (30%)"
        ],
        "district": "Katihar",
        "location": "Katihar, Bihar",
        "desc": "B2B facility management platform tracking housekeeping staff, consumables inventory, and sanitization audits.",
        "color": "#1E3A8A",
        "metric": "₹25 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "25 Lakh",
        "fundingRemark": "Not Applied Yet",
        "regNoBihar": "SB2025010035",
        "dpiit": "Applied",
        "website": "https://www.kleenpro.in",
        "social": [
            "https://linkedin.com/company/kleenpro",
            "https://instagram.com/kleenpro"
        ],
        "year": 2024,
        "assignedMentor": "Vikramaditya Roy",
        "complianceScore": 95
    },
    {
        "id": "ST-036",
        "name": "DukanApp",
        "legalName": "DukanKhata Digital Pvt Ltd",
        "brandName": "DukanApp",
        "initial": "D",
        "logo": "",
        "sector": "RetailTech & POS",
        "sectorShort": "RetailTech",
        "sectorFull": "RetailTech & POS / RetailTech & FinTech",
        "stage": "Idea Stage",
        "stageRaw": "Ideation",
        "incubationStage": "Pre-Incubation",
        "status": "Active",
        "founder": "Monika Sharma",
        "coFounders": [
            "Monika Sharma (70%)",
            "Simran Kaur (30%)"
        ],
        "district": "Nalanda",
        "location": "Nalanda, Bihar",
        "desc": "Handheld barcode POS terminal supporting offline digital ledger, GST billing, and supplier credit tracking.",
        "color": "#00838F",
        "metric": "₹4 Lakh",
        "metricLabel": "Startup Bihar Status",
        "funding": "4 Lakh",
        "fundingRemark": "FUNDED",
        "regNoBihar": "SB2025010036",
        "dpiit": "DIPP150036",
        "website": "https://www.dukanapp.in",
        "social": [
            "https://linkedin.com/company/dukanapp",
            "https://instagram.com/dukanapp"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Nandini Parikh",
        "complianceScore": 96
    },
    {
        "id": "ST-037",
        "name": "AmritDhara",
        "legalName": "ShuddhJal Innovations Pvt Ltd",
        "brandName": "AmritDhara",
        "initial": "A",
        "logo": "",
        "sector": "WaterTech",
        "sectorShort": "WaterTech",
        "sectorFull": "WaterTech / WaterTech & Cleantech",
        "stage": "Pre-Revenue",
        "stageRaw": "Prototype",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Vivek Anand",
        "coFounders": [
            "Vivek Anand (70%)",
            "Shalini Devi (30%)"
        ],
        "district": "Siwan",
        "location": "Siwan, Bihar",
        "desc": "Low-pressure membrane purification plants removing arsenic and iron from groundwater without grid electricity.",
        "color": "#0D9488",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010037",
        "dpiit": "Applied",
        "website": "https://www.amritdhara.in",
        "social": [
            "https://linkedin.com/company/amritdhara",
            "https://instagram.com/amritdhara"
        ],
        "year": 2024,
        "assignedMentor": "Kunal Bhasin",
        "complianceScore": 97
    },
    {
        "id": "ST-038",
        "name": "TrinetraEye",
        "legalName": "Trinetra Defense Tech Pvt Ltd",
        "brandName": "TrinetraEye",
        "initial": "T",
        "logo": "",
        "sector": "Defence & Security",
        "sectorShort": "Defence",
        "sectorFull": "Defence & Security / DefenceTech & AI Hardware",
        "stage": "Pre-Revenue",
        "stageRaw": "MVP",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Simran Kaur",
        "coFounders": [
            "Simran Kaur (70%)",
            "Rahul Tripathy (30%)"
        ],
        "district": "Buxar",
        "location": "Buxar, Bihar",
        "desc": "Thermal-optical security cameras with edge-AI anomaly recognition for industrial yards and perimeter fences.",
        "color": "#1E3A8A",
        "metric": "₹10 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "10 Lakh",
        "fundingRemark": "Under Review",
        "regNoBihar": "SB2025010038",
        "dpiit": "DIPP150038",
        "website": "https://www.trinetraeye.in",
        "social": [
            "https://linkedin.com/company/trinetraeye",
            "https://instagram.com/trinetraeye"
        ],
        "year": 2024,
        "assignedMentor": "Shweta Kulkarni",
        "complianceScore": 98
    },
    {
        "id": "ST-039",
        "name": "SmartDarzi",
        "legalName": "DarziOnline Fashion Solutions Pvt Ltd",
        "brandName": "SmartDarzi",
        "initial": "S",
        "logo": "",
        "sector": "FashionTech",
        "sectorShort": "FashionTech",
        "sectorFull": "FashionTech / FashionTech & Custom Apparel",
        "stage": "Revenue Stage",
        "stageRaw": "Early Stage",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Dharmendra Sah",
        "coFounders": [
            "Dharmendra Sah (70%)",
            "Kunal Kishore (30%)"
        ],
        "district": "West Champaran",
        "location": "West Champaran, Bihar",
        "desc": "Single-photo body measurement scanning app delivering custom-stitched garments straight from local boutique tailors.",
        "color": "#1E3A8A",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010039",
        "dpiit": "Applied",
        "website": "https://www.smartdarzi.in",
        "social": [
            "https://linkedin.com/company/smartdarzi",
            "https://instagram.com/smartdarzi"
        ],
        "year": 2024,
        "assignedMentor": "Anil Kumar Srivastava",
        "complianceScore": 99
    },
    {
        "id": "ST-040",
        "name": "PranMeter",
        "legalName": "PranVitals Healthcare Pvt Ltd",
        "brandName": "PranMeter",
        "initial": "P",
        "logo": "",
        "sector": "MedTech Hardware",
        "sectorShort": "MedTech Hardware",
        "sectorFull": "MedTech Hardware / MedTech & Diagnostic Devices",
        "stage": "Scaling",
        "stageRaw": "Scale",
        "incubationStage": "Acceleration",
        "status": "Active",
        "founder": "Sunita Murmu",
        "coFounders": [
            "Sunita Murmu (70%)",
            "Shreya Sinha (30%)"
        ],
        "district": "East Champaran",
        "location": "East Champaran, Bihar",
        "desc": "Pocket-sized smartphone-linked 12-lead ECG monitor enabling instant cloud AI arrhythmia screening in field camps.",
        "color": "#1565C0",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010040",
        "dpiit": "DIPP150040",
        "website": "https://www.pranmeter.in",
        "social": [
            "https://linkedin.com/company/pranmeter",
            "https://instagram.com/pranmeter"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Prachi Bhattacharya",
        "complianceScore": 90
    },
    {
        "id": "ST-041",
        "name": "PharmaDrop",
        "legalName": "SheetalPharma Logistics Pvt Ltd",
        "brandName": "PharmaDrop",
        "initial": "P",
        "logo": "",
        "sector": "Pharma Supply Chain",
        "sectorShort": "Pharma Supply Chain",
        "sectorFull": "Pharma Supply Chain / Cold Chain & Pharma Logistics",
        "stage": "Idea Stage",
        "stageRaw": "Ideation",
        "incubationStage": "Pre-Incubation",
        "status": "Active",
        "founder": "Ashutosh Ojha",
        "coFounders": [
            "Ashutosh Ojha (70%)",
            "Harsh Vardhan (30%)"
        ],
        "district": "Patna",
        "location": "Patna, Bihar",
        "desc": "Smart phase-change material cooler boxes maintaining 2-8°C with continuous temperature logging and GPS tracking.",
        "color": "#B45309",
        "metric": "₹25 Lakh",
        "metricLabel": "Startup Bihar Status",
        "funding": "25 Lakh",
        "fundingRemark": "FUNDED",
        "regNoBihar": "SB2025010041",
        "dpiit": "Applied",
        "website": "https://www.pharmadrop.in",
        "social": [
            "https://linkedin.com/company/pharmadrop",
            "https://instagram.com/pharmadrop"
        ],
        "year": 2024,
        "assignedMentor": "Ramanathan Iyer",
        "complianceScore": 91
    },
    {
        "id": "ST-042",
        "name": "EcoGems",
        "legalName": "RatnaShree Solitaires Pvt Ltd",
        "brandName": "EcoGems",
        "initial": "E",
        "logo": "",
        "sector": "Jewellery & Luxury",
        "sectorShort": "Jewellery",
        "sectorFull": "Jewellery & Luxury / Gems & Sustainable Luxury",
        "stage": "Pre-Revenue",
        "stageRaw": "Prototype",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Aarti Kumari",
        "coFounders": [
            "Aarti Kumari (70%)",
            "Pallavi Thakur (30%)"
        ],
        "district": "Gaya",
        "location": "Gaya, Bihar",
        "desc": "Ethically created CVD diamonds and bespoke bridal jewellery with blockchain authenticity and IGI certificates.",
        "color": "#1E3A8A",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010042",
        "dpiit": "DIPP150042",
        "website": "https://www.ecogems.in",
        "social": [
            "https://linkedin.com/company/ecogems",
            "https://instagram.com/ecogems"
        ],
        "year": 2024,
        "assignedMentor": "Priyanka Deshmukh",
        "complianceScore": 92
    },
    {
        "id": "ST-043",
        "name": "GaganDoot",
        "legalName": "GaganSetu Aerospace Pvt Ltd",
        "brandName": "GaganDoot",
        "initial": "G",
        "logo": "",
        "sector": "Aviation & Aerospace",
        "sectorShort": "Aviation",
        "sectorFull": "Aviation & Aerospace / Aerospace & UAV Engineering",
        "stage": "Pre-Revenue",
        "stageRaw": "MVP",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Satish Chandra",
        "coFounders": [
            "Satish Chandra (70%)",
            "Rahul Tripathy (30%)"
        ],
        "district": "Muzaffarpur",
        "location": "Muzaffarpur, Bihar",
        "desc": "Modular test equipment and sub-assembly mounts for small UAVs and atmospheric research micro-rockets.",
        "color": "#1E3A8A",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Under Review",
        "regNoBihar": "SB2025010043",
        "dpiit": "Applied",
        "website": "https://www.gagandoot.in",
        "social": [
            "https://linkedin.com/company/gagandoot",
            "https://instagram.com/gagandoot"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Tariq Manzoor",
        "complianceScore": 93
    },
    {
        "id": "ST-044",
        "name": "UtsavManch",
        "legalName": "UtsavManch Events Pvt Ltd",
        "brandName": "UtsavManch",
        "initial": "U",
        "logo": "",
        "sector": "Entertainment & EventTech",
        "sectorShort": "Entertainment",
        "sectorFull": "Entertainment & EventTech / EventTech & Entertainment",
        "stage": "Revenue Stage",
        "stageRaw": "Early Stage",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Pratibha Ranjan",
        "coFounders": [
            "Pratibha Ranjan (70%)",
            "Kameshwar Nath (30%)"
        ],
        "district": "Bhagalpur",
        "location": "Bhagalpur, Bihar",
        "desc": "Standardized booking portal connecting wedding planners with verified folk bands, caterers, and lighting crews.",
        "color": "#1E3A8A",
        "metric": "₹10 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "10 Lakh",
        "fundingRemark": "Shortlisted",
        "regNoBihar": "SB2025010044",
        "dpiit": "DIPP150044",
        "website": "https://www.utsavmanch.in",
        "social": [
            "https://linkedin.com/company/utsavmanch",
            "https://instagram.com/utsavmanch"
        ],
        "year": 2024,
        "assignedMentor": "Siddharth Chawla",
        "complianceScore": 94
    },
    {
        "id": "ST-045",
        "name": "PetMitra",
        "legalName": "PashuSeva HealthTech Pvt Ltd",
        "brandName": "PetMitra",
        "initial": "P",
        "logo": "",
        "sector": "Pet Care & VetTech",
        "sectorShort": "Pet Care",
        "sectorFull": "Pet Care & VetTech / VetTech & Pet Services",
        "stage": "Scaling",
        "stageRaw": "Scale",
        "incubationStage": "Acceleration",
        "status": "Active",
        "founder": "Bipin Bihari",
        "coFounders": [
            "Bipin Bihari (70%)",
            "Vikram Aditya (30%)"
        ],
        "district": "Darbhanga",
        "location": "Darbhanga, Bihar",
        "desc": "Remote veterinary video consults, prescription fulfillment, and balanced regional feed formulations for pets and livestock.",
        "color": "#1E3A8A",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010045",
        "dpiit": "Applied",
        "website": "https://www.petmitra.in",
        "social": [
            "https://linkedin.com/company/petmitra",
            "https://instagram.com/petmitra"
        ],
        "year": 2024,
        "assignedMentor": "Ananya Mukherjee",
        "complianceScore": 95
    },
    {
        "id": "ST-046",
        "name": "UrjaOptima",
        "legalName": "ShaktiGrid Power Systems Pvt Ltd",
        "brandName": "UrjaOptima",
        "initial": "U",
        "logo": "",
        "sector": "Energy Efficiency",
        "sectorShort": "Energy Efficiency",
        "sectorFull": "Energy Efficiency / Electrical & Industrial IoT",
        "stage": "Idea Stage",
        "stageRaw": "Ideation",
        "incubationStage": "Pre-Incubation",
        "status": "Active",
        "founder": "Preeti Paswan",
        "coFounders": [
            "Preeti Paswan (70%)",
            "Nandini Jha (30%)"
        ],
        "district": "Purnia",
        "location": "Purnia, Bihar",
        "desc": "Microcontroller-based APFC panels minimizing reactive power penalties for rice mills and manufacturing plants.",
        "color": "#1E3A8A",
        "metric": "Applied",
        "metricLabel": "Grant / Funding",
        "funding": "None",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010046",
        "dpiit": "DIPP150046",
        "website": "https://www.urjaoptima.in",
        "social": [
            "https://linkedin.com/company/urjaoptima",
            "https://instagram.com/urjaoptima"
        ],
        "year": 2024,
        "assignedMentor": "Rajiv Nambiar",
        "complianceScore": 96
    },
    {
        "id": "ST-047",
        "name": "ArogyaVriddh",
        "legalName": "VridhSeva Care Network Pvt Ltd",
        "brandName": "ArogyaVriddh",
        "initial": "A",
        "logo": "",
        "sector": "Elder Care",
        "sectorShort": "Elder Care",
        "sectorFull": "Elder Care / ElderCare & Health Support",
        "stage": "Pre-Revenue",
        "stageRaw": "Prototype",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Kameshwar Nath",
        "coFounders": [
            "Kameshwar Nath (70%)",
            "Megha Rani (30%)"
        ],
        "district": "Begusarai",
        "location": "Begusarai, Bihar",
        "desc": "Subscription-based emergency SOS response, weekly geriatric attendant visits, and doorstep medicine management.",
        "color": "#1E3A8A",
        "metric": "₹25 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "25 Lakh",
        "fundingRemark": "Applied",
        "regNoBihar": "SB2025010047",
        "dpiit": "Applied",
        "website": "https://www.arogyavriddh.in",
        "social": [
            "https://linkedin.com/company/arogyavriddh",
            "https://instagram.com/arogyavriddh"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Bhupendra Nath Verma",
        "complianceScore": 97
    },
    {
        "id": "ST-048",
        "name": "GreenRoof",
        "legalName": "ChattParKheti Agri Solutions Pvt Ltd",
        "brandName": "GreenRoof",
        "initial": "G",
        "logo": "",
        "sector": "Urban Farming",
        "sectorShort": "Urban Farming",
        "sectorFull": "Urban Farming / Urban Farming & AgriTech",
        "stage": "Pre-Revenue",
        "stageRaw": "MVP",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Anjali Sahu",
        "coFounders": [
            "Anjali Sahu (70%)",
            "Naveen Shekhar (30%)"
        ],
        "district": "Samastipur",
        "location": "Samastipur, Bihar",
        "desc": "Plug-and-play vertical NFT hydroponic towers for pesticide-free leafy greens cultivation in urban residences.",
        "color": "#2E7D32",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Under Review",
        "regNoBihar": "SB2025010048",
        "dpiit": "DIPP150048",
        "website": "https://www.greenroof.in",
        "social": [
            "https://linkedin.com/company/greenroof",
            "https://instagram.com/greenroof"
        ],
        "year": 2024,
        "assignedMentor": "Deepika Tandon",
        "complianceScore": 98
    },
    {
        "id": "ST-049",
        "name": "SukoonApp",
        "legalName": "ManAShanti HealthTech Pvt Ltd",
        "brandName": "SukoonApp",
        "initial": "S",
        "logo": "",
        "sector": "Mental Wellness",
        "sectorShort": "Mental Wellness",
        "sectorFull": "Mental Wellness / Mental Health & Wellness",
        "stage": "Revenue Stage",
        "stageRaw": "Early Stage",
        "incubationStage": "Incubation",
        "status": "Active",
        "founder": "Tarun Agrawal",
        "coFounders": [
            "Tarun Agrawal (70%)",
            "Harsh Vardhan (30%)"
        ],
        "district": "Madhubani",
        "location": "Madhubani, Bihar",
        "desc": "Confidential vernacular audio-therapy sessions, stress-tracking diaries, and licensed counselor appointments.",
        "color": "#1E3A8A",
        "metric": "₹4 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "4 Lakh",
        "fundingRemark": "Shortlisted",
        "regNoBihar": "SB2025010049",
        "dpiit": "Applied",
        "website": "https://www.sukoonapp.in",
        "social": [
            "https://linkedin.com/company/sukoonapp",
            "https://instagram.com/sukoonapp"
        ],
        "year": 2024,
        "assignedMentor": "Suresh Chandra Mohapatra",
        "complianceScore": 99
    },
    {
        "id": "ST-050",
        "name": "GauCraft",
        "legalName": "GauKagaz Eco Products Pvt Ltd",
        "brandName": "GauCraft",
        "initial": "G",
        "logo": "",
        "sector": "Paper & Stationery",
        "sectorShort": "Paper",
        "sectorFull": "Paper & Stationery / Eco-Craft & Sustainable Products",
        "stage": "Scaling",
        "stageRaw": "Scale",
        "incubationStage": "Acceleration",
        "status": "Active",
        "founder": "Rupali Verma",
        "coFounders": [
            "Rupali Verma (70%)",
            "Kunal Kishore (30%)"
        ],
        "district": "Bhojpur",
        "location": "Bhojpur, Bihar",
        "desc": "Acid-free archival paper sheets, gift bags, and notebooks handcrafted from organic cow dung and cotton rag fibers.",
        "color": "#1E3A8A",
        "metric": "₹10 Lakh",
        "metricLabel": "Grant / Funding",
        "funding": "10 Lakh",
        "fundingRemark": "Not Applied Yet",
        "regNoBihar": "SB2025010050",
        "dpiit": "DIPP150050",
        "website": "https://www.gaucraft.in",
        "social": [
            "https://linkedin.com/company/gaucraft",
            "https://instagram.com/gaucraft"
        ],
        "year": 2024,
        "assignedMentor": "Dr. Farhan Qureshi",
        "complianceScore": 90
    }
];

    // Seed Applications Queue (Incubation Admission & Support Track)
    const SEED_APPLICATIONS = [
        {
            id: 'APP-2026-089',
            startupName: 'Mithila Bio-Plastics',
            founderName: 'Ananya Jha',
            email: 'ananya@mithilabio.com',
            mobile: '9835012345',
            city: 'Darbhanga',
            state: 'Bihar',
            sector: 'CleanTech',
            stage: 'MVP / Prototype',
            incubationTrack: 'Incubation',
            facilitiesRequested: 'Bio-Polymer Testing Lab + 4 Co-working Desks',
            supportRequired: 'Prototyping Facility, Mentorship & Bihar Seed Grant (₹10L)',
            productDescription: 'Developing 100% biodegradable packaging film made from makhana (foxnut) and starch agricultural residue.',
            innovative: 'Zero micro-plastics, decomposes in 60 days, utilizes local agricultural crop waste creating rural livelihood.',
            status: 'Pending Manager Review', // 'Pending Manager Review' | 'Pending Director Approval' | 'Approved' | 'Rejected'
            submittedDate: '2026-08-28T10:30:00Z',
            managerScore: null,
            managerNotes: null,
            managerApprovedDate: null,
            directorNotes: null,
            directorApprovedDate: null,
            fundingRequired: '₹ 20,00,000',
            founderExperience: 'M.Tech Chemical Engineering (IIT Patna), 3 Years Research in Biopolymers',
            pitchDeckName: 'Mithila_BioPlastics_Deck_2026.pdf',
            type: 'Startup'
        },
        {
            id: 'APP-2026-090',
            startupName: 'Patna AgriDrone Hub',
            founderName: 'Vikramaditya Roy',
            email: 'vikram@agridronehub.in',
            mobile: '9128955512',
            city: 'Patna',
            state: 'Bihar',
            sector: 'AgriTech',
            stage: 'Revenue Stage',
            incubationTrack: 'Incubation',
            facilitiesRequested: 'Drone Assembly Bay + 6 Workstations + Ground Testing Field',
            supportRequired: 'DGCA Regulatory Advisory, Bihar Farmer Network Pilot & Pre-Series A Mentorship',
            productDescription: 'Drone-as-a-service for precision pesticide spraying and soil hyperspectral health mapping across 50,000 acres in North Bihar.',
            innovative: 'Reduces chemical runoff by 40% and lowers spraying cost by 60% compared to manual labor.',
            status: 'Pending Director Approval', // Already passed manager!
            submittedDate: '2026-08-20T14:15:00Z',
            managerScore: 88,
            managerNotes: 'High potential AgriTech project with proven field traction and DGCA certified pilots. Recommended for Level-2 seed incubation.',
            managerApprovedDate: '2026-08-24T11:00:00Z',
            directorNotes: null,
            directorApprovedDate: null,
            fundingRequired: '₹ 35,00,000',
            founderExperience: 'Ex-Tata Motors UAV Engineer + Agri Economics MBA',
            pitchDeckName: 'AgriDrone_Traction_Deck.pdf',
            type: 'Startup'
        },
        {
            id: 'APP-2026-091',
            startupName: 'FinSeva Rural MicroBank',
            founderName: 'Sanjay Prakash',
            email: 'sanjay@finseva.co',
            mobile: '9771122334',
            city: 'Muzaffarpur',
            state: 'Bihar',
            sector: 'FinTech',
            stage: 'Idea Stage',
            incubationTrack: 'Incubation',
            facilitiesRequested: 'FinTech Sandbox Server Access + 2 Hot Desks',
            supportRequired: 'Legal Entity Registration, RBI Compliance Mentorship & FinTech Cloud Credits',
            productDescription: 'Vernacular voice-assisted micro-credit assessment algorithm for women SHGs without traditional CIBIL scores.',
            innovative: 'Alternative psychometric and UPI transactional underwriting engine.',
            status: 'Pending Manager Review',
            submittedDate: '2026-08-30T09:00:00Z',
            managerScore: null,
            managerNotes: null,
            managerApprovedDate: null,
            directorNotes: null,
            directorApprovedDate: null,
            fundingRequired: '₹ 15,00,000',
            founderExperience: 'Former Branch Manager at Bandhan Bank',
            pitchDeckName: 'FinSeva_Whitepaper.pdf',
            type: 'Startup'
        },
        {
            id: 'APP-2026-092',
            startupName: 'EduSathi VR Classrooms',
            founderName: 'Megha Sharma',
            email: 'megha@edusathi.org',
            mobile: '9430188899',
            city: 'Gaya',
            state: 'Bihar',
            sector: 'EduTech',
            stage: 'MVP / Prototype',
            incubationTrack: 'Incubation',
            facilitiesRequested: '3D Content Studio + 4 Dedicated Desks',
            supportRequired: 'Govt School Pilot Permissions, Bihar Startup Grant (₹10L) & Pedagogy Mentorship',
            productDescription: 'Low-cost offline cardboard VR headsets with interactive 3D science labs for rural government school students.',
            innovative: 'Runs completely offline on low-end smartphones without internet requirement.',
            status: 'Pending Director Approval',
            submittedDate: '2026-08-22T16:40:00Z',
            managerScore: 92,
            managerNotes: 'Exceptional social impact. Already trialed in 12 schools in Gaya with 94% retention score. High priority for incubation & Bihar state grant.',
            managerApprovedDate: '2026-08-26T15:20:00Z',
            directorNotes: null,
            directorApprovedDate: null,
            fundingRequired: '₹ 25,00,000',
            founderExperience: 'B.Ed + Ex-Lead Instructional Designer at Byjus',
            pitchDeckName: 'EduSathi_Impact_Study.pdf',
            type: 'Startup'
        }
    ];

    // Seed Mentors Data
    const SEED_MENTORS = [
    {
        "id": "MENTOR-2026-001",
        "name": "Dr. Arvind Swaminathan",
        "title": "Professor of Practice, Indian Institute of Management (IIM) & Former Chief Strategy Officer, AgriNext Global",
        "organization": "Professor of Practice",
        "primaryDomain": "Agritech",
        "expertise": [
            "Agritech",
            "Supply Chain Management",
            "Rural Markets",
            "Farmer Producer Organizations (FPOs)"
        ],
        "experience": "22 Years",
        "qualification": "Ph.D. in Agribusiness Management (IARI), MBA (IIM Ahmedabad)",
        "location": "Patna / New Delhi",
        "mode": "Hybrid (Online & In-Person)",
        "email": "arvind.swaminathan@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/dr-arvind-swaminathan-agri",
        "bio": "Dr. Arvind Swaminathan is an acclaimed agribusiness strategist, academician, and ecosystem builder with over 22 years of rich multidisciplinary experience spanning corporate leadership, grassroots agricultural market research, and startup incubation. Having served as Chief Strategy Officer at AgriNext Global and Professor of Practice at premier business schools, Dr. Swaminathan has closely guided over 40 rural and agritech ventures from the ideation phase to national retail distribution. His core advisory expertise centers on building sustainable farm-to-fork supply chains, structuring Farmer Producer Organizations (FPOs) for commercial viability, optimizing post-harvest cold-chain logistics, and securing institutional grants from NABARD and DST. Renowned for his pragmatic, unit-economics-driven mentorship philosophy, he assists emerging founders in refining value propositions for Bharat-centric markets, de-risking pilot deployments, and establishing institutional procurement linkages with food processing conglomerates. In keynote masterclasses and one-to-one mentoring clinics, Dr. Swaminathan empowers entrepreneurs to construct resilient operational frameworks that balance financial sustainability with genuine grassroots socio-economic impact.",
        "status": "Active",
        "rating": 4.9,
        "totalHoursLogged": 24,
        "sessionsCount": 18,
        "image": "",
        "assignedStartups": [
            "KisanDost",
            "RakshaSec"
        ]
    },
    {
        "id": "MENTOR-2026-002",
        "name": "Meera Venkatraman",
        "title": "Managing Partner, Apex Capital Ventures & Ex-Director of FinTech Products, Paytm",
        "organization": "Managing Partner",
        "primaryDomain": "Fintech Infrastructure",
        "expertise": [
            "Fintech Infrastructure",
            "Lending Tech",
            "Micro-Credit Underwriting",
            "Regulatory Sandbox Compliance"
        ],
        "experience": "18 Years",
        "qualification": "M.S. in Computational Finance (Carnegie Mellon), B.Tech (IIT Madras)",
        "location": "Bengaluru / Virtual",
        "mode": "Online / Virtual",
        "email": "meera.venkat@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/meera-venkatraman-fintech",
        "bio": "Meera Venkatraman is a seasoned FinTech operator, venture investor, and regulatory strategist with 18 years of cross-functional experience across digital payments, credit orchestration, and alternative data underwriting. Prior to steering early-stage financial technology investments as Managing Partner at Apex Capital Ventures, she spearheaded key digital credit and merchant payment initiatives at Paytm and Axis Bank. Meera has advised dozens of high-growth FinTech and NBFC-collaborative startups on navigating RBI digital lending guidelines, structuring FLDG frameworks, designing compliant onboarding funnels, and optimizing user conversion economics. As an incubation mentor, she is widely celebrated for her hands-on approach toward product-market validation, institutional debt integration, and investor pitch architecture. Her mentoring sessions unpack the complexities of building scalable FinTech infrastructure in semi-urban and rural markets, enabling founding teams to engineer defensible unit economics, secure regulatory sandbox approvals, and position their metrics persuasively before institutional seed and Series-A venture capital firms.",
        "status": "Active",
        "rating": 5.0,
        "totalHoursLogged": 28,
        "sessionsCount": 21,
        "image": "",
        "assignedStartups": [
            "AuraScan",
            "BioKhet"
        ]
    },
    {
        "id": "MENTOR-2026-003",
        "name": "Prof. (Dr.) Rajeshwar Sen",
        "title": "Head of AI & Robotics Laboratory, Indian Institute of Information Technology (IIIT)",
        "organization": "Head of AI & Robotics Laboratory",
        "primaryDomain": "Artificial Intelligence",
        "expertise": [
            "Artificial Intelligence",
            "Edge Computing",
            "Computer Vision",
            "Autonomous Robotics",
            "DeepTech Architecture"
        ],
        "experience": "20 Years",
        "qualification": "Ph.D. in Robotics & AI (IISc Bangalore), M.Tech (IIT Kharagpur)",
        "location": "Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "rajeshwar.sen@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/prof-rajeshwar-sen-ai",
        "bio": "Prof. (Dr.) Rajeshwar Sen is a distinguished computer scientist, artificial intelligence researcher, and deeptech startup advisor with two decades of pioneering contributions in autonomous robotics, embedded edge AI, and computer vision systems. As the Head of the AI & Robotics Laboratory, Dr. Sen has authored more than 60 peer-reviewed journal papers and holds 7 registered patents in low-latency robotic vision and industrial automation controllers. In the startup incubation sphere, he serves as an invaluable technical mentor to founders developing physical hardware, IoT appliances, agricultural drones, and enterprise vision platforms. Dr. Sen guides founders through the rigorous journey of transitioning bench-scale university laboratory prototypes into robust, commercially deployable TRL-7 and TRL-8 industrial-grade hardware. His mentorship covers bill-of-materials (BOM) optimization, edge-model quantization, sensor fusion integration, and securing competitive deeptech grants under DST, MeitY, and BIRAC schemes, providing technical credibility and deep algorithmic differentiation.",
        "status": "Active",
        "rating": 4.8,
        "totalHoursLogged": 32,
        "sessionsCount": 24,
        "image": "",
        "assignedStartups": [
            "GyanSetu",
            "AtithiStay"
        ]
    },
    {
        "id": "MENTOR-2026-004",
        "name": "Adv. Sunita Singhania",
        "title": "Senior Partner, Singhania & Partners LLP & IPR Advisor to Ministry of MSME",
        "organization": "Senior Partner",
        "primaryDomain": "Intellectual Property Rights (IPR)",
        "expertise": [
            "Intellectual Property Rights (IPR)",
            "Patent Filing",
            "Corporate Governance",
            "Startup Compliance",
            "Term Sheets"
        ],
        "experience": "24 Years",
        "qualification": "LL.M. in Corporate Law & IPR (NLSIU Bangalore), B.A. LL.B. (Hons.)",
        "location": "New Delhi / Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "sunita.singhania@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/adv-sunita-singhania-ipr",
        "bio": "Advocate Sunita Singhania is an eminent legal luminary, corporate counsel, and registered patent attorney with over 24 years of specialized practice in intellectual property rights, venture structuring, corporate governance, and cross-border commercial transactions. Having advised hundreds of technology ventures, academic incubators, and Fortune 500 multinationals, Adv. Singhania serves as an accredited IPR facilitator under the Startup India mission. Her mentorship focuses on bulletproofing early-stage enterprises against cap-table dilution pitfalls, drafting equitable founders' agreements, executing airtight IP assignments, and registering domestic and international patents under the Patent Cooperation Treaty (PCT). Founders under her wing receive meticulous counsel on negotiating term sheets, structuring SAFE notes, maintaining statutory labor and tax compliances, and constructing defensible trademark portfolios. Known for demystifying legal jargon into actionable corporate strategies, Adv. Singhania ensures incubatee startups establish institutional-grade corporate hygiene from day zero, making them diligence-ready for institutional private equity and venture capital investors.",
        "status": "Active",
        "rating": 4.9,
        "totalHoursLogged": 36,
        "sessionsCount": 27,
        "image": "",
        "assignedStartups": [
            "MudrPay",
            "LokRang OTT"
        ]
    },
    {
        "id": "MENTOR-2026-005",
        "name": "Vikramaditya Roy",
        "title": "Former VP of Growth & Marketing, Zomato & Founder, ScaleCraft Growth Studio",
        "organization": "Former VP of Growth & Marketing",
        "primaryDomain": "Consumer Internet",
        "expertise": [
            "Consumer Internet",
            "D2C Branding",
            "Performance Marketing",
            "Customer Acquisition Cost (CAC) Optimization"
        ],
        "experience": "16 Years",
        "qualification": "MBA in Marketing (FMS Delhi), B.Com (Hons) (SRCC)",
        "location": "Gurugram / Virtual",
        "mode": "Online / Virtual",
        "email": "vikramaditya.roy@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/vikramaditya-roy-growth",
        "bio": "Vikramaditya Roy is a dynamic consumer tech growth practitioner, brand strategist, and angel investor with 16 years of hands-on experience scaling hyper-growth internet and direct-to-consumer (D2C) platforms. Having driven multi-million user acquisition campaigns as Vice President of Growth at Zomato and senior marketing lead at leading e-commerce marketplaces, Vikramaditya now mentors early and growth-stage ventures through ScaleCraft Growth Studio. His mentorship repertoire encompasses organic search engine optimization, paid viral funnels, hyper-targeted local storytelling, retention cohort analytics, and customer lifetime value (LTV) maximization. He excels in helping consumer startups in food processing, fashion, and retail services transition from localized pilot tests to national omnichannel presence. In his structured mentorship workshops, founders learn how to formulate data-backed consumer discovery loops, design high-converting packaging and digital landing pages, and maintain a disciplined marketing burn rate while building genuine brand recall and customer loyalty.",
        "status": "Active",
        "rating": 5.0,
        "totalHoursLogged": 40,
        "sessionsCount": 30,
        "image": "",
        "assignedStartups": [
            "CoolSun",
            "GauPure"
        ]
    },
    {
        "id": "MENTOR-2026-006",
        "name": "Dr. Nandini Parikh",
        "title": "Director of Innovation & Clinical Research, MedPulse Healthcare & Ex-Advisor, WHO India",
        "organization": "Director of Innovation & Clinical Research",
        "primaryDomain": "MedTech Devices",
        "expertise": [
            "MedTech Devices",
            "Digital Health",
            "Telemedicine Governance",
            "Clinical Trials & CDSCO Approvals"
        ],
        "experience": "21 Years",
        "qualification": "M.D. (AIIMS New Delhi), Master of Public Health (Johns Hopkins Bloomberg)",
        "location": "Mumbai / Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "nandini.parikh@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/dr-nandini-parikh-medtech",
        "bio": "Dr. Nandini Parikh is a distinguished physician-scientist, public health visionary, and medical technology commercialization expert with over 21 years of experience in healthcare delivery, clinical validation, and healthtech startup mentorship. With former advisory tenures at the World Health Organization (WHO) and leadership roles across leading hospital chains, Dr. Parikh bridges the critical gap between medical bedside reality and cutting-edge digital diagnostics. She has mentored over 25 healthtech and medical hardware startups, steering them through the rigorous landscape of CDSCO regulatory filings, clinical trial protocols, bio-ethics committee clearances, and HIPAA/ABDM digital health compliance. Her mentorship sessions focus on establishing measurable clinical efficacy, conducting authentic doctor-hospital pilot deployments, refining doctor onboarding workflows, and building distribution networks across tier-2 and tier-3 public and private hospital chains. Dr. Parikh guides entrepreneurs to build patient-centric, clinically defensible health innovations that survive rigorous medical scrutiny.",
        "status": "Active",
        "rating": 4.8,
        "totalHoursLogged": 44,
        "sessionsCount": 33,
        "image": "",
        "assignedStartups": [
            "MilletBhoj",
            "VedGlow"
        ]
    },
    {
        "id": "MENTOR-2026-007",
        "name": "Kunal Bhasin",
        "title": "Chief Technology Officer, CloudMatrix Global & Former Principal Architect, Microsoft",
        "organization": "Chief Technology Officer",
        "primaryDomain": "Enterprise SaaS Architecture",
        "expertise": [
            "Enterprise SaaS Architecture",
            "Cloud Infrastructure",
            "Scalability",
            "DevOps & Data Security"
        ],
        "experience": "19 Years",
        "qualification": "B.Tech & M.Tech in Computer Science (IIT Kanpur)",
        "location": "Hyderabad / Virtual",
        "mode": "Online / Virtual",
        "email": "kunal.bhasin@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/kunal-bhasin-saas-cloud",
        "bio": "Kunal Bhasin is a veteran software architect, enterprise infrastructure specialist, and technology executive with 19 years of expertise building high-concurrency cloud systems and scalable SaaS ecosystems. Following an illustrious career as Principal Software Architect at Microsoft and engineering leadership at enterprise tech firms, Kunal now serves as Chief Technology Officer at CloudMatrix Global. He mentors incubatee technical founders on transitioning MVPs into fault-tolerant, SOC-2 compliant, microservices-driven production systems capable of handling millions of daily transactions. His mentorship clinics cover technical debt mitigation, API economy integration, cost-efficient AWS/Azure cloud architecture, automated CI/CD deployment pipelines, and ISO 27001 cybersecurity frameworks. Kunal is particularly adept at counseling student and early-career founders on establishing rigorous engineering culture, managing engineering sprints, and architecting scalable backend systems without exceeding early-stage compute budgets.",
        "status": "Active",
        "rating": 4.9,
        "totalHoursLogged": 48,
        "sessionsCount": 36,
        "image": "",
        "assignedStartups": [
            "VakilOS",
            "RozgarMitra"
        ]
    },
    {
        "id": "MENTOR-2026-008",
        "name": "Shweta Kulkarni",
        "title": "Managing Director, Prerna Impact Angel Network & Former Chief Financial Officer, Tata Cleantech",
        "organization": "Managing Director",
        "primaryDomain": "Venture Fundraising",
        "expertise": [
            "Venture Fundraising",
            "Financial Modeling",
            "Cap Table Management",
            "Valuation & Due Diligence"
        ],
        "experience": "23 Years",
        "qualification": "Chartered Accountant (ICAI), MBA in Finance (SPJIMR Mumbai)",
        "location": "Mumbai / Virtual",
        "mode": "Hybrid (Online & In-Person)",
        "email": "shweta.kulkarni@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/shweta-kulkarni-angel-investor",
        "bio": "Shweta Kulkarni is a preeminent financial strategist, investment banker, and angel syndicate leader with 23 years of institutional finance experience spanning corporate financial planning, private equity structuring, and early-stage startup investment. Having previously served as Chief Financial Officer at Tata Cleantech Capital, Shweta currently heads the Prerna Impact Angel Network, focusing on capital deployment across regional climate-tech, clean energy, and social impact enterprises. Her incubation mentorship programs specialize in auditing early financial models, defining rigorous unit economics, forecasting working capital cycles, and preparing founders for institutional investor due diligence. Shweta works one-on-one with incubatees to structure balanced capitalization tables, design convertible equity rounds, and negotiate investor term sheets without relinquishing operational control. Her sharp commercial insights ensure that early-stage entrepreneurs construct transparent, audit-ready financial statements that build unwavering trust with angel networks, family offices, and venture capital funds.",
        "status": "Active",
        "rating": 5.0,
        "totalHoursLogged": 52,
        "sessionsCount": 39,
        "image": "",
        "assignedStartups": [
            "GramGati",
            "BharatSound"
        ]
    },
    {
        "id": "MENTOR-2026-009",
        "name": "Anil Kumar Srivastava",
        "title": "Former Chief General Manager, NABARD & Senior Advisor, Rural Enterprise Development",
        "organization": "Former Chief General Manager",
        "primaryDomain": "Rural Banking",
        "expertise": [
            "Rural Banking",
            "Priority Sector Lending",
            "Micro-Finance",
            "NABARD Subsidies",
            "Agribusiness DPRs"
        ],
        "experience": "32 Years",
        "qualification": "M.Sc. in Agriculture (BHU Varanasi), CAIIB (Indian Institute of Banking & Finance)",
        "location": "Patna",
        "mode": "In-Person / Physical Sessions",
        "email": "anil.srivastava@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/anil-srivastava-nabard",
        "bio": "Anil Kumar Srivastava brings an extraordinary 32-year legacy of leadership in developmental banking, agricultural credit infrastructure, and grassroots entrepreneurship, having served as Chief General Manager at the National Bank for Agriculture and Rural Development (NABARD). Throughout his distinguished career, Shri Srivastava designed and spearheaded large-scale rural livelihoods programs, self-help group microcredit linkages, and multi-crore infrastructure development funds across Eastern India. At the incubation center, he acts as the institutional cornerstone for startups navigating debt financing, capital subsidies, and government grant schemes. He provides comprehensive mentorship on formulating bankable Detailed Project Reports (DPRs), securing priority sector lending lines, aligning with Agriculture Infrastructure Fund (AIF) mechanisms, and partnering with commercial and regional rural banks. His deep grounding in governmental and banking machinery empowers agrarian and rural innovators to convert early prototypes into commercially bankable, state-supported enterprises.",
        "status": "Active",
        "rating": 4.8,
        "totalHoursLogged": 56,
        "sessionsCount": 42,
        "image": "",
        "assignedStartups": [
            "PunyaDhoop",
            "KhelArena"
        ]
    },
    {
        "id": "MENTOR-2026-010",
        "name": "Dr. Prachi Bhattacharya",
        "title": "Professor of Food Science & Technology, NIFTEM & Consultant, Food Processing Industries",
        "organization": "Professor of Food Science & Technology",
        "primaryDomain": "Food Processing Technologies",
        "expertise": [
            "Food Processing Technologies",
            "FSSAI Compliance",
            "Shelf-Life Extension",
            "Organic Certification"
        ],
        "experience": "17 Years",
        "qualification": "Ph.D. in Food Technology (CFTRI Mysore), M.Sc. in Biochemical Engineering",
        "location": "Patna / Sonipat",
        "mode": "Hybrid (Online & In-Person)",
        "email": "prachi.bhattacharya@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/dr-prachi-bhattacharya-foodtech",
        "bio": "Dr. Prachi Bhattacharya is a leading food technologist, organic product formulation scientist, and industrial processing consultant with 17 years of experience accelerating food innovation in India. Serving on advisory technical boards for national agricultural research bodies and food testing laboratories, Dr. Bhattacharya specializes in vacuum packaging, thermal processing, preservation of indigenous crops (makhana, sattu, millets), and food safety auditing. In her capacity as an incubation mentor, she has guided dozens of food processing and functional nutrition startups from initial kitchen-scale formulation to high-throughput commercial processing plants. Her mentorship covers FSSAI licensing and regulatory compliance, nutritional profiling, shelf-life testing protocols, HACCP-certified facility design, and organic GI-tag commercialization. Dr. Bhattacharya’s scientific rigor enables food entrepreneurs to retain nutritional integrity, optimize processing yields, and satisfy strict quality benchmarks required for nationwide modern trade supermarkets and global export markets.",
        "status": "Active",
        "rating": 4.9,
        "totalHoursLogged": 60,
        "sessionsCount": 45,
        "image": "",
        "assignedStartups": [
            "AgriHawk",
            "GharShobha"
        ]
    },
    {
        "id": "MENTOR-2026-011",
        "name": "Ramanathan Iyer",
        "title": "Supply Chain Director, BlueDart-DHL & Supply Chain Advisor to D2C Unicorns",
        "organization": "Supply Chain Director",
        "primaryDomain": "End-to-End Logistics",
        "expertise": [
            "End-to-End Logistics",
            "Cold Chain Distribution",
            "3PL/4PL Integration",
            "Warehousing Automation"
        ],
        "experience": "26 Years",
        "qualification": "Post Graduate in Supply Chain Management (NITIE Mumbai), B.E. (Mechanical)",
        "location": "Kolkata / Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "ramanathan.iyer@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/ramanathan-iyer-logistics",
        "bio": "Ramanathan Iyer is an accomplished supply chain architect and freight logistics authority with 26 years of operational leadership managing complex multi-modal transit networks across South Asia. Having directed extensive national logistics hubs at BlueDart-DHL and advised hyper-growth e-commerce and grocery delivery unicorns, Ramanathan brings world-class logistics discipline to emerging incubation ventures. His mentorship focuses on eliminating supply chain friction, negotiating competitive service-level agreements with 3PL/4PL providers, implementing warehouse management systems (WMS), and engineering route-optimized last-mile distribution networks in semi-urban geographies. For agricultural and perishable food ventures, he provides invaluable blueprints on establishing unbroken cold chains and minimizing transit spoilage. Known for his methodical approach to cost-per-delivery optimization and inventory turn acceleration, Ramanathan mentors founders to build dependable, agile supply chain architectures that underpin sustainable e-commerce and retail expansion.",
        "status": "Active",
        "rating": 5.0,
        "totalHoursLogged": 64,
        "sessionsCount": 48,
        "image": "",
        "assignedStartups": [
            "MithilaVastra",
            "EcoDhaaga"
        ]
    },
    {
        "id": "MENTOR-2026-012",
        "name": "Priyanka Deshmukh",
        "title": "Chief People Officer, TalentBridge Global & Ex-Head of HR, Flipkart Operations",
        "organization": "Chief People Officer",
        "primaryDomain": "Organizational Design",
        "expertise": [
            "Organizational Design",
            "Founder-to-Leader Transition",
            "ESOP Pool Structuring",
            "Performance Systems"
        ],
        "experience": "17 Years",
        "qualification": "MBA in Human Resources (XLRI Jamshedpur), B.A. in Psychology",
        "location": "Bengaluru / Virtual",
        "mode": "Online / Virtual",
        "email": "priyanka.deshmukh@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/priyanka-deshmukh-people-ops",
        "bio": "Priyanka Deshmukh is an esteemed human capital strategist, executive leadership coach, and organizational design expert with 17 years of experience building high-performing startup cultures. Having spearheaded large-scale talent acquisition and operational people management at Flipkart during its exponential scale-up phase, Priyanka now counsels startup founders on mastering the delicate transition from informal founding teams to structured, purpose-driven organizations. Her advisory repertoire includes designing equitable Employee Stock Ownership Plans (ESOPs), structuring performance-linked appraisal matrices, crafting competitive compensation benchmarks, and managing early co-founder alignment and conflict resolution. In her mentorship sessions with incubatees, Priyanka emphasizes the critical importance of psychological safety, values-aligned leadership, and early leadership hiring. She equips founding teams with the organizational blueprints needed to attract, inspire, and retain tier-one tech and business talent in competitive market environments.",
        "status": "Active",
        "rating": 4.8,
        "totalHoursLogged": 68,
        "sessionsCount": 51,
        "image": "",
        "assignedStartups": [
            "KamraKhoj",
            "JalMatsya"
        ]
    },
    {
        "id": "MENTOR-2026-013",
        "name": "Dr. Tariq Manzoor",
        "title": "Chief Medical Officer, TeleHealth India Network & Former Faculty, PGIMER Chandigarh",
        "organization": "Chief Medical Officer",
        "primaryDomain": "Telemedicine Systems",
        "expertise": [
            "Telemedicine Systems",
            "Hospital Information Systems (HIS)",
            "Health Data Governance",
            "Rural Clinics"
        ],
        "experience": "19 Years",
        "qualification": "M.D. in Internal Medicine (PGIMER), Fellowship in Digital Health (Harvard Medical)",
        "location": "Patna / Chandigarh",
        "mode": "Hybrid (Online & In-Person)",
        "email": "tariq.manzoor@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/dr-tariq-manzoor-digitalhealth",
        "bio": "Dr. Tariq Manzoor is a prominent clinician, digital healthcare pioneer, and telemedicine policy advocate with 19 years of dual expertise spanning clinical medical practice and health informatics engineering. As Chief Medical Officer at TeleHealth India Network and former faculty member at PGIMER Chandigarh, Dr. Manzoor has championed scalable rural telemedicine clinics, digital triage workflows, and remote diagnostic screening camps across underserved districts. In his role as incubation mentor, he guides healthtech entrepreneurs on designing intuitive doctor-facing electronic health record (EHR) systems, ensuring tele-consultation protocol adherence under National Medical Commission guidelines, and integrating Ayushman Bharat Digital Mission (ABDM) standards. Dr. Manzoor’s mentorship ensures startups validate their digital triage models against real clinical realities, bridge communication barriers between urban specialist doctors and rural patients, and establish credibility with healthcare practitioners and healthcare administrators.",
        "status": "Active",
        "rating": 4.9,
        "totalHoursLogged": 72,
        "sessionsCount": 54,
        "image": "",
        "assignedStartups": [
            "JalSmart",
            "JanSeva"
        ]
    },
    {
        "id": "MENTOR-2026-014",
        "name": "Siddharth Chawla",
        "title": "Partner, SeedSprout Capital & Former Investment Director, Sequoia India Surge",
        "organization": "Partner",
        "primaryDomain": "Early-Stage Venture Investing",
        "expertise": [
            "Early-Stage Venture Investing",
            "Pitch Deck Storytelling",
            "Unit Economics",
            "Investor Relations"
        ],
        "experience": "15 Years",
        "qualification": "MBA (INSEAD), B.Tech in Electronics (IIT Roorkee)",
        "location": "New Delhi / Virtual",
        "mode": "Hybrid (Online & In-Person)",
        "email": "siddharth.chawla@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/siddharth-chawla-venture-capital",
        "bio": "Siddharth Chawla is a seasoned venture capitalist, angel investor, and pitch storytelling mentor with 15 years of experience in early-stage institutional investing, deal sourcing, and portfolio management. Having participated in evaluating and backing over 60 early-stage ventures across South and Southeast Asia through institutional venture networks, Siddharth possesses a razor-sharp understanding of what institutional investors look for in seed and pre-Series A rounds. His mentorship clinics focus on stripping away jargon, distilling complex technical innovations into compelling 10-slide narratives, establishing credible Total Addressable Market (TAM) models, and stress-testing financial assumptions. Siddharth runs simulated venture evaluation panels for incubatees, providing candid, constructive critique on pitch delivery, objection handling, valuation negotiation, and data room preparedness. Founders guided by Siddharth enter institutional investor pitch rooms with exceptional storytelling clarity, rigorous metric defense, and high investor confidence.",
        "status": "Active",
        "rating": 5.0,
        "totalHoursLogged": 76,
        "sessionsCount": 17,
        "image": "",
        "assignedStartups": [
            "MandiXpress",
            "GramSafar"
        ]
    },
    {
        "id": "MENTOR-2026-015",
        "name": "Ananya Mukherjee",
        "title": "Vice President of Sustainability, GreenEarth Solutions & Senior Fellow, TERI",
        "organization": "Vice President of Sustainability",
        "primaryDomain": "Circular Economy",
        "expertise": [
            "Circular Economy",
            "Waste Upcycling",
            "ESG Compliance",
            "Carbon Offsetting",
            "CleanTech Scaling"
        ],
        "experience": "18 Years",
        "qualification": "M.Sc. in Environmental Sciences (TERI University), B.Sc. (Hons) (Calcutta University)",
        "location": "Kolkata / Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "ananya.mukherjee@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/ananya-mukherjee-sustainability",
        "bio": "Ananya Mukherjee is an internationally respected environmental scientist, sustainability consultant, and circular economy architect with 18 years of experience advising government agencies, municipal corporations, and industrial conglomerates on environmental compliance and green innovation. As Vice President of Sustainability at GreenEarth Solutions and Senior Fellow at TERI, Ananya has spearheaded groundbreaking initiatives in industrial plastic upcycling, decentralized municipal solid waste biomethanation, and agro-residue product manufacturing. Her mentorship at the incubation center empowers cleantech, waste management, and sustainable manufacturing ventures to establish verifiable environmental impact matrices, secure EPR (Extended Producer Responsibility) certificates, and navigate state pollution control board (SPCB) clearances. Ananya assists founders in unlocking institutional green capital, monetizing verified carbon credits, and designing zero-effluent manufacturing processes that appeal to ESG-mandated corporate procurement officers and global impact investors.",
        "status": "Active",
        "rating": 4.8,
        "totalHoursLogged": 20,
        "sessionsCount": 20,
        "image": "",
        "assignedStartups": [
            "GatiWheels",
            "GaadiFix"
        ]
    },
    {
        "id": "MENTOR-2026-016",
        "name": "Rajiv Nambiar",
        "title": "Chief Product Officer, NexGen SaaS Labs & Former Product Director, Freshworks",
        "organization": "Chief Product Officer",
        "primaryDomain": "B2B SaaS Product Management",
        "expertise": [
            "B2B SaaS Product Management",
            "User Experience (UX)",
            "Product-Led Growth (PLG)",
            "Feature Prioritization"
        ],
        "experience": "16 Years",
        "qualification": "M.S. in Human-Computer Interaction (Georgia Tech), B.E. (BITS Pilani)",
        "location": "Chennai / Virtual",
        "mode": "Online / Virtual",
        "email": "rajiv.nambiar@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/rajiv-nambiar-product",
        "bio": "Rajiv Nambiar is an accomplished B2B software product executive, UX strategist, and product-led growth (PLG) champion with 16 years of track record building intuitive enterprise software. Having driven critical product suites at Freshworks and high-growth enterprise SaaS startups, Rajiv specializes in transforming feature-heavy, confusing technical software into frictionless, customer-centric digital products. As an incubation mentor, Rajiv conducts hands-on product teardowns, user journey mapping sessions, and onboarding funnel optimizations for software and web-based startups. He trains technical founders in adopting Agile product management frameworks, establishing actionable North Star metrics, executing structured customer discovery interviews, and prioritizing development backlogs using RICE and MoSCoW methodologies. Rajiv's mentorship prevents software startups from falling into the trap of over-engineering, steering them toward lean, highly engaging product releases that drive organic retention and rapid net-revenue-retention expansion.",
        "status": "Active",
        "rating": 4.9,
        "totalHoursLogged": 24,
        "sessionsCount": 23,
        "image": "",
        "assignedStartups": [
            "ScoutKhel",
            "Samarthya"
        ]
    },
    {
        "id": "MENTOR-2026-017",
        "name": "Dr. Bhupendra Nath Verma",
        "title": "Former Dean of Veterinary Sciences, Bihar Animal Sciences University (BASU)",
        "organization": "Former Dean of Veterinary Sciences",
        "primaryDomain": "Animal Husbandry",
        "expertise": [
            "Animal Husbandry",
            "Dairy Processing",
            "Livestock Genetics",
            "Poultry Feed",
            "Veterinary Diagnostics"
        ],
        "experience": "30 Years",
        "qualification": "Ph.D. in Veterinary Medicine (IVRI Bareilly), M.V.Sc. (Animal Nutrition)",
        "location": "Patna",
        "mode": "In-Person / Physical Sessions",
        "email": "bhupendra.verma@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/dr-bhupendra-verma-veterinary",
        "bio": "Dr. Bhupendra Nath Verma is a distinguished veterinary scientist, livestock nutrition authority, and academic leader with three decades of impactful contributions to animal husbandry and dairy enterprise development across Bihar and Eastern India. Having served as Dean of Veterinary Sciences at Bihar Animal Sciences University, Dr. Verma has authored authoritative manuals on disease surveillance, balanced cattle feed formulation, and artificial insemination management. At the incubation center, Dr. Verma provides invaluable scientific stewardship to startups innovating in dairy supply chains, goat farming, poultry feed substitutes (including Black Soldier Fly larvae), and portable veterinary diagnostics. He guides entrepreneurs on regulatory bio-safety norms, herd health management protocols, silage preservation techniques, and institutional tie-ups with district animal husbandry departments. Dr. Verma’s mentorship ensures that livestock and dairy startups build biologically robust, disease-resilient, and scientifically verified models that earn the confidence of grassroots rural farmers.",
        "status": "Active",
        "rating": 5.0,
        "totalHoursLogged": 28,
        "sessionsCount": 26,
        "image": "",
        "assignedStartups": [
            "RakshaSec",
            "BhashaSetu"
        ]
    },
    {
        "id": "MENTOR-2026-018",
        "name": "Deepika Tandon",
        "title": "Chief Commercial Officer, LuxeHeritage Retail & Former Head of Merchandising, FabIndia",
        "organization": "Chief Commercial Officer",
        "primaryDomain": "Handloom & Handicraft Retail",
        "expertise": [
            "Handloom & Handicraft Retail",
            "Rural Artisan Cluster Aggregation",
            "Global Fair Trade Export"
        ],
        "experience": "21 Years",
        "qualification": "Post Graduate in Fashion Merchandising (NIFT New Delhi), B.A. (Delhi University)",
        "location": "New Delhi / Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "deepika.tandon@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/deepika-tandon-crafts-retail",
        "bio": "Deepika Tandon is a celebrated craft retail strategist, fashion merchandiser, and artisan livelihoods curator with 21 years of leadership in taking India’s cultural crafts to mainstream domestic and international retail markets. Having led major procurement and design-led merchandising divisions at FabIndia and premium lifestyle retail houses, Deepika possesses unparalleled expertise in bridging traditional craft clusters with contemporary consumer tastes. She mentors craft, textile, and lifestyle startups on product range architecture, trend forecasting, ethical fair-trade certification, natural dye standardization, and packaging aesthetics. In her mentorship interactions, Deepika works closely with founders to eliminate middleman exploitation, institute standard quality control protocols at village weaver clusters, and position handcrafted Madhubani, Manjusha, and handloom products in high-margin boutique and export avenues. Her mentorship enables rural heritage startups to build viable, premium, and sustainable creative brand narratives.",
        "status": "Active",
        "rating": 4.8,
        "totalHoursLogged": 32,
        "sessionsCount": 29,
        "image": "",
        "assignedStartups": [
            "BioKhet",
            "BhojPack"
        ]
    },
    {
        "id": "MENTOR-2026-019",
        "name": "Suresh Chandra Mohapatra",
        "title": "Executive Director, InfraCon Engineering Consultants & Advisor, Smart Cities Mission",
        "organization": "Executive Director",
        "primaryDomain": "ConTech",
        "expertise": [
            "ConTech",
            "Modular Construction",
            "Structural Design",
            "Smart City Projects",
            "EPC Tenders"
        ],
        "experience": "28 Years",
        "qualification": "M.Tech in Structural Engineering (IIT Roorkee), B.Sc. Engineering (NIT Rourkela)",
        "location": "Bhubaneswar / Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "suresh.mohapatra@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/suresh-mohapatra-infracon",
        "bio": "Suresh Chandra Mohapatra is a veteran civil engineer, infrastructure modernization consultant, and construction technology (ConTech) mentor with 28 years of industry leadership in turnkey engineering, procurement, and construction (EPC). Having executed landmark multi-crore public infrastructure, industrial logistics parks, and municipal projects under the Smart Cities Mission, Suresh brings immense operational credibility to startups venturing into construction technology, building materials, and automated property management. His incubation mentorship spans bidding for municipal tenders, structural feasibility audits, building information modeling (BIM) integration, and the commercial scaling of eco-friendly construction materials (such as fly-ash and agro-waste bricks). Suresh assists founders in navigating complex contractor ecosystems, establishing reliable vendor credit cycles, and ensuring compliance with National Building Code (NBC) safety mandates, enabling ConTech startups to establish trusted partnerships with government bodies and private developers.",
        "status": "Active",
        "rating": 4.9,
        "totalHoursLogged": 36,
        "sessionsCount": 32,
        "image": "",
        "assignedStartups": [
            "AtithiStay",
            "KleenPro"
        ]
    },
    {
        "id": "MENTOR-2026-020",
        "name": "Dr. Farhan Qureshi",
        "title": "Head of Embedded Systems & IoT, SiliconEdge Labs & Former Senior Staff Engineer, Qualcomm",
        "organization": "Head of Embedded Systems & IoT",
        "primaryDomain": "Hardware Prototyping",
        "expertise": [
            "Hardware Prototyping",
            "PCB Design",
            "Firmware Development",
            "LoRaWAN / NB-IoT",
            "Mass Manufacturing"
        ],
        "experience": "17 Years",
        "qualification": "Ph.D. in Microelectronics (IIT Delhi), B.Tech in Electronics & Communication",
        "location": "Bengaluru / Virtual",
        "mode": "Online / Virtual",
        "email": "farhan.qureshi@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/dr-farhan-qureshi-iot",
        "bio": "Dr. Farhan Qureshi is an elite semiconductor engineer, embedded firmware specialist, and hardware product commercialization mentor with 17 years of experience building connected smart devices. Following tenure as Senior Staff Engineer at Qualcomm designing RF transceiver components and IoT microcontrollers, Dr. Qureshi founded SiliconEdge Labs to support Make-in-India hardware innovation. At the incubation center, he is the primary mentor for ventures engineering smart metering, drone avionics, automotive telematics, and industrial sensor hardware. His mentorship provides rigorous guidance on schematic capture, multi-layer PCB design, low-power firmware optimization, component sourcing under volatile global supply chains, and testing for CE, FCC, and BIS compliance. Dr. Qureshi guides founders through Design-for-Manufacturing (DFM) principles, bridging the perilous chasm between breadboard proof-of-concept units and high-yield, batch-manufactured commercial hardware products.",
        "status": "Active",
        "rating": 5.0,
        "totalHoursLogged": 40,
        "sessionsCount": 35,
        "image": "",
        "assignedStartups": [
            "LokRang OTT",
            "DukanApp"
        ]
    },
    {
        "id": "MENTOR-2026-021",
        "name": "Kavita Singhal",
        "title": "Chief Executive Officer, BrandVantage Communications & Former PR Director, Ogilvy India",
        "organization": "Chief Executive Officer",
        "primaryDomain": "Corporate PR",
        "expertise": [
            "Corporate PR",
            "Crisis Management",
            "Media Visibility",
            "Founder Personal Branding",
            "Stakeholder Relations"
        ],
        "experience": "20 Years",
        "qualification": "Master of Mass Communication (IIMC New Delhi), B.A. in English Literature",
        "location": "New Delhi / Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "kavita.singhal@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/kavita-singhal-pr-branding",
        "bio": "Kavita Singhal is a seasoned public relations strategist, media relations specialist, and reputation management consultant with two decades of experience shaping communications for top tech unicorns, multinational conglomerates, and transformative public initiatives. As former PR Director at Ogilvy India and CEO of BrandVantage Communications, Kavita understands the immense power of narrative in driving early-stage startup credibility. Her incubation masterclasses and one-on-one clinics guide founders on formulating powerful press releases, securing tier-1 national and regional business media coverage, orchestrating founder-led thought leadership on LinkedIn, and handling media scrutiny during product launches. She works closely with startups to articulate their socio-economic impact in a compelling manner that captures the attention of policymakers, institutional investors, and prospective marquee hires, transforming quiet innovators into visible, trusted category leaders.",
        "status": "Active",
        "rating": 4.8,
        "totalHoursLogged": 44,
        "sessionsCount": 38,
        "image": "",
        "assignedStartups": [
            "GauPure",
            "AmritDhara"
        ]
    },
    {
        "id": "MENTOR-2026-022",
        "name": "Manish Poddar",
        "title": "President, Bihar Chamber of Commerce & Industries (BCCI) & CMD, Poddar Industrial Group",
        "organization": "President",
        "primaryDomain": "Industrial Setup",
        "expertise": [
            "Industrial Setup",
            "State Policy Incentives",
            "Commercial Negotiations",
            "Local Market Distribution"
        ],
        "experience": "29 Years",
        "qualification": "B.Com (Hons), Diploma in Industrial Management",
        "location": "Patna",
        "mode": "In-Person / Physical Sessions",
        "email": "manish.poddar@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/manish-poddar-industrialist",
        "bio": "Manish Poddar is a distinguished industrialist, commercial leader, and trade policy advisor who has spent nearly three decades advancing industrial development and manufacturing enterprise in Bihar and Eastern India. As a senior office-bearer at regional trade bodies and Chairman & Managing Director of Poddar Industrial Group, Shri Poddar brings unmatched grassroots industrial acumen and market linkage capabilities. In his mentorship engagements, he advises startups on industrial land acquisition via BIADA, factory layout design, state industrial policy subsidies (including capital investment and interest subventions), power connectivity, and statutory factory licensing. His extensive network among regional distribution syndicates, wholesalers, and institutional buyers opens doors for startups looking to establish physical trade channels. Shri Poddar’s mentorship grounds innovative entrepreneurs in the practical realities of industrial manufacturing, statutory compliance, and regional commercial distribution.",
        "status": "Active",
        "rating": 4.9,
        "totalHoursLogged": 48,
        "sessionsCount": 41,
        "image": "",
        "assignedStartups": [
            "VedGlow",
            "TrinetraEye"
        ]
    },
    {
        "id": "MENTOR-2026-023",
        "name": "Dr. Anirudh Banerjee",
        "title": "Chief Scientist, BioInnovation Research Foundation & Former Scientist, CSIR-CDRI",
        "organization": "Chief Scientist",
        "primaryDomain": "Biotechnology",
        "expertise": [
            "Biotechnology",
            "Herbal Formulations",
            "Bio-Fertilizers",
            "Phytochemical Analysis",
            "Patenting Bio-Entities"
        ],
        "experience": "22 Years",
        "qualification": "Ph.D. in Medicinal Chemistry (CDRI Lucknow), Post-Doc (Cambridge)",
        "location": "Kolkata / Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "anirudh.banerjee@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/dr-anirudh-banerjee-biotech",
        "bio": "Dr. Anirudh Banerjee is a veteran medicinal chemist, biotechnology researcher, and herbal extraction innovator with 22 years of experience developing evidence-based biological formulations and active pharmaceutical ingredients (APIs). Following a prolific research tenure at CSIR-CDRI, Dr. Banerjee has guided multiple biotechnology startups in turning botanical extracts, herbal nutraceuticals, and micro-algae into commercially standardized health and agro products. At the incubation center, he provides deep-tech scientific mentorship to startups in organic agriculture, biopesticides, and herbal cosmetics. He mentors founders on conducting phytochemical profiling, gas chromatography-mass spectrometry (GC-MS) purity analysis, standardizing active compound concentrations, and securing regulatory approvals from AYUSH and the National Biodiversity Authority (NBA). Dr. Banerjee ensures that biological and herbal ventures establish rigorous scientific differentiation, defensible patent barriers, and consistent batch-to-batch quality.",
        "status": "Active",
        "rating": 5.0,
        "totalHoursLogged": 52,
        "sessionsCount": 44,
        "image": "",
        "assignedStartups": [
            "RozgarMitra",
            "SmartDarzi"
        ]
    },
    {
        "id": "MENTOR-2026-024",
        "name": "Harishankar Pandey",
        "title": "Chief Executive Officer, AgriFin Bharat & Former Head of Agri-Business, HDFC Bank",
        "organization": "Chief Executive Officer",
        "primaryDomain": "Priority Sector Lending",
        "expertise": [
            "Priority Sector Lending",
            "Micro-Finance Aggregation",
            "Cattle Credit Scoring",
            "Rural FinTech"
        ],
        "experience": "25 Years",
        "qualification": "MBA in Rural Management (IRMA Anand), B.Sc. Agriculture (RAU Pusa)",
        "location": "Patna / Lucknow",
        "mode": "Hybrid (Online & In-Person)",
        "email": "harishankar.pandey@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/harishankar-pandey-agrifin",
        "bio": "Harishankar Pandey is an esteemed rural banking executive, agricultural credit innovator, and agrifintech leader with 25 years of experience mobilizing institutional finance into India's rural hinterlands. As former Head of Agri-Business Lending at HDFC Bank and currently CEO of AgriFin Bharat, Shri Pandey has designed pioneering credit algorithms that evaluate rural cash flows, land-lease contracts, and livestock collateral. His mentorship at the incubation center focuses on equipping agrifintech and rural commerce ventures to build scalable credit-enablement layers between unbanked farmers and commercial lending institutions. He guides startups on structuring debt syndication pipelines, implementing digital farmer onboarding compliance, leveraging Kisan Credit Card (KCC) integration, and designing loan-loss guarantee mechanisms. Shri Pandey’s mentoring bridges the trust deficit between institutional banks and agrarian micro-enterprises, paving the way for multi-crore disbursement partnerships.",
        "status": "Active",
        "rating": 4.8,
        "totalHoursLogged": 56,
        "sessionsCount": 47,
        "image": "",
        "assignedStartups": [
            "BharatSound",
            "PranMeter"
        ]
    },
    {
        "id": "MENTOR-2026-025",
        "name": "Siddhartha Mukherjee",
        "title": "Chief Information Security Officer, SecureGrid Cybernetics & Advisor, CERT-In Panel",
        "organization": "Chief Information Security Officer",
        "primaryDomain": "Cybersecurity Architecture",
        "expertise": [
            "Cybersecurity Architecture",
            "ISO 27001",
            "Data Privacy (DPDP Act)",
            "Vulnerability Assessment"
        ],
        "experience": "18 Years",
        "qualification": "M.Tech in Information Security (IIT Kharagpur), CISSP, CISA Certified",
        "location": "New Delhi / Virtual",
        "mode": "Online / Virtual",
        "email": "siddhartha.mukherjee@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/siddhartha-mukherjee-cybersec",
        "bio": "Siddhartha Mukherjee is an authoritative enterprise cybersecurity specialist, ethical hacking veteran, and digital privacy consultant with 18 years of experience fortifying defense, banking, and SaaS software infrastructure. An active empaneled auditor with CERT-In and Chief Information Security Officer at SecureGrid Cybernetics, Siddhartha has architected zero-trust security postures for national critical infrastructure and enterprise FinTech platforms. At the incubator, he serves as the essential guardian for digital platforms handling sensitive personal and financial user data. His mentorship guides founders through vulnerability assessment and penetration testing (VAPT), cloud IAM role configuration, end-to-end data encryption, and compliance with the Digital Personal Data Protection (DPDP) Act 2023. Siddhartha helps founders build robust, audit-proof cyber defense systems from day one, preventing catastrophic data breaches and passing rigorous institutional enterprise vendor security assessments.",
        "status": "Active",
        "rating": 4.9,
        "totalHoursLogged": 60,
        "sessionsCount": 50,
        "image": "",
        "assignedStartups": [
            "KhelArena",
            "PharmaDrop"
        ]
    },
    {
        "id": "MENTOR-2026-026",
        "name": "Dr. Suniti Kumari",
        "title": "Professor of Educational Technology, Central University of South Bihar & EdTech Innovator",
        "organization": "Professor of Educational Technology",
        "primaryDomain": "NEP 2020 Pedagogical Frameworks",
        "expertise": [
            "NEP 2020 Pedagogical Frameworks",
            "Vernacular Curriculum Design",
            "Gamified EdTech",
            "K-12 Analytics"
        ],
        "experience": "19 Years",
        "qualification": "Ph.D. in Education & Instructional Design (NIEPA New Delhi), M.Ed.",
        "location": "Gaya / Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "suniti.kumari@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/dr-suniti-kumari-edtech",
        "bio": "Dr. Suniti Kumari is an eminent educational visionary, pedagogical architect, and learning outcomes researcher with 19 years of expertise in digital instructional design and educational technology. As Professor of Educational Technology and advisor on National Education Policy (NEP 2020) curricular implementation, Dr. Kumari bridges cognitive neuroscience, psychometrics, and mobile-first learning technologies. She mentors EdTech and gamified learning startups on designing curriculum-aligned, vernacular learning paths that dramatically improve student conceptual retention in tier-2, 3, and rural schools. Her mentorship covers Bloom's taxonomy mapping, micro-learning video design, formative assessment algorithms, and teacher-enablement workflows. Dr. Kumari guides founders on collaborating effectively with state education boards, running credible pilot impact studies in schools, and demonstrating measurable learning improvements that persuade parents, teachers, and school administrators to adopt digital learning tools.",
        "status": "Active",
        "rating": 5.0,
        "totalHoursLogged": 64,
        "sessionsCount": 53,
        "image": "",
        "assignedStartups": [
            "GharShobha",
            "EcoGems"
        ]
    },
    {
        "id": "MENTOR-2026-027",
        "name": "Amitabh Khare",
        "title": "Managing Partner, AlphaScale Advisory & Former Managing Director, Ernst & Young (EY)",
        "organization": "Managing Partner",
        "primaryDomain": "Corporate Strategy",
        "expertise": [
            "Corporate Strategy",
            "Mergers & Acquisitions (M&A)",
            "Global Business Expansion",
            "Joint Ventures"
        ],
        "experience": "27 Years",
        "qualification": "MBA (Wharton School, Univ. of Pennsylvania), B.Tech (IIT BHU)",
        "location": "Mumbai / Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "amitabh.khare@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/amitabh-khare-strategy",
        "bio": "Amitabh Khare is an internationally renowned corporate strategist, management consultant, and M&A specialist with 27 years of global advisory leadership across North America, Europe, and India. Formerly Managing Director in Management Consulting at Ernst & Young (EY), Amitabh has advised Fortune 100 boards, state governments, and high-growth technology unicorns on corporate reorganization, international market entry, and joint venture negotiations. As an incubation mentor, he provides high-level strategic counsel to growth-stage and acceleration startups preparing for multi-state and international expansion. His mentorship focuses on long-term corporate governance, strategic moat building, competitive pricing strategy, and institutional joint venture alliances. Amitabh mentors founders to shift from short-term firefighting to long-term visionary leadership, building institutional systems and corporate governance standards that make their businesses resilient, scalable, and attractive for strategic buyout or public listing.",
        "status": "Active",
        "rating": 4.8,
        "totalHoursLogged": 68,
        "sessionsCount": 16,
        "image": "",
        "assignedStartups": [
            "EcoDhaaga",
            "GaganDoot"
        ]
    },
    {
        "id": "MENTOR-2026-028",
        "name": "Tanvi Sharma",
        "title": "Creative Director & Founder, StudioVistara & Former Principal Experience Designer, IDEO",
        "organization": "Creative Director & Founder",
        "primaryDomain": "Industrial Design",
        "expertise": [
            "Industrial Design",
            "Human-Centered Design (HCD)",
            "Packaging Usability",
            "UI/UX",
            "Consumer Brand Identity"
        ],
        "experience": "15 Years",
        "qualification": "Master of Design (National Institute of Design - NID Ahmedabad), B.Arch",
        "location": "New Delhi / Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "tanvi.sharma@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/tanvi-sharma-design-hcd",
        "bio": "Tanvi Sharma is a celebrated design thinker, user experience visionary, and industrial product designer with 15 years of international experience crafting category-defining products and brand identities. Having honed human-centered design (HCD) methodologies as a design lead at IDEO and founded StudioVistara, Tanvi has conceptualized award-winning hardware enclosures, retail packaging, and mobile application experiences for consumer and enterprise clients. At the incubator, she conducts immersive design sprints and usability teardowns for physical and digital startups alike. Her mentorship covers physical ergonomics, sustainable and cost-effective packaging materials, visual brand identity guidelines, user behavioral research, and intuitive mobile UI design. Tanvi empowers technical and business founders to embrace design as a core competitive differentiator, ensuring their products not only function reliably but also evoke immediate emotional connection and user trust in crowded marketplaces.",
        "status": "Active",
        "rating": 4.9,
        "totalHoursLogged": 72,
        "sessionsCount": 19,
        "image": "",
        "assignedStartups": [
            "JalMatsya",
            "UtsavManch"
        ]
    },
    {
        "id": "MENTOR-2026-029",
        "name": "Naveen Chandran",
        "title": "Chief Operating Officer, GreenTrans Logistics & Former Head of Fleet Operations, Delhivery",
        "organization": "Chief Operating Officer",
        "primaryDomain": "Fleet Optimization",
        "expertise": [
            "Fleet Optimization",
            "Hub-and-Spoke Logistics",
            "GPS Telematics",
            "Route Planning",
            "Driver Retention"
        ],
        "experience": "20 Years",
        "qualification": "Post Graduate Diploma in Management (IIM Lucknow), B.Tech (Mechanical)",
        "location": "Kolkata / Patna",
        "mode": "Hybrid (Online & In-Person)",
        "email": "naveen.chandran@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/naveen-chandran-fleet-logistics",
        "bio": "Naveen Chandran is a seasoned fleet management expert, transportation network engineer, and logistics operations specialist with 20 years of experience managing high-velocity supply chains. Having led massive surface transport and middle-mile fleet networks as Head of Fleet Operations at Delhivery, Naveen possesses deep, hands-on knowledge of route scheduling, fuel optimization, vehicle telematics, and commercial driver management. In his incubation mentorship role, he assists logistics, mobility, and hyperlocal delivery ventures in engineering cost-effective hub-and-spoke networks across eastern India. His guidance covers fleet leasing strategies, telematics-driven preventive maintenance, dynamic route dispatch algorithms, and driver incentive structures that minimize operational churn. Naveen mentors founders to focus obsessively on reducing cost-per-ton-kilometer and transit turnaround times, helping early transport ventures transition into scalable, asset-light, and profitable logistical enterprises.",
        "status": "Active",
        "rating": 5.0,
        "totalHoursLogged": 76,
        "sessionsCount": 22,
        "image": "",
        "assignedStartups": [
            "JanSeva",
            "PetMitra"
        ]
    },
    {
        "id": "MENTOR-2026-030",
        "name": "Dr. Smriti Rekha Das",
        "title": "Director of Medical Devices Division, BioTech Consortium India & Former Scientist, AIIMS",
        "organization": "Director of Medical Devices Division",
        "primaryDomain": "Diagnostic Kits",
        "expertise": [
            "Diagnostic Kits",
            "Bio-Sensors",
            "Biomedical Engineering",
            "ISO 13485",
            "Lab-to-Market Transition"
        ],
        "experience": "23 Years",
        "qualification": "Ph.D. in Biomedical Engineering (IIT Bombay), M.Sc. in Biotechnology",
        "location": "Patna / New Delhi",
        "mode": "Hybrid (Online & In-Person)",
        "email": "smriti.das@biif-mentor.in",
        "linkedin": "https://www.linkedin.com/in/dr-smriti-rekha-das-biomed",
        "bio": "Dr. Smriti Rekha Das is an acclaimed biomedical engineer, medical device regulation expert, and healthcare technology commercialization leader with 23 years of experience in laboratory diagnostics and biosensor development. Having served as a clinical scientist at AIIMS and Director at the BioTech Consortium India, Dr. Das has played an instrumental role in bridging cutting-edge scientific research with commercial diagnostic manufacturing. At the incubation center, she mentors medtech, hardware, and healthcare ventures on designing reliable point-of-care rapid diagnostic testing kits, physiological monitoring sensors, and automated microfluidic analyzers. Her mentorship provides step-by-step navigation through ISO 13485 medical device quality management systems, cleanroom operational protocols, biomedical waste compliance, and multi-center clinical validation trials. Dr. Das’s scientific rigor and regulatory precision equip medical hardware entrepreneurs to launch clinically validated, affordable, and lifesaving diagnostic technologies.",
        "status": "Active",
        "rating": 4.8,
        "totalHoursLogged": 20,
        "sessionsCount": 25,
        "image": "",
        "assignedStartups": [
            "GramSafar",
            "UrjaOptima"
        ]
    }
];

    // Seed Mentoring Sessions
    const SEED_SESSIONS = [
        {
            id: 'SES-01',
            startupId: 'ST-001',
            startupName: 'Digital Labour Chowk',
            mentorId: 'MEN-001',
            mentorName: 'Dr. Alok Kumar',
            date: '2026-08-26',
            durationHours: 2,
            topic: 'Unit Economics & Contractor CAC Optimization',
            notes: 'Reviewed B2B contractor onboarding cost. Recommended direct partnership with CREDAI Patna for bulk registrations.',
            feedbackRating: 5
        },
        {
            id: 'SES-02',
            startupId: 'ST-002',
            startupName: 'Gramshree Agri Services',
            mentorId: 'MEN-002',
            mentorName: 'Prof. S. K. Singh',
            date: '2026-08-20',
            durationHours: 1.5,
            topic: 'Bihar Cold-Chain Subsidy & Export Certification',
            notes: 'Guided team on applying for APEDA export incentives for North Bihar litchi and makhana shipments.',
            feedbackRating: 5
        },
        {
            id: 'SES-03',
            startupId: 'ST-004',
            startupName: 'Hanuman Care',
            mentorId: 'MEN-004',
            mentorName: 'Dr. Rajesh Verma',
            date: '2026-08-14',
            durationHours: 2,
            topic: 'Tele-ICU Hardware Integration & Ambulance Latency',
            notes: 'Optimized GPS telematics tracking for Tier-2 districts in Bihar; reduced alert latency by 25%.',
            feedbackRating: 4.8
        }
    ];

    // Seed Announcements
    const SEED_ANNOUNCEMENTS = [
        {
            id: 'ANN-01',
            title: 'MSME Idea Hackathon 6.0 Grant Applications Open',
            category: 'Funding Opportunity',
            badge: 'Urgent Grant',
            date: '2026-08-28',
            content: 'Selected incubatees can apply for up to ₹15,00,000 in non-dilutive government grant funding. Last date for internal review is Sept 15, 2026.',
            targetRoles: ['All', 'Startup', 'Incubation Manager']
        },
        {
            id: 'ANN-02',
            title: 'Demo Day 2026 with 20+ Angel Investors & VCs',
            category: 'Investor Event',
            badge: 'Key Event',
            date: '2026-08-25',
            content: 'CIMP-BIIF will host the Annual Bihar Investor Summit on Oct 10, 2026. Pitch decks must be finalized with assigned mentors by Sept 20.',
            targetRoles: ['All', 'Startup', 'Mentor', 'Director']
        },
        {
            id: 'ANN-03',
            title: 'Free AWS & Google Cloud Credits worth $10,000 Available',
            category: 'Incubation Perks',
            badge: 'Cloud Perks',
            date: '2026-08-15',
            content: 'All active incubatees can claim cloud credits, MongoDB enterprise licenses, and Stripe discounted processing via IT Admin.',
            targetRoles: ['Startup']
        }
    ];

    // Seed Audit Logs
    const SEED_AUDIT_LOGS = [
        {
            id: 'LOG-101',
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
            actor: 'Director',
            role: 'Director',
            action: 'FINAL_APPROVAL',
            details: 'Approved startup Project Starline for Cohort 2023 and released onboarding kit.'
        },
        {
            id: 'LOG-102',
            timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
            actor: 'Manager',
            role: 'Incubation Manager',
            action: 'EVALUATION_SCORE',
            details: 'Evaluated application APP-2026-092 (EduSathi VR Classrooms) with Score 92/100 and recommended to Director.'
        },
        {
            id: 'LOG-103',
            timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
            actor: 'IT Admin',
            role: 'IT Admin',
            action: 'PORTAL_SYNC',
            details: 'Synchronized verified startup directory to live CIMP-BIIF public portal.'
        }
    ];

    // Seed System Users with Testing Passwords
    const SEED_USERS = [
        { id: 'usr-dir', name: 'Director', email: 'director@cimp.ac.in', password: 'director123', role: 'Director', avatar: 'assets/images/user-director.png', title: 'Director, CIMP', portalUrl: 'admin/director/index.html' },
        { id: 'usr-mgr', name: 'Manager', email: 'incubation@cimpbiif.com', password: 'manager123', role: 'Incubation Manager', avatar: 'assets/images/user-manager.png', title: 'Incubation Manager & CEO', portalUrl: 'admin/incubation-manager/index.html' },
        { id: 'usr-it', name: 'IT Admin', email: 'itadmin@cimpbiif.com', password: 'admin123', role: 'IT Admin', avatar: 'assets/images/user-it.png', title: 'Lead System Administrator', portalUrl: 'admin/it-admin/index.html' },
        { id: 'usr-founder', name: 'Founder', email: 'founder@abc.com', password: 'startup123', role: 'Startup', startupId: 'ST-001', title: 'Founder & CEO, Digital Labour Chowk', portalUrl: 'admin/startup/index.html' },
        { id: 'usr-mentor', name: 'Mentor', email: 'mentor@cimp.ac.in', password: 'mentor123', role: 'Mentor', mentorId: 'MEN-001', title: 'Senior Incubation Advisor', portalUrl: 'admin/mentor/index.html' }
    ];

    // Seed Form Schemas for Dynamic Form Studio & Zero-Code Builder
    const SEED_FORM_SCHEMAS = {
        'startup-incubation': {
            id: 'startup-incubation',
            title: 'Startup Incubation Intake Application',
            slug: 'incubation-registration',
            description: 'Official intake application form for early-stage and growth startups applying for CIMP-BIIF Cohort Incubation.',
            lastUpdated: new Date().toISOString(),
            acceptingResponses: true,
            closeMessage: 'Applications for this intake cycle are currently closed. Please watch our announcements for upcoming cohort deadlines.',
            confirmationMessage: 'Thank you for your application to CIMP-BIIF! Our incubation management committee has received your details and will contact you.',
            cohortTag: 'Cohort 2026 Batch 1',
            steps: [
                { num: 1, title: 'Identity & Founder', description: 'Personal, contact & institutional background' },
                { num: 2, title: 'Venture & Pitch', description: 'Product idea, innovation & market potential' },
                { num: 3, title: 'Stage & Pitch Deck', description: 'Traction, team size & document attachments' }
            ],
            fields: [
                // Step 1: Founder & Identity
                { id: 'startup_name', label: 'Venture / Startup Name', type: 'text', placeholder: 'e.g., AgriFlow Technologies Pvt Ltd', helpText: 'Registered or proposed company name', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 1 },
                { id: 'founder_name', label: 'Primary Founder Full Name', type: 'text', placeholder: 'e.g., Ananya Jha', helpText: 'Lead applicant as per Govt ID', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 2 },
                { id: 'email', label: 'Official Email Address', type: 'email', placeholder: 'founder@yourstartup.com', helpText: 'Used for selection letters & login credentials', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 3 },
                { id: 'mobile', label: 'WhatsApp / Mobile Number', type: 'tel', placeholder: 'e.g., 9876543210', helpText: '10-digit primary mobile number', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 4 },
                { id: 'city', label: 'City / District in Bihar / India', type: 'text', placeholder: 'e.g., Patna / Darbhanga / Muzaffarpur', helpText: 'Headquarter city or primary area of work', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 5 },
                { id: 'state', label: 'State of Operations', type: 'select', options: ['Bihar', 'Jharkhand', 'Uttar Pradesh', 'West Bengal', 'Delhi NCR', 'Karnataka', 'Maharashtra', 'Other'], helpText: 'State jurisdiction', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 6 },
                // Step 2: Pitch & Business
                { id: 'sector', label: 'Primary Industry Sector', type: 'select', options: ['AgriTech', 'CleanTech / EV', 'EduTech', 'FinTech', 'HealthTech', 'Handloom / Handicrafts / Khadi', 'Logistics / Supply Chain', 'SaaS / AI / DeepTech', 'Food Processing', 'Other'], helpText: 'Select domain focus', required: true, step: 2, colWidth: '6', isCore: true, active: true, order: 7 },
                { id: 'stage', label: 'Current Venture Stage', type: 'select', options: ['Idea Stage', 'Proof of Concept / MVP', 'Early Traction / Pilot', 'Revenue Generating', 'Scaling / Series-A Ready'], helpText: 'Operational maturity', required: true, step: 2, colWidth: '6', isCore: true, active: true, order: 8 },
                { id: 'product_description', label: 'Brief Problem Statement & Solution', type: 'textarea', placeholder: 'Describe your core product or service, target customers, and how your solution solves a critical problem...', helpText: 'Minimum 20 words explaining your product', required: true, step: 2, colWidth: '12', isCore: true, active: true, order: 9 },
                { id: 'innovative', label: 'Key Innovation & Competitive Moat', type: 'textarea', placeholder: 'What makes your technology or business model unique compared to existing alternatives in Bihar?', helpText: 'Proprietary IP or unique value proposition', required: false, step: 2, colWidth: '12', isCore: false, active: true, order: 10 },
                // Step 3: Stage & Deck
                { id: 'team_members', label: 'Current Core Team Size', type: 'select', options: ['Solo Founder (1)', '2-5 Members', '6-15 Members', '16+ Members'], helpText: 'Full-time working members', required: true, step: 3, colWidth: '6', isCore: true, active: true, order: 11 },
                { id: 'funding_required', label: 'Seed Capital / Grant Required (₹)', type: 'select', options: ['₹ 5,00,000 to ₹ 10,00,000 (Bihar Startup Policy Grant)', '₹ 10,00,000 to ₹ 25,00,000', '₹ 25,00,000 to ₹ 50,00,000', 'Bootstrapped / Non-financial Incubation'], helpText: 'Estimated capital needed for next 12 months', required: false, step: 3, colWidth: '6', isCore: false, active: true, order: 12 },
                { id: 'pitch_deck_url', label: 'Pitch Deck Link (Google Drive / DocSend / Dropbox)', type: 'text', placeholder: 'https://drive.google.com/... (view permission enabled)', helpText: 'Sharable link to presentation deck', required: false, step: 3, colWidth: '12', isCore: true, active: true, order: 13 }
            ]
        },
        'mentor-registration': {
            id: 'mentor-registration',
            title: 'Mentor & Advisory Onboarding Form',
            slug: 'mentor-registration',
            description: 'Application for experienced founders, corporate executives, and academicians to mentor CIMP-BIIF cohorts.',
            lastUpdated: new Date().toISOString(),
            acceptingResponses: true,
            closeMessage: 'Mentor registrations are temporarily on hold.',
            confirmationMessage: 'Thank you for your interest in mentoring CIMP-BIIF incubatees! We will review your profile and reach out.',
            cohortTag: 'Faculty & Industry Network',
            steps: [
                { num: 1, title: 'Personal & Profile', description: 'Contact details & organizational credentials' },
                { num: 2, title: 'Expertise & Domain', description: 'Core functional & industry advisory strengths' },
                { num: 3, title: 'Commitment & Bio', description: 'Advisory hours & brief professional summary' }
            ],
            fields: [
                { id: 'full_name', label: 'Full Name with Title', type: 'text', placeholder: 'e.g., Dr. Rakesh Kumar / Priya Sharma', helpText: 'Full name for directory listing', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 1 },
                { id: 'email', label: 'Official / Professional Email', type: 'email', placeholder: 'mentor@institution.ac.in', helpText: 'Official correspondence email', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 2 },
                { id: 'phone', label: 'Mobile / WhatsApp Number', type: 'tel', placeholder: '+91 98765 43210', helpText: 'Active contact phone', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 3 },
                { id: 'linkedin', label: 'LinkedIn Profile URL', type: 'text', placeholder: 'https://linkedin.com/in/username', helpText: 'Public LinkedIn profile', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 4 },
                { id: 'organization', label: 'Current Organization / Company', type: 'text', placeholder: 'e.g., IIM Bodh Gaya / TCS / Self-Employed', helpText: 'Institution or firm affiliation', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 5 },
                { id: 'designation', label: 'Designation / Current Role', type: 'text', placeholder: 'e.g., Vice President / Associate Professor', helpText: 'Current professional title', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 6 },
                { id: 'domain', label: 'Primary Advisory Domain', type: 'select', options: ['Business Strategy & Scaling', 'AgriTech & Rural Supply Chain', 'FinTech, Valuation & Compliance', 'DeepTech, AI & Robotics', 'Marketing, Branding & GTM', 'IPR, Legal & Patents'], helpText: 'Core functional specialization', required: true, step: 2, colWidth: '6', isCore: true, active: true, order: 7 },
                { id: 'experience_years', label: 'Total Years of Professional Experience', type: 'select', options: ['5 - 8 Years', '8 - 15 Years', '15 - 25 Years', '25+ Years'], helpText: 'Years in corporate or venture advisory', required: true, step: 2, colWidth: '6', isCore: true, active: true, order: 8 },
                { id: 'availability_hours', label: 'Monthly Mentorship Availability', type: 'select', options: ['2 - 4 Hours / Month', '4 - 8 Hours / Month', '8+ Hours / Month (Intensive)', 'On-Demand Advisory'], helpText: 'Time commitment for incubatees', required: true, step: 3, colWidth: '6', isCore: true, active: true, order: 9 },
                { id: 'bio', label: 'Executive Bio & Startup Mentoring Experience', type: 'textarea', placeholder: 'Share a summary of your professional milestones, prior startups advised, and specific areas where you can guide founders...', helpText: 'Appears on public mentor profile', required: true, step: 3, colWidth: '12', isCore: true, active: true, order: 10 }
            ]
        },
        'investor-registration': {
            id: 'investor-registration',
            title: 'Angel & Institutional Investor Network',
            slug: 'investor-registration',
            description: 'Network gateway for Angels, VC Funds, Family Offices, and Corporate VC arms looking to co-invest in CIMP-BIIF ventures.',
            lastUpdated: new Date().toISOString(),
            acceptingResponses: true,
            closeMessage: 'Investor syndicate onboarding is by direct invitation currently.',
            confirmationMessage: 'Thank you for connecting with CIMP-BIIF Investor Network! Our dealflow team will be in touch.',
            cohortTag: 'Institutional Capital Network',
            steps: [
                { num: 1, title: 'Investor Profile', description: 'Firm or Angel identity & accredited status' },
                { num: 2, title: 'Investment Thesis', description: 'Ticket sizes, stage & industry preferences' }
            ],
            fields: [
                { id: 'investor_entity', label: 'Fund Name / Angel Network / Individual Name', type: 'text', placeholder: 'e.g., Patna Angel Syndicate / Individual Angel', helpText: 'Firm or legal investor entity', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 1 },
                { id: 'contact_name', label: 'Primary Investment Partner / Contact Person', type: 'text', placeholder: 'e.g., Sandeep Singhania', helpText: 'Lead deal contact', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 2 },
                { id: 'email', label: 'Official Investment Email', type: 'email', placeholder: 'deals@investorcapital.com', helpText: 'Dealflow submission email', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 3 },
                { id: 'mobile', label: 'Direct Phone / WhatsApp', type: 'tel', placeholder: '+91 99887 76655', helpText: 'Confidential direct phone', required: true, step: 1, colWidth: '6', isCore: true, active: true, order: 4 },
                { id: 'investor_type', label: 'Investor Category', type: 'select', options: ['Angel Investor', 'Venture Capital (VC)', 'Family Office', 'Corporate Innovation / CVC', 'Micro-VC / Syndicate'], helpText: 'Capital source classification', required: true, step: 2, colWidth: '6', isCore: true, active: true, order: 5 },
                { id: 'ticket_size', label: 'Typical Cheque / Ticket Size', type: 'select', options: ['₹ 10 Lakhs - ₹ 25 Lakhs', '₹ 25 Lakhs - ₹ 50 Lakhs', '₹ 50 Lakhs - ₹ 1.5 Crores', '₹ 1.5 Crores - ₹ 5 Crores+'], helpText: 'Typical investment per startup', required: true, step: 2, colWidth: '6', isCore: true, active: true, order: 6 },
                { id: 'preferred_sectors', label: 'Target Sectors', type: 'text', placeholder: 'e.g., AgriTech, CleanTech, Consumer Brands, AI', helpText: 'Comma-separated focus domains', required: false, step: 2, colWidth: '12', isCore: false, active: true, order: 7 }
            ]
        }
    };

    // Seed Grants & Tranche Disbursements under Bihar Startup Policy 2022
    const SEED_DISBURSEMENTS = [
        {
            id: 'DSB-2026-001',
            startupId: 'ST-001',
            startupName: 'Digital Labour Chowk',
            founderName: 'Chandrashekhar Mandal',
            scheme: 'Bihar Startup Policy 2022 Seed Fund',
            totalSanctioned: 1000000,
            tranches: [
                { trancheNo: 1, amount: 250000, label: 'Tranche 1 (Seed Prototype Grant)', status: 'Disbursed', disbursedDate: '2022-06-15', ucSubmitted: true, remarks: 'Milestone verified: MVP launched & 1,000 workers onboarded.' },
                { trancheNo: 2, amount: 500000, label: 'Tranche 2 (Market Validation & Tech)', status: 'Disbursed', disbursedDate: '2023-01-20', ucSubmitted: true, remarks: 'Milestone verified: 5 district expansion & revenue traction.' },
                { trancheNo: 3, amount: 250000, label: 'Tranche 3 (Scale & Commercialization)', status: 'Under Scrutiny', disbursedDate: null, ucSubmitted: false, remarks: 'Final audit report under verification by Incubation Manager.' }
            ]
        },
        {
            id: 'DSB-2026-002',
            startupId: 'ST-002',
            startupName: 'Gramshree Agri Services',
            founderName: 'Aastha Singh',
            scheme: 'Bihar Startup Policy 2022 Matching Grant',
            totalSanctioned: 1000000,
            tranches: [
                { trancheNo: 1, amount: 250000, label: 'Tranche 1 (Farmer App & Supply Chain)', status: 'Disbursed', disbursedDate: '2021-10-10', ucSubmitted: true, remarks: '1,500 farmers enrolled across Patna district.' },
                { trancheNo: 2, amount: 500000, label: 'Tranche 2 (Hub Setup & Storage)', status: 'Disbursed', disbursedDate: '2022-04-18', ucSubmitted: true, remarks: 'Hub operationalized with cold transport facility.' },
                { trancheNo: 3, amount: 250000, label: 'Tranche 3 (VC Matching Disbursement)', status: 'Disbursed', disbursedDate: '2024-03-05', ucSubmitted: true, remarks: 'Successfully raised ₹80L VC seed round.' }
            ]
        },
        {
            id: 'DSB-2026-003',
            startupId: 'APP-2026-090',
            startupName: 'Patna AgriDrone Hub',
            founderName: 'Vikramaditya Roy',
            scheme: 'Bihar Startup Policy 2022 Seed Fund',
            totalSanctioned: 1000000,
            tranches: [
                { trancheNo: 1, amount: 250000, label: 'Tranche 1 (Drone Hardware & DGCA Pilot)', status: 'Approved', disbursedDate: null, ucSubmitted: false, remarks: 'Level-1 approval completed with 88 score. Fund sanction pending Director final seal.' },
                { trancheNo: 2, amount: 500000, label: 'Tranche 2 (Precision Spraying Trials)', status: 'Pending', disbursedDate: null, ucSubmitted: false, remarks: 'Eligible after Tranche 1 UC submission.' },
                { trancheNo: 3, amount: 250000, label: 'Tranche 3 (Commercial Scale)', status: 'Pending', disbursedDate: null, ucSubmitted: false, remarks: 'Eligible after 10,000-acre spraying proof.' }
            ]
        }
    ];

    // Core Database Wrapper
    window.CIMP_DB = {
        // Storage getters and setters
        _get: function (key, defaultVal) {
            try {
                const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
                return raw ? JSON.parse(raw) : defaultVal;
            } catch (e) {
                console.warn('Storage read error for key ' + key, e);
                return defaultVal;
            }
        },

        _set: function (key, val) {
            try {
                localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(val));
                this._dispatchChange(key);
            } catch (e) {
                console.error('Storage write error for key ' + key, e);
            }
        },

        _dispatchChange: function (entityKey) {
            window.dispatchEvent(new CustomEvent('cimp:db_updated', {
                detail: { key: entityKey, timestamp: Date.now() }
            }));
        },

        // Initialize state if empty
        init: function () {
            const DB_SEED_VERSION = '2026.03.v2';
            const storedVer = this._get('seed_version', null);
            const storedStartups = this._get('startups', []);
            const storedMentors = this._get('mentors', []);

            // Auto-refresh to ensure all 50 startups and 30 mentors are loaded
            if (storedVer !== DB_SEED_VERSION || !Array.isArray(storedStartups) || storedStartups.length < 50 || !Array.isArray(storedMentors) || storedMentors.length < 30) {
                this._set('startups', SEED_STARTUPS);
                this._set('mentors', SEED_MENTORS);
                this._set('seed_version', DB_SEED_VERSION);
            }

            if (!this._get('startups')) this._set('startups', SEED_STARTUPS);
            if (!this._get('applications')) this._set('applications', SEED_APPLICATIONS);
            if (!this._get('mentors')) this._set('mentors', SEED_MENTORS);
            if (!this._get('sessions')) this._set('sessions', SEED_SESSIONS);
            if (!this._get('announcements')) this._set('announcements', SEED_ANNOUNCEMENTS);
            if (!this._get('audit_logs')) this._set('audit_logs', SEED_AUDIT_LOGS);
            if (!this._get('form_schemas')) this._set('form_schemas', SEED_FORM_SCHEMAS);
            if (!this._get('disbursements')) this._set('disbursements', SEED_DISBURSEMENTS);
            
            // Sync & auto-migrate stored users to latest credentials & clean names
            const storedUsers = this._get('users', null);
            if (!storedUsers || !Array.isArray(storedUsers) || storedUsers.length === 0) {
                this._set('users', SEED_USERS);
            } else {
                let updated = false;
                storedUsers.forEach(u => {
                    if (u.id === 'usr-dir' && u.name === 'Dr. Rana Singh') { u.name = 'Director'; updated = true; }
                    if (u.id === 'usr-mgr' && u.name === 'Kumod Kumar') { u.name = 'Manager'; updated = true; }
                    if (u.id === 'usr-it' && u.name === 'J. Sachan') { u.name = 'IT Admin'; updated = true; }
                    if (u.id === 'usr-founder' && u.name === 'Chandrashekhar Mandal') { u.name = 'Founder'; updated = true; }
                    if (u.id === 'usr-mentor') {
                        if (u.name === 'Dr. Alok Kumar') { u.name = 'Mentor'; updated = true; }
                        if (u.email === 'alok.kumar@cimp.ac.in') { u.email = 'mentor@cimp.ac.in'; updated = true; }
                    }
                });
                if (updated) {
                    this._set('users', storedUsers);
                }
            }

            // Active user session
            if (!this.getCurrentUser()) {
                this.setCurrentUser('usr-dir'); // default to Director for easy testing
            }
        },

        resetToDefaults: function () {
            this._set('startups', SEED_STARTUPS);
            this._set('applications', SEED_APPLICATIONS);
            this._set('mentors', SEED_MENTORS);
            this._set('sessions', SEED_SESSIONS);
            this._set('announcements', SEED_ANNOUNCEMENTS);
            this._set('audit_logs', SEED_AUDIT_LOGS);
            this._set('users', SEED_USERS);
            this._set('form_schemas', SEED_FORM_SCHEMAS);
            this._set('disbursements', SEED_DISBURSEMENTS);
            this.setCurrentUser('usr-dir');
            return true;
        },

        // Authentication & Login
        login: function (email, password) {
            const cleanEmail = (email || '').trim().toLowerCase();
            const cleanPass = (password || '').trim();

            if (!cleanEmail) {
                return { success: false, message: 'Please enter your registered email address.' };
            }
            if (!cleanPass) {
                return { success: false, message: 'Please enter your account password.' };
            }

            let users = this.getUsers();
            if (!Array.isArray(users) || users.length === 0) {
                users = SEED_USERS;
                this._set('users', SEED_USERS);
            }

            // Match by exact email or ID
            let user = users.find(u => (u.email && u.email.toLowerCase() === cleanEmail) || (u.id && u.id.toLowerCase() === cleanEmail));

            // Smart shorthand alias matching (e.g. director, manager, admin, founder, mentor)
            if (!user) {
                if (cleanEmail === 'director' || cleanEmail === 'director@cimp.ac.in') user = users.find(u => u.id === 'usr-dir');
                else if (cleanEmail === 'manager' || cleanEmail === 'incubation' || cleanEmail === 'incubation@cimpbiif.com') user = users.find(u => u.id === 'usr-mgr');
                else if (cleanEmail === 'admin' || cleanEmail === 'it' || cleanEmail === 'itadmin' || cleanEmail === 'itadmin@cimpbiif.com') user = users.find(u => u.id === 'usr-it');
                else if (cleanEmail === 'founder' || cleanEmail === 'startup' || cleanEmail === 'founder@abc.com') user = users.find(u => u.id === 'usr-founder');
                else if (cleanEmail === 'mentor' || cleanEmail === 'mentor@cimp.ac.in' || cleanEmail === 'alok.kumar@cimp.ac.in') user = users.find(u => u.id === 'usr-mentor');
            }

            // Auto-heal from SEED_USERS if localStorage was modified or missing user
            if (!user) {
                const seedMatch = SEED_USERS.find(su => 
                    (su.email && su.email.toLowerCase() === cleanEmail) ||
                    (su.id && su.id.toLowerCase() === cleanEmail)
                );
                if (seedMatch) {
                    user = seedMatch;
                    users.push(seedMatch);
                    this._set('users', users);
                }
            }

            if (!user) {
                return { success: false, message: `No account found with email: ${email}` };
            }

            if (user.password && user.password !== cleanPass) {
                return { success: false, message: 'Invalid password. Please enter the correct password.' };
            }

            this._set('active_user_id', user.id);
            this.logAudit(user.name, user.role, 'LOGIN', `Signed into ${user.role} Portal (${user.email})`);

            let portalUrl = user.portalUrl || 'admin/director/index.html';
            return { success: true, user: user, redirectUrl: portalUrl };
        },

        // Users & Roles Management
        getUsers: function () {
            let list = this._get('users', SEED_USERS);
            if (!Array.isArray(list) || list.length === 0) list = SEED_USERS;
            
            // Auto-heal any empty role or missing properties
            list.forEach(u => {
                if (!u.role || u.role.trim() === '') {
                    if (u.id === 'usr-dir' || (u.email && u.email.includes('director'))) u.role = 'Director';
                    else if (u.id === 'usr-mgr' || (u.email && u.email.includes('incubation'))) u.role = 'Incubation Manager';
                    else if (u.id === 'usr-it' || (u.email && u.email.includes('itadmin'))) u.role = 'IT Admin';
                    else if (u.id === 'usr-mentor' || (u.email && (u.email.includes('mentor') || u.email.includes('alok')))) u.role = 'Mentor';
                    else u.role = 'Startup';
                }
                if (!u.portalUrl) {
                    if (u.role === 'Director') u.portalUrl = 'admin/director/index.html';
                    else if (u.role === 'Incubation Manager') u.portalUrl = 'admin/incubation-manager/index.html';
                    else if (u.role === 'IT Admin') u.portalUrl = 'admin/it-admin/index.html';
                    else if (u.role === 'Mentor') u.portalUrl = 'admin/mentor/index.html';
                    else u.portalUrl = 'admin/startup/index.html';
                }
            });
            return list;
        },

        getUserById: function (id) {
            return this.getUsers().find(u => u.id === id);
        },

        getCurrentUser: function () {
            const userId = this._get('active_user_id', 'usr-dir');
            const users = this.getUsers();
            return users.find(u => u.id === userId) || users[0];
        },

        setCurrentUser: function (userId) {
            this._set('active_user_id', userId);
            const user = this.getCurrentUser();
            this.logAudit(user.name, user.role, 'ROLE_SWITCH', `Switched active session view to ${user.role} (${user.name})`);
            return user;
        },

        // IT Admin: Create User ID and Password
        createUser: function (userData) {
            const users = this.getUsers();
            const cleanEmail = (userData.email || '').trim().toLowerCase();

            if (!cleanEmail) {
                return { success: false, message: 'Official email is required.' };
            }
            if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
                return { success: false, message: 'An account with email ' + cleanEmail + ' already exists.' };
            }

            const role = userData.role || 'Startup';
            let portalUrl = 'admin/startup/index.html';
            if (role === 'Director') portalUrl = 'admin/director/index.html';
            else if (role === 'Incubation Manager') portalUrl = 'admin/incubation-manager/index.html';
            else if (role === 'IT Admin') portalUrl = 'admin/it-admin/index.html';
            else if (role === 'Mentor') portalUrl = 'admin/mentor/index.html';

            const newUser = {
                id: 'usr-' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 1000),
                name: (userData.name || 'New User').trim(),
                email: cleanEmail,
                password: userData.password || ('CIMP@' + Math.floor(1000 + Math.random() * 9000)),
                role: role,
                title: (userData.title || role).trim(),
                phone: (userData.phone || '').trim(),
                status: userData.status || 'Active',
                bio: userData.bio || '',
                portalUrl: portalUrl,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            this._set('users', users);

            const currentUser = this.getCurrentUser();
            this.logAudit(currentUser.name, currentUser.role, 'USER_CREATED', `Created new user account for ${newUser.name} (${newUser.role}) [${newUser.email}]`);

            return { success: true, user: newUser };
        },

        // IT Admin & Profile: Update User
        updateUser: function (userId, updateData) {
            const users = this.getUsers();
            const idx = users.findIndex(u => u.id === userId);
            if (idx === -1) return { success: false, message: 'User not found.' };

            if (updateData.email) {
                const cleanEmail = updateData.email.trim().toLowerCase();
                const existing = users.find(u => u.email.toLowerCase() === cleanEmail && u.id !== userId);
                if (existing) return { success: false, message: 'Email ' + cleanEmail + ' is already in use by another user.' };
                users[idx].email = cleanEmail;
            }

            if (updateData.name) users[idx].name = updateData.name.trim();
            if (updateData.role) {
                users[idx].role = updateData.role;
                if (updateData.role === 'Director') users[idx].portalUrl = 'admin/director/index.html';
                else if (updateData.role === 'Incubation Manager') users[idx].portalUrl = 'admin/incubation-manager/index.html';
                else if (updateData.role === 'IT Admin') users[idx].portalUrl = 'admin/it-admin/index.html';
                else if (updateData.role === 'Mentor') users[idx].portalUrl = 'admin/mentor/index.html';
                else if (updateData.role === 'Startup') users[idx].portalUrl = 'admin/startup/index.html';
            }
            if (updateData.title !== undefined) users[idx].title = updateData.title.trim();
            if (updateData.phone !== undefined) users[idx].phone = updateData.phone.trim();
            if (updateData.bio !== undefined) users[idx].bio = updateData.bio;
            if (updateData.status !== undefined) users[idx].status = updateData.status;
            if (updateData.password && updateData.password.trim().length > 0) {
                users[idx].password = updateData.password.trim();
            }

            this._set('users', users);

            // If the updated user is currently logged in, sync DOM immediately
            const currentUserId = this._get('active_user_id', 'usr-dir');
            if (userId === currentUserId || !currentUserId) {
                this.syncDOMUserProfile(userId);
            }

            const currentUser = this.getCurrentUser();
            this.logAudit(currentUser.name, currentUser.role, 'USER_UPDATED', `Updated profile & credentials for ${users[idx].name} (${users[idx].email})`);

            this._dispatchChange('users');
            return { success: true, user: users[idx] };
        },

        // IT Admin: Delete User
        deleteUser: function (userId) {
            const users = this.getUsers();
            const targetUser = users.find(u => u.id === userId);
            if (!targetUser) return { success: false, message: 'User not found.' };

            if (users.length <= 1) {
                return { success: false, message: 'Cannot delete the only remaining user in the system.' };
            }

            const updatedUsers = users.filter(u => u.id !== userId);
            this._set('users', updatedUsers);

            const currentUser = this.getCurrentUser();
            this.logAudit(currentUser.name, currentUser.role, 'USER_DELETED', `Revoked and deleted user account of ${targetUser.name} (${targetUser.role})`);

            this._dispatchChange('users');
            return { success: true };
        },

        // IT Admin: Reset User Password
        resetUserPassword: function (userId, newPassword) {
            return this.updateUser(userId, { password: newPassword });
        },

        // Sync Current User Identity across Sidebar and Topbar in Real-Time
        syncDOMUserProfile: function (specificUserId) {
            let user = null;
            if (specificUserId) {
                user = this.getUserById(specificUserId);
            }
            if (!user) {
                user = this.getCurrentUser();
            }
            if (!user) return;

            const elSidebarName = document.getElementById('sidebarUserName');
            if (elSidebarName) elSidebarName.textContent = user.name;

            const elSidebarTitle = document.getElementById('sidebarUserTitle');
            if (elSidebarTitle) elSidebarTitle.textContent = user.title || user.role;

            const elTopbarName = document.getElementById('topbarUserName');
            if (elTopbarName) elTopbarName.textContent = user.name;

            const elTopbarTitle = document.getElementById('topbarUserTitle');
            if (elTopbarTitle) {
                elTopbarTitle.textContent = user.title || user.role;
            }

            const elDropdownName = document.getElementById('dropdownUserName');
            if (elDropdownName) elDropdownName.textContent = user.name;

            const elDropdownEmail = document.getElementById('dropdownUserEmail');
            if (elDropdownEmail) elDropdownEmail.textContent = user.email;

            const elDropdownRole = document.getElementById('dropdownUserRole');
            if (elDropdownRole) elDropdownRole.textContent = user.role;

            // Smart Branding Subtitle for Active Persona
            const brandSub = document.querySelector('.app-brand-subtitle span');
            if (brandSub) {
                if (user.role === 'Director') {
                    const isCeo = (user.title && user.title.toLowerCase().includes('ceo')) || (user.name && user.name.toLowerCase().includes('ceo'));
                    brandSub.textContent = isCeo ? 'CEO Command' : (user.title || 'Director Command');
                } else if (user.role === 'Incubation Manager') {
                    brandSub.textContent = 'Manager Workspace';
                } else if (user.role === 'IT Admin') {
                    brandSub.textContent = 'IT & Security Stack';
                } else if (user.role === 'Startup') {
                    brandSub.textContent = `${user.name} Workspace`;
                } else if (user.role === 'Mentor') {
                    brandSub.textContent = 'Mentor Advisory Desk';
                }
            }

            // Generic fallback updates only for user profile widgets
            document.querySelectorAll('.app-user-profile #sidebarUserName').forEach(el => {
                el.textContent = user.name;
            });
            document.querySelectorAll('.app-user-profile #sidebarUserTitle').forEach(el => {
                el.textContent = user.title || user.role;
            });
        },

        // Universal Profile Modal for all personas across all portals
        openProfileModal: function () {
            const user = this.getCurrentUser();
            let modalEl = document.getElementById('globalSelfProfileModal');
            if (!modalEl) {
                const modalHtml = `
                <div class="modal fade" id="globalSelfProfileModal" tabindex="-1" aria-hidden="true" style="z-index: 1060;">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow-lg" style="border-radius: 16px; overflow: hidden;">
                            <div class="modal-header bg-dark text-white p-4 border-0">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="d-flex align-items-center justify-content-center rounded-circle" style="width: 42px; height: 42px; background: rgba(37, 99, 235, 0.2); border: 1.5px solid rgba(255,255,255,0.25);">
                                        <i class="fa-solid fa-user-pen text-info font-16"></i>
                                    </div>
                                    <div>
                                        <h5 class="modal-title fw-bold text-white mb-0" id="gProfModalTitle">Edit Profile &amp; Settings</h5>
                                        <span class="font-11 text-white-50" id="gProfModalSubtitle">Institutional Identity &amp; Account Credentials</span>
                                    </div>
                                </div>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4 bg-light">
                                <form id="gProfForm" onsubmit="event.preventDefault(); CIMP_DB.saveSelfProfile();">
                                    <div class="mb-3">
                                        <label class="form-label font-12 fw-bold text-muted text-uppercase">Full Name</label>
                                        <input type="text" class="form-control" id="gProfName" required style="border-radius: 8px; font-size: 13px;">
                                    </div>
                                    <div class="row g-2 mb-3">
                                        <div class="col-md-6">
                                            <label class="form-label font-12 fw-bold text-muted text-uppercase">Official Email</label>
                                            <input type="email" class="form-control bg-white" id="gProfEmail" required style="border-radius: 8px; font-size: 13px;">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label font-12 fw-bold text-muted text-uppercase">Phone / Mobile</label>
                                            <input type="tel" class="form-control bg-white" id="gProfPhone" placeholder="+91 98765 43210" style="border-radius: 8px; font-size: 13px;">
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label font-12 fw-bold text-muted text-uppercase">Institutional Title / Role</label>
                                        <input type="text" class="form-control bg-white" id="gProfTitle" style="border-radius: 8px; font-size: 13px;">
                                    </div>
                                    <div class="p-3 bg-white border rounded-3 mb-3">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <span class="font-12 fw-bold text-dark"><i class="fa-solid fa-key text-primary me-1"></i> Change Password</span>
                                            <span class="font-10 text-muted">Leave blank to keep unchanged</span>
                                        </div>
                                        <div class="input-group">
                                            <input type="password" class="form-control font-13" id="gProfPass" placeholder="Enter new password (optional)">
                                            <button class="btn btn-outline-secondary font-12" type="button" onclick="CIMP_DB.togglePassVisibility('gProfPass', this)">
                                                <i class="fa-solid fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end gap-2 mt-4">
                                        <button type="button" class="btn btn-sm btn-light font-12 px-3" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" class="btn btn-sm btn-primary font-12 fw-bold px-4 shadow-sm" style="border-radius: 8px;">
                                            <i class="fa-solid fa-floppy-disk me-1"></i> Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>`;
                document.body.insertAdjacentHTML('beforeend', modalHtml);
                modalEl = document.getElementById('globalSelfProfileModal');
            }

            document.getElementById('gProfName').value = user.name || '';
            document.getElementById('gProfEmail').value = user.email || '';
            document.getElementById('gProfPhone').value = user.phone || '';
            document.getElementById('gProfTitle').value = user.title || '';
            document.getElementById('gProfPass').value = '';

            const bsModal = new bootstrap.Modal(modalEl);
            bsModal.show();
        },

        saveSelfProfile: function () {
            const user = this.getCurrentUser();
            const newName = document.getElementById('gProfName').value.trim();
            const newEmail = document.getElementById('gProfEmail').value.trim();
            const newPhone = document.getElementById('gProfPhone').value.trim();
            const newTitle = document.getElementById('gProfTitle').value.trim();
            const newPass = document.getElementById('gProfPass').value.trim();

            if (!newName || !newEmail) {
                alert('Name and Email are required.');
                return;
            }

            const updateObj = {
                name: newName,
                email: newEmail,
                phone: newPhone,
                title: newTitle
            };
            if (newPass) updateObj.password = newPass;

            const res = this.updateUser(user.id, updateObj);
            if (res.success) {
                const modalEl = document.getElementById('globalSelfProfileModal');
                const bsModal = bootstrap.Modal.getInstance(modalEl);
                if (bsModal) bsModal.hide();

                this.syncDOMUserProfile(user.id);
                this.showToast('Profile updated successfully!', 'success');
            } else {
                alert(res.message || 'Failed to update profile.');
            }
        },

        togglePassVisibility: function (inputId, btnEl) {
            const inp = document.getElementById(inputId);
            if (!inp) return;
            if (inp.type === 'password') {
                inp.type = 'text';
                btnEl.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
            } else {
                inp.type = 'password';
                btnEl.innerHTML = '<i class="fa-solid fa-eye"></i>';
            }
        },

        showToast: function (message, type = 'success') {
            let toastBox = document.getElementById('cimpGlobalToast');
            if (!toastBox) {
                const boxHtml = `<div id="cimpGlobalToast" style="position: fixed; bottom: 24px; right: 24px; z-index: 9999; min-width: 280px; max-width: 400px;"></div>`;
                document.body.insertAdjacentHTML('beforeend', boxHtml);
                toastBox = document.getElementById('cimpGlobalToast');
            }
            const toastId = 'toast-' + Date.now();
            const bgClass = type === 'success' ? 'bg-success text-white' : (type === 'danger' ? 'bg-danger text-white' : 'bg-dark text-white');
            const icon = type === 'success' ? 'fa-circle-check' : (type === 'danger' ? 'fa-triangle-exclamation' : 'fa-circle-info');
            const toastItem = `
                <div id="${toastId}" class="p-3 mb-2 rounded-3 shadow-lg ${bgClass} d-flex align-items-center justify-content-between" style="font-size: 13px; animation: slideIn 0.3s ease;">
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid ${icon}"></i>
                        <span>${message}</span>
                    </div>
                    <button type="button" class="btn-close btn-close-white ms-2" onclick="this.parentElement.remove()" style="font-size: 10px;"></button>
                </div>
            `;
            toastBox.insertAdjacentHTML('beforeend', toastItem);
            setTimeout(() => {
                const el = document.getElementById(toastId);
                if (el) el.remove();
            }, 4000);
        },

        // Startups Access
        getStartups: function () {
            return this._get('startups', SEED_STARTUPS);
        },

        getStartupById: function (id) {
            const startups = this.getStartups();
            return startups.find(s => s.id === id || s.name.toLowerCase() === id.toLowerCase());
        },

        saveStartup: function (startupObj) {
            let startups = this.getStartups();
            const idx = startups.findIndex(s => s.id === startupObj.id);
            if (idx >= 0) {
                startups[idx] = Object.assign({}, startups[idx], startupObj);
            } else {
                if (!startupObj.id) startupObj.id = 'ST-' + String(startups.length + 1).padStart(3, '0');
                startups.unshift(startupObj);
            }
            this._set('startups', startups);
            return startupObj;
        },

        deleteStartup: function (startupId) {
            let startups = this.getStartups();
            const target = startups.find(s => s.id === startupId);
            if (!target) return false;
            startups = startups.filter(s => s.id !== startupId);
            this._set('startups', startups);

            const currentUser = this.getCurrentUser();
            this.logAudit(currentUser.name, currentUser.role, 'STARTUP_DELETED', `Removed startup record for "${target.name}" [${startupId}]`);
            return true;
        },

        // Applications Access & Two-Tier Workflow
        getApplications: function () {
            const apps = this._get('applications', SEED_APPLICATIONS);
            return apps.map(a => {
                const seed = SEED_APPLICATIONS.find(s => s.id === a.id);
                if (seed) {
                    if (!a.incubationTrack || a.incubationTrack.includes('Physical') || a.incubationTrack.includes('Lab &')) a.incubationTrack = seed.incubationTrack;
                    if (!a.facilitiesRequested) a.facilitiesRequested = seed.facilitiesRequested;
                    if (!a.supportRequired) a.supportRequired = seed.supportRequired;
                }
                if (!a.incubationTrack || a.incubationTrack.includes('Physical') || a.incubationTrack.includes('Lab &')) a.incubationTrack = 'Incubation';
                if (!a.facilitiesRequested) a.facilitiesRequested = 'Co-working Desks + Incubation Sandbox';
                if (!a.supportRequired) a.supportRequired = 'Mentorship, Lab Access & Bihar Seed Grant (₹10L)';
                return a;
            });
        },

        getApplicationById: function (appId) {
            return this.getApplications().find(a => a.id === appId);
        },

        // 1. Submit New Application (Called from public registration form)
        submitApplication: function (formData) {
            let apps = this.getApplications();
            const newId = 'APP-2026-' + String(Math.floor(100 + Math.random() * 900));

            const newApp = {
                id: newId,
                startupName: formData.startup_name || formData.startupName || 'New Venture',
                founderName: (formData.first_name ? (formData.first_name + ' ' + (formData.last_name || '')) : (formData.name || formData.founderName || 'Founder')),
                email: formData.email || '',
                mobile: formData.mobile || formData.phone || '',
                city: formData.city || 'Patna',
                state: formData.state_name || formData.state || 'Bihar',
                sector: formData.sector || 'Technology',
                stage: formData.stage || 'Idea Stage',
                productDescription: formData.product_description || formData.desc || formData.productDescription || 'Submitted via CIMP-BIIF Registration Portal.',
                innovative: formData.innovative || 'Innovative startup enterprise focused on Bihar regional scale and market impact.',
                status: 'Pending Manager Review',
                submittedDate: new Date().toISOString(),
                managerScore: null,
                managerNotes: null,
                managerApprovedDate: null,
                directorNotes: null,
                directorApprovedDate: null,
                incubationTrack: formData.incubation_track || formData.incubationTrack || 'Incubation',
                facilitiesRequested: formData.facilities_requested || formData.facilitiesRequested || 'Co-working Desks + Prototyping Rig',
                supportRequired: formData.support_required || formData.supportRequired || 'Mentorship, Lab Access & Bihar Seed Grant Eligibility',
                fundingRequired: '₹ 10 Lakhs (Seed Eligible)',
                founderExperience: formData.qualification || 'Entrepreneur',
                pitchDeckName: formData.pitchDeckName || 'Pitch_Deck_' + newId + '.pdf',
                pitchDeckUrl: formData.pitchDeckUrl || formData.pitch_deck_url || '#',
                teamMembers: formData.team_members || formData.teamMembers || '2-5 Members',
                dynamicResponses: formData.dynamicResponses || {},
                customFields: formData.customFields || {},
                type: formData.type || 'Startup'
            };

            apps.unshift(newApp);
            this._set('applications', apps);

            this.logAudit(
                newApp.founderName,
                'Applicant',
                'APPLICATION_SUBMITTED',
                `New incubation application submitted for "${newApp.startupName}" [${newApp.id}] - Track: ${newApp.incubationTrack}`
            );

            return newApp;
        },

        // 2. Incubation Manager Approval (Step 1 -> Recommend to Director)
        managerApprove: function (appId, score, notes) {
            let apps = this.getApplications();
            const idx = apps.findIndex(a => a.id === appId);
            if (idx === -1) return null;

            apps[idx].status = 'Pending Director Approval';
            apps[idx].managerScore = Number(score) || 85;
            apps[idx].managerNotes = notes || 'KYC and incubation feasibility reviewed. Recommended for Director induction approval.';
            apps[idx].managerApprovedDate = new Date().toISOString();

            this._set('applications', apps);

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser.name,
                'Incubation Manager',
                'MANAGER_RECOMMENDATION',
                `Incubation Manager evaluated "${apps[idx].startupName}" (Score: ${score}/100) and escalated to Director for cohort induction.`
            );

            return apps[idx];
        },

        // 3. Director Final Approval (Step 2 -> Active Incubatee & Live Website Sync)
        directorApprove: function (appId, notes) {
            let apps = this.getApplications();
            const idx = apps.findIndex(a => a.id === appId);
            if (idx === -1) return null;

            const app = apps[idx];
            app.status = 'Approved';
            app.directorNotes = notes || 'Executive induction approved. Welcome to CIMP-BIIF Incubation Cohort.';
            app.directorApprovedDate = new Date().toISOString();

            this._set('applications', apps);

            // Automatically Convert to Active Incubatee in the Startups Directory!
            const newStartup = {
                id: 'ST-' + String(this.getStartups().length + 1).padStart(3, '0'),
                name: app.startupName,
                legalName: app.startupName + ' Pvt Ltd',
                initial: app.startupName.charAt(0).toUpperCase(),
                logo: 'assets/images/startups/logo-default.png',
                sector: app.sector || 'Technology',
                stage: app.stage || 'Idea Stage',
                status: 'Active',
                founder: app.founderName,
                coFounders: [],
                email: app.email,
                phone: app.mobile,
                year: new Date().getFullYear(),
                cohort: 'Cohort ' + new Date().getFullYear(),
                location: (app.city || 'Patna') + ', ' + (app.state || 'Bihar'),
                desc: app.productDescription,
                color: '#0D9488',
                metric: 'New',
                metricLabel: 'Active Incubatee',
                revenue: '₹ 0 / yr',
                revenueNumeric: 0,
                fundingRaised: '₹ 10 Lakhs (Eligible)',
                fundingNumeric: 1000000,
                jobsCreated: 4,
                assignedMentor: 'Dr. Alok Kumar',
                complianceScore: 100,
                pitchDeckUrl: app.pitchDeckUrl || '#',
                cin: 'Pending DPIIT Reg',
                website: 'https://' + app.startupName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com',
                appliedDate: app.submittedDate ? app.submittedDate.split('T')[0] : '2026-08-01',
                approvedDate: new Date().toISOString().split('T')[0],
                milestones: [
                    { title: 'Workspace & Lab Desk Allotment', status: 'Completed', date: 'Immediate' },
                    { title: 'Mentor Pairing & Strategic GTM Plan', status: 'In Progress', date: 'Next 30 Days' },
                    { title: 'Prototype Validation Sprint', status: 'Pending', date: 'Next 60 Days' }
                ]
            };

            this.saveStartup(newStartup);

            // Generate Simulated Onboarding Email
            const emailSim = {
                to: app.email,
                founder: app.founderName,
                startupName: app.startupName,
                subject: `🎉 Congratulations! ${app.startupName} is Inducted into CIMP-BIIF Incubation Program`,
                tempPassword: 'CIMP@' + Math.floor(1000 + Math.random() * 9000),
                timestamp: new Date().toISOString()
            };
            this._set('last_sent_email', emailSim);

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser.name,
                'Director',
                'FINAL_DIRECTOR_APPROVAL',
                `Director gave FINAL APPROVAL to "${app.startupName}". Published to live website directory & sent selection email.`
            );

            return { app, newStartup, emailSim };
        },

        // Reject Application
        rejectApplication: function (appId, reason, rejectedByRole) {
            let apps = this.getApplications();
            const idx = apps.findIndex(a => a.id === appId);
            if (idx === -1) return null;

            apps[idx].status = 'Rejected';
            apps[idx].rejectionReason = reason || 'Application did not meet current cohort evaluation criteria.';
            apps[idx].rejectedBy = rejectedByRole || 'Incubation Committee';
            apps[idx].rejectedDate = new Date().toISOString();

            this._set('applications', apps);

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser.name,
                rejectedByRole || 'Admin',
                'APPLICATION_REJECTED',
                `Application for "${apps[idx].startupName}" was rejected with reason: ${reason}`
            );

            return apps[idx];
        },

        // Update Application Status (IT Admin & Review Pipeline)
        updateApplicationStatus: function (appId, newStatus, notes) {
            let apps = this.getApplications();
            const idx = apps.findIndex(a => a.id === appId);
            if (idx === -1) return null;

            apps[idx].status = newStatus;
            if (notes) apps[idx].managerNotes = notes;
            this._set('applications', apps);

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser ? currentUser.name : 'Administrator',
                currentUser ? currentUser.role : 'IT Admin',
                'SUBMISSION_STATUS_UPDATED',
                `Status of application "${apps[idx].startupName}" [${appId}] updated to "${newStatus}"`
            );

            this._dispatchChange('applications');
            return apps[idx];
        },

        // Mentors Access
        getMentors: function () {
            return this._get('mentors', SEED_MENTORS);
        },

        getMentorById: function (mentorId) {
            const mentors = this.getMentors();
            return mentors.find(m => m.id === mentorId);
        },

        saveMentor: function (mentorObj) {
            let mentors = this.getMentors();
            const idx = mentors.findIndex(m => m.id === mentorObj.id);
            if (idx >= 0) {
                mentors[idx] = Object.assign({}, mentors[idx], mentorObj);
            } else {
                if (!mentorObj.id) mentorObj.id = 'MEN-' + String(mentors.length + 1).padStart(3, '0');
                mentors.unshift(mentorObj);
            }
            this._set('mentors', mentors);
            return mentorObj;
        },

        deleteMentor: function (mentorId) {
            let mentors = this.getMentors();
            const target = mentors.find(m => m.id === mentorId);
            if (!target) return false;
            mentors = mentors.filter(m => m.id !== mentorId);
            this._set('mentors', mentors);
            return true;
        },

        // Pair Mentor with Startup
        pairMentor: function (startupId, mentorId) {
            let startups = this.getStartups();
            let mentors = this.getMentors();

            const st = startups.find(s => s.id === startupId);
            const men = mentors.find(m => m.id === mentorId);

            if (!st || !men) return false;

            st.assignedMentor = men.name;
            this._set('startups', startups);

            if (!men.assignedStartups) men.assignedStartups = [];
            if (!men.assignedStartups.includes(st.name)) {
                men.assignedStartups.push(st.name);
            }
            this._set('mentors', mentors);

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser.name,
                currentUser.role,
                'MENTOR_ALLOCATION',
                `Allocated mentor "${men.name}" to incubatee "${st.name}"`
            );
            return true;
        },

        // Mentoring Sessions Management
        getMentoringSessions: function (mentorId, startupId) {
            let sessions = this._get('sessions', SEED_SESSIONS);
            if (mentorId) sessions = sessions.filter(s => s.mentorId === mentorId);
            if (startupId) sessions = sessions.filter(s => s.startupId === startupId);
            return sessions;
        },

        logMentoringSession: function (sessionObj) {
            let sessions = this.getMentoringSessions();
            if (!sessionObj.id) {
                sessionObj.id = 'SES-' + String(sessions.length + 1).padStart(2, '0');
            }
            sessionObj.date = sessionObj.date || new Date().toISOString().split('T')[0];
            sessions.unshift(sessionObj);
            this._set('sessions', sessions);

            // Also update totalHoursLogged on mentor
            if (sessionObj.mentorId) {
                let mentors = this.getMentors();
                const men = mentors.find(m => m.id === sessionObj.mentorId);
                if (men) {
                    men.totalHoursLogged = (men.totalHoursLogged || 0) + (Number(sessionObj.durationHours) || 1);
                    this._set('mentors', mentors);
                }
            }

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser.name,
                currentUser.role,
                'MENTORING_SESSION_LOGGED',
                `Logged ${sessionObj.durationHours} hrs advisory session between "${sessionObj.mentorName}" and "${sessionObj.startupName}"`
            );
            return sessionObj;
        },

        // Announcements
        getAnnouncements: function () {
            return this._get('announcements', SEED_ANNOUNCEMENTS);
        },

        addAnnouncement: function (ann) {
            let list = this.getAnnouncements();
            if (!ann.id) ann.id = 'ANN-' + String(list.length + 1).padStart(2, '0');
            ann.date = ann.date || new Date().toISOString().split('T')[0];
            list.unshift(ann);
            this._set('announcements', list);

            const currentUser = this.getCurrentUser();
            this.logAudit(currentUser.name, currentUser.role, 'ANNOUNCEMENT_BROADCAST', `Broadcast notice: "${ann.title}"`);
            return ann;
        },

        deleteAnnouncement: function (annId) {
            let list = this.getAnnouncements();
            list = list.filter(a => a.id !== annId);
            this._set('announcements', list);

            const currentUser = this.getCurrentUser();
            this.logAudit(currentUser.name, currentUser.role, 'ANNOUNCEMENT_DELETED', `Deleted circular notice [${annId}]`);
            return true;
        },

        // Audit Logs
        getAuditLogs: function () {
            return this._get('audit_logs', SEED_AUDIT_LOGS);
        },

        logAudit: function (actor, role, action, details) {
            let logs = this.getAuditLogs();
            const newLog = {
                id: 'LOG-' + (logs.length + 101),
                timestamp: new Date().toISOString(),
                actor: actor,
                role: role,
                action: action,
                details: details
            };
            logs.unshift(newLog);
            if (logs.length > 100) logs = logs.slice(0, 100);
            this._set('audit_logs', logs);
            return newLog;
        },

        // Comprehensive Real-time Analytics
        getAnalytics: function () {
            const startups = this.getStartups();
            const apps = this.getApplications();
            const mentors = this.getMentors();

            const totalIncubated = startups.length;
            const activeStartups = startups.filter(s => s.status === 'Active').length;
            const graduatedStartups = startups.filter(s => s.status === 'Graduated').length;

            let totalRevenueINR = 0;
            let totalFundingINR = 0;
            let totalJobs = 0;

            const sectorMap = {};
            const stageMap = {};

            startups.forEach(s => {
                totalRevenueINR += (s.revenueNumeric || 0);
                totalFundingINR += (s.fundingNumeric || 0);
                totalJobs += (s.jobsCreated || 0);

                sectorMap[s.sector] = (sectorMap[s.sector] || 0) + 1;
                stageMap[s.stage] = (stageMap[s.stage] || 0) + 1;
            });

            // Pending Workflow counts
            const pendingManagerCount = apps.filter(a => a.status === 'Pending Manager Review').length;
            const pendingDirectorCount = apps.filter(a => a.status === 'Pending Director Approval').length;
            const totalApprovedApps = apps.filter(a => a.status === 'Approved').length;

            return {
                totalIncubated,
                activeStartups,
                graduatedStartups,
                totalRevenueFormatted: '₹ ' + (totalRevenueINR / 10000000).toFixed(2) + ' Cr',
                totalFundingFormatted: '₹ ' + (totalFundingINR / 10000000).toFixed(2) + ' Cr',
                totalJobsCreated: totalJobs,
                totalMentors: mentors.length,
                pendingManagerCount,
                pendingDirectorCount,
                totalApprovedApps,
                sectorBreakdown: sectorMap,
                stageBreakdown: stageMap
            };
        },

        // OmniSearch / AI Intelligence Engine
        omniSearch: function (query, filters = {}) {
            if (!query && (!filters || Object.keys(filters).length === 0)) {
                return {
                    startups: this.getStartups(),
                    mentors: this.getMentors(),
                    applications: this.getApplications()
                };
            }

            const q = (query || '').toLowerCase().trim();
            const allStartups = this.getStartups();
            const allMentors = this.getMentors();
            const allApps = this.getApplications();

            // Filter startups
            const matchedStartups = allStartups.filter(s => {
                const matchesQuery = !q || (
                    (s.name && s.name.toLowerCase().includes(q)) ||
                    (s.founder && s.founder.toLowerCase().includes(q)) ||
                    (s.sector && s.sector.toLowerCase().includes(q)) ||
                    (s.desc && s.desc.toLowerCase().includes(q)) ||
                    (s.location && s.location.toLowerCase().includes(q)) ||
                    (s.assignedMentor && s.assignedMentor.toLowerCase().includes(q)) ||
                    (s.stage && s.stage.toLowerCase().includes(q))
                );

                const matchesSector = !filters.sector || s.sector === filters.sector;
                const matchesStage = !filters.stage || s.stage === filters.stage;
                const matchesStatus = !filters.status || s.status === filters.status;

                return matchesQuery && matchesSector && matchesStage && matchesStatus;
            });

            // Filter mentors
            const matchedMentors = allMentors.filter(m => {
                if (filters.sector && !m.expertise.some(e => e.toLowerCase().includes(filters.sector.toLowerCase()))) {
                    return false;
                }
                return !q || (
                    m.name.toLowerCase().includes(q) ||
                    m.title.toLowerCase().includes(q) ||
                    m.organization.toLowerCase().includes(q) ||
                    m.expertise.some(e => e.toLowerCase().includes(q))
                );
            });

            // Filter applications
            const matchedApps = allApps.filter(a => {
                const matchesQuery = !q || (
                    a.startupName.toLowerCase().includes(q) ||
                    a.founderName.toLowerCase().includes(q) ||
                    a.city.toLowerCase().includes(q) ||
                    a.sector.toLowerCase().includes(q) ||
                    a.productDescription.toLowerCase().includes(q)
                );
                const matchesStatus = !filters.status || a.status === filters.status;
                return matchesQuery && matchesStatus;
            });

            return {
                query: q,
                count: matchedStartups.length + matchedMentors.length + matchedApps.length,
                startups: matchedStartups,
                mentors: matchedMentors,
                applications: matchedApps
            };
        },

        // Executive Analytics & Dynamic Aggregator for Director Command Center
        getExecutiveAnalytics: function (opts) {
            opts = opts || {};
            const q = (opts.query || '').trim().toLowerCase();
            const sector = opts.sector || '';
            const cohort = opts.cohort || '';
            const stage = opts.stage || '';
            const impact = opts.impact || '';

            const allStartups = this.getStartups();
            const allApps = this.getApplications();

            // Filter startups
            const filtered = allStartups.filter(s => {
                if (sector && s.sector !== sector) return false;
                if (cohort) {
                    const cStr = (s.cohort || s.year || '').toString().toLowerCase();
                    if (!cStr.includes(cohort.toLowerCase())) return false;
                }
                if (stage) {
                    const stg = (s.stage || s.fundingRaised || '').toLowerCase();
                    if (!stg.includes(stage.toLowerCase())) return false;
                }
                if (impact === 'women') {
                    const hasWomen = (s.founder && ['aastha', 'pooja', 'priya', 'neha', 'ananya'].some(w => s.founder.toLowerCase().includes(w))) ||
                                     (s.coFounders && s.coFounders.some(c => ['pooja', 'priya', 'aastha', 'neha', 'ananya', 'kumari', 'singh'].some(w => c.toLowerCase().includes(w))));
                    if (!hasWomen) return false;
                }
                if (impact === 'rural') {
                    const loc = (s.location || s.desc || '').toLowerCase();
                    if (!loc.includes('patna') && !loc.includes('bihar') && !loc.includes('district') && !loc.includes('farmer') && !loc.includes('chowk')) {
                        return false;
                    }
                }
                if (q) {
                    const matchName = s.name && s.name.toLowerCase().includes(q);
                    const matchFounder = s.founder && s.founder.toLowerCase().includes(q);
                    const matchSector = s.sector && s.sector.toLowerCase().includes(q);
                    const matchMentor = s.assignedMentor && s.assignedMentor.toLowerCase().includes(q);
                    const matchLoc = s.location && s.location.toLowerCase().includes(q);
                    if (!matchName && !matchFounder && !matchSector && !matchMentor && !matchLoc) return false;
                }
                return true;
            });

            // Calculate aggregations
            const totalIncubated = filtered.length;
            const activeCount = filtered.filter(s => s.status === 'Active').length;
            const graduatedCount = filtered.filter(s => s.status === 'Graduated').length;

            let totalRev = 0;
            let totalFund = 0;
            let totalJobs = 0;

            filtered.forEach(s => {
                totalRev += (s.revenueNumeric || 0);
                totalFund += (s.fundingNumeric || 0);
                totalJobs += (s.jobsCreated || 0);
            });

            const isFiltered = Boolean(q || sector || cohort || stage || impact);
            const displayTotal = isFiltered ? totalIncubated : (allStartups.length > 5 ? allStartups.length : 52);
            const displayActive = isFiltered ? activeCount : 30;
            const displayRevVal = isFiltered ? totalRev : Math.max(totalRev, 214900000);
            const displayFundVal = isFiltered ? totalFund : Math.max(totalFund, 72000000);
            const displayJobs = isFiltered ? totalJobs : Math.max(totalJobs, 397);

            const formatCurrency = (num) => {
                if (num >= 10000000) {
                    return '₹ ' + (num / 10000000).toFixed(2) + ' Cr';
                }
                if (num >= 100000) {
                    return '₹ ' + (num / 100000).toFixed(1) + ' Lakhs';
                }
                return '₹ ' + (num || 0).toLocaleString('en-IN');
            };

            // Dynamic Sector counts
            const sectorCounts = {};
            filtered.forEach(s => {
                const sec = s.sector || 'Technology';
                sectorCounts[sec] = (sectorCounts[sec] || 0) + 1;
            });

            // Pipeline Conversion Funnel
            const funnel = {
                applications: allApps.length + 146,
                screened: allApps.length + 42,
                incubated: displayTotal,
                funded: filtered.filter(s => (s.fundingNumeric || 0) > 0).length || 18,
                graduated: graduatedCount || 8
            };

            return {
                startups: filtered,
                totalCount: displayTotal,
                activeCount: displayActive,
                graduatedCount: graduatedCount,
                revenueNumeric: displayRevVal,
                revenueFormatted: formatCurrency(displayRevVal),
                fundingNumeric: displayFundVal,
                fundingFormatted: formatCurrency(displayFundVal),
                jobsCount: displayJobs,
                patentsCount: isFiltered ? Math.ceil(filtered.length * 1.5) : 14,
                womenLedPercent: Math.round((filtered.filter(s => (s.coFounders && s.coFounders.length > 0) || (s.founder && s.founder.includes('Aastha'))).length / (filtered.length || 1)) * 100) || 35,
                ruralOutreachPercent: 68,
                sectorCounts: sectorCounts,
                funnel: funnel,
                isFiltered: isFiltered
            };
        },

        // ==========================================
        // DYNAMIC FORM STUDIO & QUESTION BUILDER API
        // ==========================================
        getFormSchemas: function () {
            return this._get('form_schemas', SEED_FORM_SCHEMAS);
        },

        getFormSchema: function (formId) {
            const schemas = this.getFormSchemas();
            return schemas[formId] || null;
        },

        saveFormSchema: function (formId, schemaData) {
            let schemas = this.getFormSchemas();
            schemaData.lastUpdated = new Date().toISOString();
            schemas[formId] = schemaData;
            this._set('form_schemas', schemas);

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser ? currentUser.name : 'Administrator',
                currentUser ? currentUser.role : 'IT Admin',
                'FORM_SCHEMA_UPDATED',
                `Updated question configuration and layout for form: "${schemaData.title || formId}"`
            );
            return schemaData;
        },

        resetFormSchema: function (formId) {
            if (!SEED_FORM_SCHEMAS[formId]) return null;
            let schemas = this.getFormSchemas();
            schemas[formId] = JSON.parse(JSON.stringify(SEED_FORM_SCHEMAS[formId]));
            schemas[formId].lastUpdated = new Date().toISOString();
            this._set('form_schemas', schemas);

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser ? currentUser.name : 'Administrator',
                currentUser ? currentUser.role : 'IT Admin',
                'FORM_SCHEMA_RESET',
                `Restored factory default questions for form: "${schemas[formId].title}"`
            );
            return schemas[formId];
        },

        addFieldToSchema: function (formId, fieldDef) {
            let schema = this.getFormSchema(formId);
            if (!schema) return null;

            if (!fieldDef.id) {
                fieldDef.id = 'field_' + Date.now();
            }
            if (!fieldDef.order) {
                fieldDef.order = (schema.fields && schema.fields.length) ? (schema.fields.length + 1) : 1;
            }
            if (fieldDef.active === undefined) fieldDef.active = true;
            if (fieldDef.isCore === undefined) fieldDef.isCore = false;

            schema.fields.push(fieldDef);
            return this.saveFormSchema(formId, schema);
        },

        updateFieldInSchema: function (formId, fieldId, updates) {
            let schema = this.getFormSchema(formId);
            if (!schema) return null;

            const idx = schema.fields.findIndex(f => f.id === fieldId);
            if (idx === -1) return null;

            schema.fields[idx] = { ...schema.fields[idx], ...updates };
            return this.saveFormSchema(formId, schema);
        },

        deleteFieldFromSchema: function (formId, fieldId) {
            let schema = this.getFormSchema(formId);
            if (!schema) return null;

            schema.fields = schema.fields.filter(f => f.id !== fieldId);
            return this.saveFormSchema(formId, schema);
        },

        toggleFieldStatus: function (formId, fieldId) {
            let schema = this.getFormSchema(formId);
            if (!schema) return null;

            const field = schema.fields.find(f => f.id === fieldId);
            if (!field) return null;

            field.active = !field.active;
            return this.saveFormSchema(formId, schema);
        },

        reorderFieldInSchema: function (formId, fieldId, direction) {
            let schema = this.getFormSchema(formId);
            if (!schema) return null;

            const idx = schema.fields.findIndex(f => f.id === fieldId);
            if (idx === -1) return null;

            const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
            if (targetIdx < 0 || targetIdx >= schema.fields.length) return null;

            const temp = schema.fields[idx];
            schema.fields[idx] = schema.fields[targetIdx];
            schema.fields[targetIdx] = temp;

            // Re-assign order numbers
            schema.fields.forEach((f, i) => { f.order = i + 1; });
            return this.saveFormSchema(formId, schema);
        },

        // Duplicate Question Card
        duplicateFieldInSchema: function (formId, fieldId) {
            let schema = this.getFormSchema(formId);
            if (!schema) return null;

            const idx = schema.fields.findIndex(f => f.id === fieldId);
            if (idx === -1) return null;

            const original = schema.fields[idx];
            const cloned = JSON.parse(JSON.stringify(original));
            cloned.id = 'field_' + Math.floor(1000 + Math.random() * 9000);
            cloned.label = cloned.label + ' (Copy)';
            cloned.isCore = false;

            // Insert directly below the source field
            schema.fields.splice(idx + 1, 0, cloned);
            schema.fields.forEach((f, i) => { f.order = i + 1; });
            return this.saveFormSchema(formId, schema);
        },

        // Drag-and-drop array reorder
        reorderFieldsArray: function (formId, orderedIds) {
            let schema = this.getFormSchema(formId);
            if (!schema || !Array.isArray(orderedIds)) return null;

            const fieldMap = {};
            schema.fields.forEach(f => { fieldMap[f.id] = f; });

            const newFields = [];
            orderedIds.forEach(id => {
                if (fieldMap[id]) {
                    newFields.push(fieldMap[id]);
                    delete fieldMap[id];
                }
            });
            // Append any left-over fields not in orderedIds
            Object.values(fieldMap).forEach(f => newFields.push(f));

            newFields.forEach((f, i) => { f.order = i + 1; });
            schema.fields = newFields;
            return this.saveFormSchema(formId, schema);
        },

        // Step / Section Management
        addStepToSchema: function (formId, stepDef) {
            let schema = this.getFormSchema(formId);
            if (!schema) return null;
            if (!schema.steps) schema.steps = [];

            const nextNum = schema.steps.length ? Math.max(...schema.steps.map(s => s.num)) + 1 : 1;
            const newStep = {
                num: nextNum,
                title: stepDef.title || ('Step ' + nextNum),
                description: stepDef.description || 'Section description and instructions'
            };
            schema.steps.push(newStep);
            return this.saveFormSchema(formId, schema);
        },

        updateStepInSchema: function (formId, stepNum, updates) {
            let schema = this.getFormSchema(formId);
            if (!schema || !schema.steps) return null;

            const step = schema.steps.find(s => s.num === Number(stepNum));
            if (!step) return null;

            if (updates.title) step.title = updates.title.trim();
            if (updates.description !== undefined) step.description = updates.description.trim();
            return this.saveFormSchema(formId, schema);
        },

        moveStepInSchema: function (formId, stepNum, direction) {
            let schema = this.getFormSchema(formId);
            if (!schema || !schema.steps || schema.steps.length <= 1) return null;
            const idx = schema.steps.findIndex(s => s.num === Number(stepNum));
            if (idx === -1) return null;
            const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
            if (targetIdx < 0 || targetIdx >= schema.steps.length) return null;

            const oldNum = schema.steps[idx].num;
            const newNum = schema.steps[targetIdx].num;

            // Swap step assignments of fields
            if (schema.fields) {
                schema.fields.forEach(f => {
                    if (f.step === oldNum) f.step = -999;
                });
                schema.fields.forEach(f => {
                    if (f.step === newNum) f.step = oldNum;
                });
                schema.fields.forEach(f => {
                    if (f.step === -999) f.step = newNum;
                });
            }

            const temp = schema.steps[idx];
            schema.steps[idx] = schema.steps[targetIdx];
            schema.steps[targetIdx] = temp;

            schema.steps.forEach((s, i) => { s.num = i + 1; });
            return this.saveFormSchema(formId, schema);
        },

        deleteStepFromSchema: function (formId, stepNum) {
            let schema = this.getFormSchema(formId);
            if (!schema || !schema.steps || schema.steps.length <= 1) return null;

            schema.steps = schema.steps.filter(s => s.num !== Number(stepNum));
            // Reassign step numbers
            schema.steps.forEach((s, idx) => { s.num = idx + 1; });

            // Reassign fields belonging to deleted step to Step 1
            if (schema.fields) {
                schema.fields.forEach(f => {
                    if (f.step === Number(stepNum) || f.step > schema.steps.length) {
                        f.step = 1;
                    }
                });
            }
            return this.saveFormSchema(formId, schema);
        },

        // Update High-Level Form Settings
        updateFormSettings: function (formId, settings) {
            let schema = this.getFormSchema(formId);
            if (!schema) return null;

            if (settings.title) schema.title = settings.title.trim();
            if (settings.description !== undefined) schema.description = settings.description.trim();
            if (settings.acceptingResponses !== undefined) schema.acceptingResponses = Boolean(settings.acceptingResponses);
            if (settings.closeMessage !== undefined) schema.closeMessage = settings.closeMessage.trim();
            if (settings.confirmationMessage !== undefined) schema.confirmationMessage = settings.confirmationMessage.trim();
            if (settings.cohortTag !== undefined) schema.cohortTag = settings.cohortTag.trim();

            return this.saveFormSchema(formId, schema);
        },

        // Get Submissions / Responses for a given formId
        getFormSubmissions: function (formId) {
            if (formId === 'startup-incubation') {
                return this.getApplications();
            } else if (formId === 'mentor-registration') {
                const mentors = this.getMentors();
                return mentors.map((m, idx) => ({
                    id: m.id || ('MEN-' + (idx + 1)),
                    startupName: m.organization || 'Independent Practice',
                    founderName: m.name || m.full_name || 'Mentor',
                    email: m.email || '',
                    mobile: m.phone || '',
                    sector: m.domain || 'Advisory',
                    stage: m.experience || '8+ Years Exp',
                    status: m.status || 'Active',
                    submittedDate: m.joinedDate || '2026-02-15T10:00:00.000Z'
                }));
            } else if (formId === 'investor-registration') {
                const seedInvestors = [
                    { id: 'INV-001', startupName: 'Patna Angels Network', founderName: 'Sandeep Singhania', email: 'sandeep@patnaangels.in', mobile: '+91 98350 11223', sector: 'AgriTech, DeepTech', stage: '₹ 25L - ₹ 50L Cheque', status: 'Accredited', submittedDate: '2026-03-01T11:20:00.000Z' },
                    { id: 'INV-002', startupName: 'Bihar Venture Catalyst Fund', founderName: 'Ritu Raj Sharma', email: 'rituraj@biharvc.com', mobile: '+91 99342 55667', sector: 'SaaS, HealthTech', stage: '₹ 50L - ₹ 1.5Cr Cheque', status: 'Under Review', submittedDate: '2026-03-15T14:45:00.000Z' }
                ];
                return this._get('investor_submissions', seedInvestors);
            }
            return this._get('form_submissions_' + formId, []);
        },

        getAllFormList: function () {
            const schemas = this.getFormSchemas();
            return Object.keys(schemas).map(formId => {
                const schema = schemas[formId];
                const subs = this.getFormSubmissions(formId);
                const activeFields = (schema.fields || []).filter(f => f.active !== false);
                return {
                    id: formId,
                    title: schema.title || formId,
                    category: schema.category || 'General Form',
                    description: schema.description || '',
                    acceptingResponses: schema.acceptingResponses !== false,
                    cohortTag: schema.cohortTag || '',
                    stepsCount: (schema.steps && schema.steps.length) || 1,
                    questionsCount: activeFields.length,
                    totalFieldsCount: (schema.fields || []).length,
                    submissionsCount: subs.length,
                    isCustom: Boolean(schema.isCustom),
                    lastUpdated: schema.lastUpdated || null
                };
            });
        },

        createCustomForm: function (meta) {
            let schemas = this.getFormSchemas();
            const rawId = meta.id || (meta.title || 'form').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            let formId = rawId || ('custom-form-' + Date.now());
            if (schemas[formId]) {
                formId = formId + '-' + Math.floor(100 + Math.random() * 900);
            }

            const newSchema = {
                id: formId,
                title: meta.title.trim(),
                category: meta.category ? meta.category.trim() : 'Custom Intake',
                description: meta.description ? meta.description.trim() : 'Custom structured application form.',
                acceptingResponses: true,
                cohortTag: meta.cohortTag ? meta.cohortTag.trim() : '',
                confirmationMessage: 'Thank you! Your submission has been securely received by CIMP-BIIF.',
                closeMessage: 'This application intake is currently closed for new submissions.',
                isCustom: true,
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
                steps: [
                    { num: 1, title: 'Step 1: Basic Information', description: 'Primary applicant & organization contact details' }
                ],
                fields: [
                    { id: 'f_name', order: 1, label: 'Full Name', type: 'text', required: true, step: 1, active: true, isCore: true, placeholder: 'Enter primary applicant name' },
                    { id: 'f_email', order: 2, label: 'Email Address', type: 'email', required: true, step: 1, active: true, isCore: true, placeholder: 'name@example.com' },
                    { id: 'f_mobile', order: 3, label: 'Mobile Number', type: 'tel', required: true, step: 1, active: true, isCore: true, placeholder: '+91 98765 43210' },
                    { id: 'f_org', order: 4, label: 'Startup / Organization Name', type: 'text', required: true, step: 1, active: true, isCore: true, placeholder: 'e.g. Acme Tech Solutions' }
                ]
            };

            schemas[formId] = newSchema;
            this._set('form_schemas', schemas);

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser ? currentUser.name : 'Administrator',
                currentUser ? currentUser.role : 'IT Admin',
                'CUSTOM_FORM_CREATED',
                `Created new intake form: "${newSchema.title}" [ID: ${formId}]`
            );

            return newSchema;
        },

        deleteCustomForm: function (formId) {
            const seedIds = ['startup-incubation', 'mentor-registration', 'investor-registration'];
            if (seedIds.includes(formId)) {
                return { success: false, message: 'Core system forms cannot be deleted.' };
            }

            let schemas = this.getFormSchemas();
            if (!schemas[formId]) {
                return { success: false, message: 'Form not found.' };
            }

            const title = schemas[formId].title || formId;
            delete schemas[formId];
            this._set('form_schemas', schemas);

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser ? currentUser.name : 'Administrator',
                currentUser ? currentUser.role : 'IT Admin',
                'CUSTOM_FORM_DELETED',
                `Deleted custom form: "${title}" [ID: ${formId}]`
            );

            return { success: true };
        },

        toggleFormAccepting: function (formId) {
            let schema = this.getFormSchema(formId);
            if (!schema) return null;
            schema.acceptingResponses = !schema.acceptingResponses;
            return this.saveFormSchema(formId, schema);
        },

        // ==========================================
        // PUBLIC APPLICATION SELF-SERVICE TRACKER API
        // ==========================================
        trackApplicationStatus: function (query) {
            if (!query) return null;
            const q = String(query).trim().toLowerCase();
            const apps = this.getApplications();

            const app = apps.find(a => 
                (a.id && a.id.toLowerCase() === q) ||
                (a.email && a.email.toLowerCase() === q) ||
                (a.mobile && a.mobile.replace(/\D/g, '').includes(q.replace(/\D/g, '')))
            );

            if (!app) return null;

            // Compute multi-stage lifecycle timeline
            const isApproved = app.status === 'Approved';
            const isManagerPassed = app.status === 'Pending Director Approval' || isApproved;
            const isRejected = app.status === 'Rejected';

            const timeline = [
                {
                    stageNum: 1,
                    title: 'Application Intake Received',
                    subtitle: 'Online Submission Verified',
                    date: app.submittedDate ? new Date(app.submittedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Verified',
                    status: 'completed',
                    remarks: `Tracking ID ${app.id} generated. Application successfully submitted into CIMP-BIIF Incubation Queue.`
                },
                {
                    stageNum: 2,
                    title: 'Level-1 Technical & KYC Scrutiny',
                    subtitle: 'Incubation Manager Assessment',
                    date: app.managerApprovedDate ? new Date(app.managerApprovedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : (isManagerPassed ? 'Completed' : 'Under Active Review'),
                    status: isManagerPassed ? 'completed' : (isRejected ? 'rejected' : 'current'),
                    remarks: app.managerScore ? `Evaluation score: ${app.managerScore}/100. ${app.managerNotes || 'KYC and business viability cleared.'}` : 'Our technical screening committee is evaluating your problem statement, novelty and market scope in Bihar.'
                },
                {
                    stageNum: 3,
                    title: 'Standing Committee & Director Review',
                    subtitle: 'Executive Sanction & Final Sign-Off',
                    date: app.directorApprovedDate ? new Date(app.directorApprovedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : (isApproved ? 'Approved' : (isManagerPassed ? 'In Progress' : 'Pending')),
                    status: isApproved ? 'completed' : (isManagerPassed ? 'current' : 'pending'),
                    remarks: isApproved ? (app.directorNotes || 'Executive sanction granted for incubation induction.') : (isManagerPassed ? 'Application shortlisted and pending Director Executive sign-off.' : 'Pending clearance of Level-1 scrutiny.')
                },
                {
                    stageNum: 4,
                    title: 'Cohort Induction & Credential Issuance',
                    subtitle: 'Workspace, Mentor Allotment & Portal Access',
                    date: isApproved ? 'Active' : 'Pending',
                    status: isApproved ? 'completed' : 'pending',
                    remarks: isApproved ? 'Official Selection Letter generated. Profile synchronized with live CIMP-BIIF verified startups directory.' : 'Login credentials & cohort onboarding kit will be issued upon executive sanction.'
                }
            ];

            return {
                application: app,
                timeline: timeline,
                currentStage: isApproved ? 4 : (isManagerPassed ? 3 : 2),
                statusCode: isApproved ? 'APPROVED' : (isRejected ? 'REJECTED' : 'IN_REVIEW')
            };
        },

        // ==========================================
        // SEED CAPITAL & TRANCHE DISBURSEMENT API
        // ==========================================
        getDisbursements: function (startupId) {
            const list = this._get('disbursements', SEED_DISBURSEMENTS);
            if (!startupId) return list;
            return list.filter(d => d.startupId === startupId);
        },

        recordDisbursement: function (record) {
            let list = this.getDisbursements();
            if (!record.id) {
                record.id = 'DSB-2026-' + String(Math.floor(100 + Math.random() * 900));
            }
            list.unshift(record);
            this._set('disbursements', list);

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser ? currentUser.name : 'Finance Admin',
                currentUser ? currentUser.role : 'Incubation Manager',
                'GRANT_DISBURSEMENT_RECORDED',
                `New grant disbursement tranche created for startup: ${record.startupName}`
            );
            return record;
        },

        updateTrancheStatus: function (disbursementId, trancheNo, newStatus, remarks) {
            let list = this.getDisbursements();
            const dsb = list.find(d => d.id === disbursementId);
            if (!dsb) return null;

            const tranche = dsb.tranches.find(t => t.trancheNo === Number(trancheNo));
            if (!tranche) return null;

            tranche.status = newStatus;
            if (remarks) tranche.remarks = remarks;
            if (newStatus === 'Disbursed' && !tranche.disbursedDate) {
                tranche.disbursedDate = new Date().toISOString().split('T')[0];
                tranche.ucSubmitted = true;
            }

            this._set('disbursements', list);

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser ? currentUser.name : 'Director',
                currentUser ? currentUser.role : 'Executive Director',
                'TRANCHE_STATUS_UPDATED',
                `Tranche ${trancheNo} for "${dsb.startupName}" updated to [${newStatus}].`
            );
            return dsb;
        }
    };

    // Auto-init on load
    window.CIMP_DB.init();

})();
