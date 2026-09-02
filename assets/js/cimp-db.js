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
            id: 'ST-001',
            name: 'Digital Labour Chowk',
            legalName: 'DLC Tech Solutions Pvt Ltd',
            initial: 'D',
            logo: 'assets/images/startups/logo-dlc.png',
            sector: 'Technology',
            stage: 'Revenue Stage',
            status: 'Active',
            founder: 'Chandrashekhar Mandal',
            coFounders: ['Pooja Kumari'],
            email: 'founder@digitallabourchowk.com',
            phone: '+91 98765 43210',
            year: 2022,
            cohort: 'Cohort 2022',
            location: 'Maurya Lok, Patna',
            desc: 'An award-winning digital platform connecting construction and daily wage workers directly with employers and contractors across Bihar without intermediaries.',
            color: '#4527A0',
            metric: '5,000+',
            metricLabel: 'Workers Registered',
            revenue: '₹ 42.5 Lakhs / yr',
            revenueNumeric: 4250000,
            fundingRaised: '₹ 25 Lakhs (Seed Grant)',
            fundingNumeric: 2500000,
            jobsCreated: 28,
            assignedMentor: 'Dr. Alok Kumar',
            complianceScore: 95,
            pitchDeckUrl: '#',
            cin: 'U72900BR2022PTC054321',
            website: 'https://digitallabourchowk.com',
            appliedDate: '2022-04-12',
            approvedDate: '2022-05-10',
            milestones: [
                { title: 'MVP Launched', status: 'Completed', date: 'Jul 2022' },
                { title: '1,000 Workers Onboarded', status: 'Completed', date: 'Dec 2022' },
                { title: 'Series Seed Grant Received', status: 'Completed', date: 'Mar 2023' },
                { title: 'Expansion to 5 Bihar Districts', status: 'In Progress', date: 'Target Q3 2026' }
            ]
        },
        {
            id: 'ST-002',
            name: 'Gramshree Agri Services',
            legalName: 'Gramshree Agri Ventures Pvt Ltd',
            initial: 'G',
            logo: 'assets/images/startups/logo-gramshree.png',
            sector: 'AgriTech',
            stage: 'Scaling',
            status: 'Active',
            founder: 'Aastha Singh',
            coFounders: ['Rishi Ranjan'],
            email: 'aastha@gramshreeagri.com',
            phone: '+91 98112 34567',
            year: 2021,
            cohort: 'Cohort 2021',
            location: 'Patna',
            desc: 'Empowering Bihar farmers through a B2F agri-input, crop advisory, and market-linkage platform. Secured ₹80L VC investment in 2024.',
            color: '#2E7D32',
            metric: '₹80L+',
            metricLabel: 'Venture Investment',
            revenue: '₹ 1.25 Crore / yr',
            revenueNumeric: 12500000,
            fundingRaised: '₹ 80 Lakhs (VC Seed)',
            fundingNumeric: 8000000,
            jobsCreated: 45,
            assignedMentor: 'Prof. S. K. Singh',
            complianceScore: 98,
            pitchDeckUrl: '#',
            cin: 'U01111BR2021PTC049876',
            website: 'https://gramshreeagri.com',
            appliedDate: '2021-08-15',
            approvedDate: '2021-09-02',
            milestones: [
                { title: 'Farmer App Launched', status: 'Completed', date: 'Nov 2021' },
                { title: '10,000 Farmers Onboarded', status: 'Completed', date: 'Aug 2022' },
                { title: '₹80L VC Round Closed', status: 'Completed', date: 'Feb 2024' },
                { title: 'Direct Farm Export License', status: 'In Progress', date: 'Target Q4 2026' }
            ]
        },
        {
            id: 'ST-003',
            name: 'Railrestro',
            legalName: 'Yescom Global Food LLP',
            initial: 'R',
            logo: 'assets/images/startups/logo-railrestro.png',
            sector: 'E-commerce',
            stage: 'Scaling',
            status: 'Graduated',
            founder: 'Manish Chandra',
            coFounders: ['Suman Shekhar'],
            email: 'contact@railrestro.com',
            phone: '+91 81022 02203',
            year: 2017,
            cohort: 'Alumni 2017',
            location: 'Patna & Pan-India',
            desc: 'Leading e-catering platform serving fresh restaurant food to railway passengers on trains across 450+ major Indian stations.',
            color: '#B71C1C',
            metric: '450+',
            metricLabel: 'Stations Covered',
            revenue: '₹ 18.5 Crore / yr',
            revenueNumeric: 185000000,
            fundingRaised: '₹ 5 Crore (Institutional Series A)',
            fundingNumeric: 50000000,
            jobsCreated: 210,
            assignedMentor: 'CA Ramesh Sharma',
            complianceScore: 100,
            pitchDeckUrl: '#',
            cin: 'AAJ-1234',
            website: 'https://railrestro.com',
            appliedDate: '2017-02-10',
            approvedDate: '2017-03-01',
            milestones: [
                { title: 'IRCTC Authorized Partner', status: 'Completed', date: '2018' },
                { title: '1 Million Meals Delivered', status: 'Completed', date: '2020' },
                { title: 'Graduated from CIMP-BIIF', status: 'Completed', date: '2021' }
            ]
        },
        {
            id: 'ST-004',
            name: 'Hanuman Care',
            legalName: 'Hanuman Healthkart Pvt Ltd',
            initial: 'H',
            logo: 'assets/images/startups/logo-hanuman.png',
            sector: 'HealthTech',
            stage: 'Revenue Stage',
            status: 'Active',
            founder: 'Dr. Niraj Jha',
            coFounders: ['Santosh Kumar'],
            email: 'care@hanuman.care',
            phone: '+91 92628 92628',
            year: 2020,
            cohort: 'Cohort 2020',
            location: 'Patna',
            desc: 'Digital healthcare, emergency ambulance aggregator, and home diagnostics network providing fast, affordable medical response across Bihar and Jharkhand.',
            color: '#C62828',
            metric: '10k+',
            metricLabel: 'Emergency Rides',
            revenue: '₹ 85 Lakhs / yr',
            revenueNumeric: 8500000,
            fundingRaised: '₹ 50 Lakhs',
            fundingNumeric: 5000000,
            jobsCreated: 62,
            assignedMentor: 'Dr. Rajesh Verma',
            complianceScore: 96,
            pitchDeckUrl: '#',
            cin: 'U85100BR2020PTC047123',
            website: 'https://hanuman.care',
            appliedDate: '2020-06-11',
            approvedDate: '2020-07-05',
            milestones: [
                { title: 'GPS Ambulance Network Live', status: 'Completed', date: 'Sep 2020' },
                { title: 'Home Diagnostics Integration', status: 'Completed', date: 'May 2021' },
                { title: 'Emergency Response in <15 Mins', status: 'Completed', date: 'Jan 2023' }
            ]
        },
        {
            id: 'ST-005',
            name: 'ShadowGrid Technologies',
            legalName: 'ShadowGrid Cyber Innovations Pvt Ltd',
            initial: 'S',
            logo: 'assets/images/startups/logo-shadowgrid.png',
            sector: 'Technology',
            stage: 'Idea Stage',
            status: 'Active',
            founder: 'Rahul Kumar',
            coFounders: ['Praveen Anand'],
            email: 'rahul@shadowgrid.io',
            phone: '+91 97123 45678',
            year: 2023,
            cohort: 'Cohort 2023',
            location: 'Patna',
            desc: 'Advanced cyber defense, surveillance, and stealth communications systems. Selected for MSME Idea Hackathon 5.0 funding.',
            color: '#1E3A8A',
            metric: '₹15L',
            metricLabel: 'MSME Grant Winner',
            revenue: '₹ 8.2 Lakhs / yr',
            revenueNumeric: 820000,
            fundingRaised: '₹ 15 Lakhs (MSME Scheme)',
            fundingNumeric: 1500000,
            jobsCreated: 9,
            assignedMentor: 'Er. Vikash Prasad',
            complianceScore: 92,
            pitchDeckUrl: '#',
            cin: 'U72200BR2023PTC061234',
            website: 'https://shadowgrid.io',
            appliedDate: '2023-03-14',
            approvedDate: '2023-04-18',
            milestones: [
                { title: 'MSME Hackathon Finalist', status: 'Completed', date: 'May 2023' },
                { title: 'Prototype Defense Module', status: 'Completed', date: 'Jan 2024' },
                { title: 'Enterprise Pilot Testing', status: 'In Progress', date: 'Target Q3 2026' }
            ]
        },
        {
            id: 'ST-006',
            name: 'Project Starline (Starline AI)',
            legalName: 'Starline Autonomous Systems Pvt Ltd',
            initial: 'P',
            logo: 'assets/images/startups/logo-starline.png',
            sector: 'Technology',
            stage: 'Idea Stage',
            status: 'Active',
            founder: 'Keshav Kumar',
            coFounders: ['Anurag Verma'],
            email: 'keshav@starline.ai',
            phone: '+91 94310 98765',
            year: 2023,
            cohort: 'Cohort 2023',
            location: 'Patna',
            desc: 'Developing AI-guided autonomous stealth glider drone models for remote agricultural monitoring, surveillance, and disaster rescue.',
            color: '#2563EB',
            metric: '₹15L',
            metricLabel: 'MSME Grant Winner',
            revenue: '₹ 4.5 Lakhs / yr',
            revenueNumeric: 450000,
            fundingRaised: '₹ 15 Lakhs (Grant)',
            fundingNumeric: 1500000,
            jobsCreated: 7,
            assignedMentor: 'Dr. Rajesh Verma',
            complianceScore: 90,
            pitchDeckUrl: '#',
            cin: 'U35999BR2023PTC062345',
            website: 'https://starline.ai',
            appliedDate: '2023-05-19',
            approvedDate: '2023-06-25',
            milestones: [
                { title: 'Glider Airframe Aerodynamics Rig', status: 'Completed', date: 'Aug 2023' },
                { title: 'DGCA Compliant Telemetry Demo', status: 'In Progress', date: 'Target Q4 2026' }
            ]
        },
        {
            id: 'ST-007',
            name: 'Chill Roof (CoolRoof India)',
            legalName: 'CoolRoof Sustainable Surfaces Pvt Ltd',
            initial: 'C',
            logo: 'assets/images/startups/logo-coolroof.png',
            sector: 'CleanTech',
            stage: 'Pre-Revenue',
            status: 'Active',
            founder: 'Suraj Kumar',
            coFounders: ['Pooja Kumari'],
            email: 'suraj@coolroofindia.com',
            phone: '+91 99340 12345',
            year: 2023,
            cohort: 'Cohort 2023',
            location: 'Bhagalpur',
            desc: 'Eco-friendly ceramic tiles designed to reduce building surface temperatures by up to 12°C, improving energy efficiency in tropical buildings.',
            color: '#0D9488',
            metric: '12°C',
            metricLabel: 'Temp Reduction',
            revenue: '₹ 14.8 Lakhs / yr',
            revenueNumeric: 1480000,
            fundingRaised: '₹ 10 Lakhs (Bihar Startup Policy)',
            fundingNumeric: 1000000,
            jobsCreated: 14,
            assignedMentor: 'Prof. S. K. Singh',
            complianceScore: 94,
            pitchDeckUrl: '#',
            cin: 'U26999BR2023PTC063456',
            website: 'https://coolroofindia.com',
            appliedDate: '2023-07-02',
            approvedDate: '2023-08-01',
            milestones: [
                { title: 'NABL Certified Thermal Test', status: 'Completed', date: 'Oct 2023' },
                { title: 'Pilot on 20 Government Buildings', status: 'In Progress', date: 'Target Q3 2026' }
            ]
        },
        {
            id: 'ST-008',
            name: 'Urban Kare Internet',
            legalName: 'Urban Kare Services Pvt Ltd',
            initial: 'U',
            logo: 'assets/images/startups/logo-urbankare.png',
            sector: 'Technology',
            stage: 'Pre-Revenue',
            status: 'Active',
            founder: 'Abhishek Kumar',
            coFounders: ['Rohit Anand'],
            email: 'abhishek@urbankare.in',
            phone: '+91 91234 56780',
            year: 2022,
            cohort: 'Cohort 2022',
            location: 'Patna',
            desc: 'On-demand home maintenance and appliance servicing portal connecting verified local professionals with urban consumers in Tier 2/3 cities.',
            color: '#EA580C',
            metric: '1.5k+',
            metricLabel: 'Services Booked',
            revenue: '₹ 19.2 Lakhs / yr',
            revenueNumeric: 1920000,
            fundingRaised: '₹ 10 Lakhs',
            fundingNumeric: 1000000,
            jobsCreated: 18,
            assignedMentor: 'Dr. Alok Kumar',
            complianceScore: 89,
            pitchDeckUrl: '#',
            cin: 'U93000BR2022PTC058901',
            website: 'https://urbankare.in',
            appliedDate: '2022-09-10',
            approvedDate: '2022-10-15',
            milestones: [
                { title: 'Mobile App 1.0 Release', status: 'Completed', date: 'Dec 2022' },
                { title: '100 Verified Technicians', status: 'Completed', date: 'Jul 2023' }
            ]
        }
    ];

    // Seed Applications Queue (for the workflow demonstration)
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
            id: 'MEN-001',
            name: 'Dr. Alok Kumar',
            title: 'Professor of Strategy & Incubation Advisor',
            organization: 'CIMP Patna / IIM Alumnus',
            expertise: ['Business Strategy', 'Technology Commercialization', 'Scale-up Strategy'],
            email: 'alok.kumar@cimp.ac.in',
            phone: '+91 94310 11223',
            status: 'Active',
            assignedStartups: ['Digital Labour Chowk', 'Urban Kare Internet'],
            totalHoursLogged: 48,
            rating: 4.9,
            image: 'assets/images/mentors/mentor-1.jpg',
            bio: '20+ years of academic and industry consulting experience in corporate strategy, technology policy, and enterprise growth.'
        },
        {
            id: 'MEN-002',
            name: 'Prof. S. K. Singh',
            title: 'Agri-Business & Supply Chain Specialist',
            organization: 'Ex-NABARD Advisor',
            expertise: ['AgriTech', 'Rural Logistics', 'Government Grants & Subsidies'],
            email: 'sk.singh@biif-advisor.org',
            phone: '+91 98100 22334',
            status: 'Active',
            assignedStartups: ['Gramshree Agri Services', 'Chill Roof (CoolRoof India)'],
            totalHoursLogged: 62,
            rating: 5.0,
            image: 'assets/images/mentors/mentor-2.jpg',
            bio: 'Pioneered agri-logistics modernization frameworks across Eastern India. Advisor to various central & state grant committees.'
        },
        {
            id: 'MEN-003',
            name: 'CA Ramesh Sharma',
            title: 'Senior Partner, Valuation & Taxation',
            organization: 'Sharma & Associates',
            expertise: ['Financial Modeling', 'Venture Valuation', 'Tax & Compliance'],
            email: 'ramesh.sharma@caindia.org',
            phone: '+91 93341 33445',
            status: 'Active',
            assignedStartups: ['Railrestro'],
            totalHoursLogged: 35,
            rating: 4.8,
            image: 'assets/images/mentors/mentor-3.jpg',
            bio: 'Specialist in early-stage term sheet negotiations, GST compliance, angel tax exemptions, and cross-border IP structuring.'
        },
        {
            id: 'MEN-004',
            name: 'Dr. Rajesh Verma',
            title: 'Healthtech & Deeptech Mentor',
            organization: 'BioHub Innovations',
            expertise: ['HealthTech', 'Drone Robotics', 'Patents & IPR'],
            email: 'rajesh.verma@biohub.in',
            phone: '+91 91223 44556',
            status: 'Active',
            assignedStartups: ['Hanuman Care', 'Project Starline (Starline AI)'],
            totalHoursLogged: 40,
            rating: 4.9,
            image: 'assets/images/mentors/mentor-4.jpg',
            bio: 'Holds 6 biomedical patents; mentor to over 25 healthcare and robotics startups across IIT/IIM incubation centers.'
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
            if (!this._get('startups')) this._set('startups', SEED_STARTUPS);
            if (!this._get('applications')) this._set('applications', SEED_APPLICATIONS);
            if (!this._get('mentors')) this._set('mentors', SEED_MENTORS);
            if (!this._get('announcements')) this._set('announcements', SEED_ANNOUNCEMENTS);
            if (!this._get('audit_logs')) this._set('audit_logs', SEED_AUDIT_LOGS);
            
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
            this._set('announcements', SEED_ANNOUNCEMENTS);
            this._set('audit_logs', SEED_AUDIT_LOGS);
            this._set('users', SEED_USERS);
            this.setCurrentUser('usr-dir');
            return true;
        },

        // Authentication & Login
        login: function (email, password) {
            const users = this.getUsers();
            const cleanEmail = (email || '').trim().toLowerCase();
            const cleanPass = (password || '').trim();

            let user = users.find(u => u.email.toLowerCase() === cleanEmail);
            // Allow mentor to login with either mentor@cimp.ac.in or legacy alok.kumar@cimp.ac.in
            if (!user && (cleanEmail === 'mentor@cimp.ac.in' || cleanEmail === 'alok.kumar@cimp.ac.in')) {
                user = users.find(u => u.id === 'usr-mentor');
            }
            if (!user) {
                return { success: false, message: 'No account found with email: ' + email };
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
                elTopbarTitle.innerHTML = (user.title || user.role) + ' <i class="fa-solid fa-pen-to-square ms-1 text-primary font-10"></i>';
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

        // Applications Access & Two-Tier Workflow
        getApplications: function () {
            return this._get('applications', SEED_APPLICATIONS);
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
                fundingRequired: formData.funding_required || '₹ 20,00,000',
                founderExperience: formData.qualification || 'Entrepreneur',
                pitchDeckName: formData.pitchDeckName || 'Pitch_Deck_' + newId + '.pdf',
                type: formData.type || 'Startup'
            };

            apps.unshift(newApp);
            this._set('applications', apps);

            this.logAudit(
                newApp.founderName,
                'Applicant',
                'APPLICATION_SUBMITTED',
                `New registration submitted for "${newApp.startupName}" [${newApp.id}]`
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
            apps[idx].managerNotes = notes || 'KYC and viability reviewed. Recommended for final Director approval.';
            apps[idx].managerApprovedDate = new Date().toISOString();

            this._set('applications', apps);

            const currentUser = this.getCurrentUser();
            this.logAudit(
                currentUser.name,
                'Incubation Manager',
                'MANAGER_RECOMMENDATION',
                `Incubation Manager evaluated "${apps[idx].startupName}" (Score: ${score}/100) and escalated to Director for final approval.`
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
            app.directorNotes = notes || 'Executive approval granted. Welcome to CIMP-BIIF Incubation Cohort.';
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
                location: app.city + ', ' + app.state,
                desc: app.productDescription,
                color: '#1E3A8A',
                metric: 'New',
                metricLabel: 'Incubated Venture',
                revenue: '₹ 0 (Pre-Seed)',
                revenueNumeric: 0,
                fundingRaised: app.fundingRequired,
                fundingNumeric: 1500000,
                jobsCreated: 4,
                assignedMentor: 'Dr. Alok Kumar',
                complianceScore: 100,
                pitchDeckUrl: '#',
                cin: 'Pending Incorp',
                website: 'https://' + app.startupName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com',
                appliedDate: app.submittedDate ? app.submittedDate.split('T')[0] : '2026-08-01',
                approvedDate: new Date().toISOString().split('T')[0],
                milestones: [
                    { title: 'Incubation Onboarding at CIMP-BIIF', status: 'Completed', date: 'Immediate' },
                    { title: 'Mentor Assignment & Growth Plan', status: 'In Progress', date: 'Next 30 Days' },
                    { title: 'Seed Grant Tranche 1 Disbursement', status: 'Pending', date: 'Next 60 Days' }
                ]
            };

            this.saveStartup(newStartup);

            // Generate Simulated Onboarding Email
            const emailSim = {
                to: app.email,
                founder: app.founderName,
                startupName: app.startupName,
                subject: `🎉 Congratulations! ${app.startupName} is Selected for CIMP-BIIF Incubation`,
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

        // Mentors Access
        getMentors: function () {
            return this._get('mentors', SEED_MENTORS);
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
        }
    };

    // Auto-init on load
    window.CIMP_DB.init();

})();
