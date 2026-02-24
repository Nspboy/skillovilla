/**
 * seed.js — Run once to populate all MongoDB collections
 * Usage:  node seed/seed.js   (from project root)
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const User       = require("../models/User");
const Course     = require("../models/Course");
const Mentor     = require("../models/Mentor");
const Enrollment = require("../models/Enrollment");
const { LiveClass } = require("../models/Session");
const { Company, Placement } = require("../models/Placement");
const { Blog, Certificate }  = require("../models/Blog");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/talentstack";

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("🔗  Connected to MongoDB");

  // ── Wipe existing data ─────────────────────────────────────────────────
  await Promise.all([
    User.deleteMany(), Course.deleteMany(), Mentor.deleteMany(),
    Enrollment.deleteMany(), LiveClass.deleteMany(),
    Company.deleteMany(), Placement.deleteMany(),
    Blog.deleteMany(), Certificate.deleteMany(),
  ]);
  console.log("🗑   Cleared existing collections");

  // ── Users (admin + mentors + students) ─────────────────────────────────
  // ── Users (admin + mentors + students) ─────────────────────────────────
  const hashedPw = await bcrypt.hash("Password@123", 12);

  const admin = await User.create({
    name: "Admin User", email: "admin@talentstack.com",
    avatar: "https://i.pravatar.cc/150?u=admin@talentstack.com",
    password: hashedPw, role: "admin", isVerified: true,
  });

  const mentorUsers = await User.insertMany([
    { name: "Arjun Mehta",  email: "arjun@talentstack.com",  password: hashedPw, role: "mentor", isVerified: true, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
    { name: "Priya Sharma", email: "priya@talentstack.com",  password: hashedPw, role: "mentor", isVerified: true, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
    { name: "Neha Singh",   email: "neha@talentstack.com",   password: hashedPw, role: "mentor", isVerified: true, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
    { name: "Rahul Gupta",  email: "rahul@talentstack.com",  password: hashedPw, role: "mentor", isVerified: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
    { name: "Vikram Joshi", email: "vikram@talentstack.com", password: hashedPw, role: "mentor", isVerified: true, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
    { name: "Amit Kumar",   email: "amit@talentstack.com",   password: hashedPw, role: "mentor", isVerified: true, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" },
  ]);

  const studentUsers = await User.insertMany([
    { name: "Ravi Teja",   email: "ravi@example.com",   password: hashedPw, role: "student", isVerified: true, avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop" },
    { name: "Sneha Rao",   email: "sneha@example.com",  password: hashedPw, role: "student", isVerified: true, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
    { name: "Ankit Patel", email: "ankit@example.com",  password: hashedPw, role: "student", isVerified: true, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" },
    { name: "Meera Nair",  email: "meera@example.com",  password: hashedPw, role: "student", isVerified: true, avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop" },
    { name: "Harsh Gupta", email: "harsh@example.com",  password: hashedPw, role: "student", isVerified: true, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
    { name: "Prachi Shah", email: "prachi@example.com", password: hashedPw, role: "student", isVerified: true, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" },
  ]);
  console.log("👤  Users seeded");

  // ── Courses ────────────────────────────────────────────────────────────
  const courseData = [
    {
      title: "Full Stack Development", category: "Tech", level: "Beginner",
      duration: "6 months", price: 49999, tag: "Bestseller",
      color: "#0056D2", icon: "⚡", rating: 4.8, ratingCount: 1240, enrolled: 12400,
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop", // Clean code editor
      isPublished: true, isFeatured: true,
      description: "Master React, Node.js, MongoDB & AWS. Build 10 real-world projects. Guaranteed placement support.",
      instructor: mentorUsers[0]._id,
      liveClassSchedule: "Mon, Wed, Fri – 7:00 PM IST",
      curriculum: [
        { title: "JavaScript Fundamentals", duration: "2 weeks", order: 1, topics: ["ES6+", "Async/Await", "Closures"] },
        { title: "React & State Management", duration: "3 weeks", order: 2, topics: ["Hooks", "Redux", "Context API"] },
        { title: "Node.js & Express",        duration: "3 weeks", order: 3, topics: ["REST APIs", "Middleware", "Auth"] },
        { title: "MongoDB & Mongoose",        duration: "2 weeks", order: 4, topics: ["Schema Design", "Aggregation"] },
        { title: "System Design",             duration: "2 weeks", order: 5, topics: ["Scalability", "Caching", "Queues"] },
        { title: "Deployment & DevOps",       duration: "2 weeks", order: 6, topics: ["Docker", "AWS EC2", "CI/CD"] },
      ],
    },
    {
      title: "Data Science & Machine Learning", category: "Tech", level: "Intermediate",
      duration: "5 months", price: 54999, tag: "Hot",
      color: "#00C2FF", icon: "🤖", rating: 4.9, ratingCount: 980, enrolled: 9800,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?q=80&w=800&auto=format&fit=crop", 
      isPublished: true, isFeatured: true,
      description: "Python, Pandas, Scikit-learn, TensorFlow. Build ML pipelines and get placed at top data-first companies.",
      instructor: mentorUsers[1]._id,
      liveClassSchedule: "Tue, Thu – 6:00 PM IST",
      curriculum: [
        { title: "Python for Data Science",  duration: "2 weeks", order: 1, topics: ["NumPy", "Pandas", "Matplotlib"] },
        { title: "Statistics & Probability", duration: "2 weeks", order: 2, topics: ["Distributions", "Hypothesis Testing"] },
        { title: "Machine Learning",         duration: "4 weeks", order: 3, topics: ["Regression", "Classification", "Clustering"] },
        { title: "Deep Learning",            duration: "3 weeks", order: 4, topics: ["Neural Nets", "CNN", "RNN"] },
        { title: "MLOps & Deployment",       duration: "2 weeks", order: 5, topics: ["MLflow", "FastAPI", "Docker"] },
      ],
    },
    {
      title: "Product Management", category: "Business", level: "Intermediate",
      duration: "4 months", price: 44999, tag: "Trending",
      color: "#F97316", icon: "📊", rating: 4.7, ratingCount: 720, enrolled: 7200,
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop", // Team workshop
      isPublished: true, isFeatured: true,
      description: "Go from zero to PM hero. Roadmapping, stakeholder management, data analysis, and product strategy.",
      instructor: mentorUsers[3]._id,
      liveClassSchedule: "Sat, Sun – 10:00 AM IST",
      curriculum: [
        { title: "PM Fundamentals",    duration: "2 weeks", order: 1, topics: ["Role of PM", "Agile", "Scrum"] },
        { title: "User Research",      duration: "2 weeks", order: 2, topics: ["Interviews", "Surveys", "Personas"] },
        { title: "Roadmapping",        duration: "2 weeks", order: 3, topics: ["OKRs", "Prioritization", "PRDs"] },
        { title: "Data & Metrics",     duration: "2 weeks", order: 4, topics: ["SQL", "Funnels", "A/B Testing"] },
        { title: "Product Strategy",   duration: "2 weeks", order: 5, topics: ["GTM", "Competitive Analysis"] },
        { title: "Interview Prep",     duration: "2 weeks", order: 6, topics: ["Case Studies", "Mock Interviews"] },
      ],
    },
    {
      title: "UI/UX Design", category: "Design", level: "Beginner",
      duration: "3 months", price: 34999, tag: "New",
      color: "#EC4899", icon: "🎨", rating: 4.8, ratingCount: 1100, enrolled: 11000,
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=600&auto=format&fit=crop", // Pro designer at desk
      isPublished: true, isFeatured: false,
      description: "Figma, Prototyping, User Research, Design Systems. Build a portfolio of 5 real-world case studies.",
      instructor: mentorUsers[2]._id,
      liveClassSchedule: "Mon, Wed – 8:00 PM IST",
      curriculum: [
        { title: "Design Principles",  duration: "1 week",  order: 1, topics: ["Colour", "Typography", "Grid"] },
        { title: "Figma Mastery",      duration: "2 weeks", order: 2, topics: ["Components", "Auto-layout", "Variants"] },
        { title: "User Research",      duration: "2 weeks", order: 3, topics: ["Usability Testing", "Journey Mapping"] },
        { title: "Prototyping",        duration: "2 weeks", order: 4, topics: ["Wireframes", "Interactions", "Motion"] },
        { title: "Design Systems",     duration: "2 weeks", order: 5, topics: ["Tokens", "Libraries", "Documentation"] },
        { title: "Portfolio & Career", duration: "1 week",  order: 6, topics: ["Case Studies", "Interview Prep"] },
      ],
    },
    {
      title: "Digital Marketing", category: "Marketing", level: "Beginner",
      duration: "3 months", price: 29999, tag: "",
      color: "#10B981", icon: "📱", rating: 4.6, ratingCount: 850, enrolled: 8500,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop", // Marketing dashboard
      isPublished: true, isFeatured: false,
      description: "SEO, SEM, Social Media, Email Marketing, Analytics. Get certified and job-ready in 90 days.",
      instructor: mentorUsers[4]._id,
      liveClassSchedule: "Tue, Thu – 7:00 PM IST",
      curriculum: [
        { title: "SEO & Content",        duration: "2 weeks", order: 1, topics: ["On-page", "Off-page", "Technical SEO"] },
        { title: "Google Ads",           duration: "2 weeks", order: 2, topics: ["Search", "Display", "Shopping"] },
        { title: "Social Media",         duration: "2 weeks", order: 3, topics: ["Meta Ads", "Instagram", "LinkedIn"] },
        { title: "Email Marketing",      duration: "1 week",  order: 4, topics: ["Mailchimp", "Automation", "A/B Testing"] },
        { title: "Analytics & Reporting",duration: "1 week",  order: 5, topics: ["GA4", "Dashboards", "Attribution"] },
      ],
    },
    {
      title: "Cloud & DevOps Engineering", category: "Tech", level: "Advanced",
      duration: "5 months", price: 59999, tag: "Premium",
      color: "#F59E0B", icon: "☁️", rating: 4.9, ratingCount: 560, enrolled: 5600,
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop", 
      isPublished: true, isFeatured: true,
      description: "AWS, Docker, Kubernetes, Terraform, CI/CD. Get AWS Solutions Architect certified.",
      instructor: mentorUsers[5]._id,
      liveClassSchedule: "Fri, Sat – 7:00 PM IST",
      curriculum: [
        { title: "Linux & Bash",         duration: "1 week",  order: 1, topics: ["Shell Scripting", "Permissions", "Networking"] },
        { title: "Docker",               duration: "2 weeks", order: 2, topics: ["Images", "Containers", "Compose"] },
        { title: "Kubernetes",           duration: "3 weeks", order: 3, topics: ["Pods", "Deployments", "Helm"] },
        { title: "AWS Core Services",    duration: "4 weeks", order: 4, topics: ["EC2", "S3", "RDS", "Lambda"] },
        { title: "Terraform & IaC",      duration: "2 weeks", order: 5, topics: ["Modules", "State", "Workspaces"] },
        { title: "CI/CD Pipelines",      duration: "2 weeks", order: 6, topics: ["GitHub Actions", "Jenkins", "ArgoCD"] },
      ],
    },
    {
      title: "AI Strategy for Business", category: "Business", level: "Intermediate",
      duration: "3 months", price: 39999, tag: "Executive",
      color: "#8B5CF6", icon: "🧠", rating: 5.0, ratingCount: 210, enrolled: 2100,
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop", // AI Brain conceptual
      isPublished: true, isFeatured: true,
      description: "Learn how to leverage Generative AI for business growth, efficiency, and competitive advantage.",
      instructor: mentorUsers[3]._id,
      liveClassSchedule: "Sat – 4:00 PM IST",
      curriculum: [
        { title: "AI Basics for Leaders",  duration: "1 week",  order: 1, topics: ["LLMs", "Generative AI", "NLP"] },
        { title: "Strategic Frameworks",   duration: "2 weeks", order: 2, topics: ["Build vs Buy", "AI ROI"] },
        { title: "Ethical AI & Risks",     duration: "1 week",  order: 3, topics: ["Bias", "Privacy", "Compliance"] },
      ],
    },
    {
      title: "Cyber Security Pro", category: "Tech", level: "Advanced",
      duration: "6 months", price: 64999, tag: "High Demand",
      color: "#EF4444", icon: "🛡️", rating: 4.8, ratingCount: 430, enrolled: 4300,
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop", // Server locks security
      isPublished: true, isFeatured: false,
      description: "Ethical hacking, Network security, and Incidence response. Get ready for top security certifications.",
      instructor: mentorUsers[0]._id,
      liveClassSchedule: "Tue, Fri – 8:00 PM IST",
      curriculum: [
        { title: "Networking Security",  duration: "2 weeks", order: 1, topics: ["TCP/IP", "Firewalls", "VPNs"] },
        { title: "Penetration Testing",  duration: "3 weeks", order: 2, topics: ["Kali Linux", "Metasploit"] },
        { title: "Cloud Security",       duration: "2 weeks", order: 3, topics: ["IAM", "VPC Security"] },
      ],
    },
    {
      title: "Content Marketing Mastery", category: "Marketing", level: "Beginner",
      duration: "2 months", price: 19999, tag: "Popular",
      color: "#10B981", icon: "✍️", rating: 4.7, ratingCount: 920, enrolled: 9200,
      thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop", // Blogger at coffee shop
      isPublished: true, isFeatured: false,
      description: "Master the art of storytelling and audience growth. Learn SEO, Copywriting, and Video Strategy.",
      instructor: mentorUsers[4]._id,
      liveClassSchedule: "Wed, Sat – 6:00 PM IST",
      curriculum: [
        { title: "Copywriting 101",     duration: "1 week",  order: 1, topics: ["Headlines", "CTAs"] },
        { title: "Visual Storytelling", duration: "1 week",  order: 2, topics: ["Video", "Graphics"] },
      ],
    },
    {
      title: "Brand Design Systems", category: "Design", level: "Intermediate",
      duration: "4 months", price: 42999, tag: "Studio Choice",
      color: "#F472B6", icon: "💎", rating: 4.9, ratingCount: 380, enrolled: 3800,
      thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop", // Color palettes and design tools
      isPublished: true, isFeatured: true,
      description: "Scale your design impact by building robust brand systems. From logos to comprehensive style guides.",
      instructor: mentorUsers[2]._id,
      liveClassSchedule: "Thu, Sun – 11:00 AM IST",
      curriculum: [
        { title: "Dynamic Brand Identity", duration: "2 weeks", order: 1, topics: ["Logos", "Type", "Motion"] },
        { title: "System Documentation",   duration: "2 weeks", order: 2, topics: ["Tokens", "Governance"] },
      ],
    },
    {
      title: "Blockchain & Web3", category: "Tech", level: "Intermediate",
      duration: "4 months", price: 59999, tag: "Future Tech",
      color: "#6366F1", icon: "⛓️", rating: 4.9, ratingCount: 310, enrolled: 3100,
      thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: true,
      description: "Smart contracts, Ethereum, Solidity and DApp development. Lead the decentralized revolution.",
      instructor: mentorUsers[0]._id,
      liveClassSchedule: "Sat, Sun – 2:00 PM IST",
      curriculum: [
        { title: "Blockchain Basics", duration: "1 week", order: 1, topics: ["Hashing", "Consensus", "Cryptography"] },
        { title: "Solidity Deep Dive", duration: "3 weeks", order: 2, topics: ["Smart Contracts", "Security", "OpenZeppelin"] },
      ],
    },
    {
      title: "Mobile App Development", category: "Tech", level: "Beginner",
      duration: "5 months", price: 44999, tag: "Popular",
      color: "#F43F5E", icon: "📱", rating: 4.7, ratingCount: 680, enrolled: 6800,
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: false,
      description: "Build cross-platform mobile apps using Flutter or React Native. Launch your app on Play Store & App Store.",
      instructor: mentorUsers[1]._id,
      liveClassSchedule: "Tue, Thu – 8:00 PM IST",
      curriculum: [
        { title: "Dart/JavaScript Basics", duration: "2 weeks", order: 1, topics: ["Syntax", "Async", "State"] },
        { title: "UI Components", duration: "2 weeks", order: 2, topics: ["Layouts", "Navigation", "Themes"] },
      ],
    },
    {
      title: "Digital Transformation", category: "Business", level: "Advanced",
      duration: "3 months", price: 69999, tag: "Leadership",
      color: "#06B6D4", icon: "🏢", rating: 4.8, ratingCount: 150, enrolled: 1500,
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: true,
      description: "Lead enterprise-level digital shifts. Learn change management, agile at scale, and digital-first strategy.",
      instructor: mentorUsers[3]._id,
      liveClassSchedule: "Fri – 6:00 PM IST",
      curriculum: [
        { title: "Strategic Roadmapping", duration: "2 weeks", order: 1, topics: ["Vision", "Gap Analysis"] },
      ],
    },
    {
      title: "Financial Analytics", category: "Business", level: "Intermediate",
      duration: "4 months", price: 49999, tag: "Quant",
      color: "#10B981", icon: "💰", rating: 4.9, ratingCount: 290, enrolled: 2900,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: false,
      description: "Financial modeling, risk analysis, and quantitative strategy using Excel, Python, and SQL.",
      instructor: mentorUsers[3]._id,
      liveClassSchedule: "Mon, Wed – 7:00 PM IST",
      curriculum: [
        { title: "Excel Mastery", duration: "2 weeks", order: 1, topics: ["Modeling", "VBA"] },
      ],
    },
    {
      title: "Operations Management", category: "Business", level: "Intermediate",
      duration: "4 months", price: 42999, tag: "Systems",
      color: "#3B82F6", icon: "📦", rating: 4.6, ratingCount: 210, enrolled: 2100,
      thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: false,
      description: "Master supply chain, logistics, and process optimization. Ideal for operations enthusiasts.",
      instructor: mentorUsers[3]._id,
      liveClassSchedule: "Wed, Sat – 11:00 AM IST",
      curriculum: [
        { title: "Lean & Six Sigma", duration: "3 weeks", order: 1, topics: ["DMAIC", "Waste Reduction"] },
      ],
    },
    {
      title: "Entrepreneurship", category: "Business", level: "Beginner",
      duration: "6 months", price: 79999, tag: "Founder's Track",
      color: "#F59E0B", icon: "🚀", rating: 5.0, ratingCount: 180, enrolled: 1800,
      thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: true,
      description: "From idea to IPO. Lean startup methodology, pitching to VCs, and building a minimum viable product.",
      instructor: mentorUsers[3]._id,
      liveClassSchedule: "Sun – 11:00 AM IST",
      curriculum: [
        { title: "Ideation & Validation", duration: "2 weeks", order: 1, topics: ["Product-Market Fit", "Customer Discovery"] },
      ],
    },
    {
      title: "Motion Design", category: "Design", level: "Intermediate",
      duration: "3 months", price: 39999, tag: "Studio",
      color: "#EF4444", icon: "🎬", rating: 4.8, ratingCount: 240, enrolled: 2400,
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: true,
      description: "After Effects mastery for UI/UX and Brand designers. Bring your designs to life with motion.",
      instructor: mentorUsers[2]._id,
      liveClassSchedule: "Mon, Fri – 8:00 PM IST",
      curriculum: [
        { title: "AE Fundamentals", duration: "2 weeks", order: 1, topics: ["Keyframes", "Easings"] },
      ],
    },
    {
      title: "User Research Mastery", category: "Design", level: "Advanced",
      duration: "3 months", price: 34999, tag: "Deep Dive",
      color: "#8B5CF6", icon: "👤", rating: 4.9, ratingCount: 160, enrolled: 1600,
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: false,
      description: "Advanced usability testing, persona building, and information architecture for senior designers.",
      instructor: mentorUsers[2]._id,
      liveClassSchedule: "Tue, Thu – 7:00 PM IST",
      curriculum: [
        { title: "Research Methods", duration: "2 weeks", order: 1, topics: ["Qualitative", "Quantitative"] },
      ],
    },
    {
      title: "Interaction Design", category: "Design", level: "Intermediate",
      duration: "3 months", price: 37999, tag: "Core",
      color: "#10B981", icon: "🖱️", rating: 4.7, ratingCount: 310, enrolled: 3100,
      thumbnail: "https://images.unsplash.com/photo-1581291518655-9503cc274573?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: false,
      description: "Design logic-driven interfaces. Focus on micro-interactions, accessibility, and user feedback loops.",
      instructor: mentorUsers[2]._id,
      liveClassSchedule: "Wed, Sat – 6:00 PM IST",
      curriculum: [
        { title: "Logic & Flow", duration: "2 weeks", order: 1, topics: ["States", "Triggers"] },
      ],
    },
    {
      title: "Professional Illustration", category: "Design", level: "Beginner",
      duration: "4 months", price: 32999, tag: "Creative",
      color: "#F97316", icon: "🖌️", rating: 4.9, ratingCount: 420, enrolled: 4200,
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: false,
      description: "Digital illustration for tech products. Learn character design, iconography, and editor styles.",
      instructor: mentorUsers[2]._id,
      liveClassSchedule: "Sat, Sun – 4:00 PM IST",
      curriculum: [
        { title: "Vector Art", duration: "2 weeks", order: 1, topics: ["Pen Tool", "Composition"] },
      ],
    },
    {
      title: "Performance Marketing", category: "Marketing", level: "Advanced",
      duration: "4 months", price: 49999, tag: "ROI Driven",
      color: "#3B82F6", icon: "📈", rating: 4.8, ratingCount: 380, enrolled: 3800,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: true,
      description: "Master paid acquisition across Meta, Google, and LinkedIn. Focus on scaling and massive ROI.",
      instructor: mentorUsers[4]._id,
      liveClassSchedule: "Mon, Wed – 8:00 PM IST",
      curriculum: [
        { title: "Ad Algorithms", duration: "2 weeks", order: 1, topics: ["Bidding", "Auction"] },
      ],
    },
    {
      title: "Social Media Strategy", category: "Marketing", level: "Beginner",
      duration: "3 months", price: 24999, tag: "Buzz",
      color: "#EC4899", icon: "📱", rating: 4.7, ratingCount: 540, enrolled: 5400,
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: true,
      description: "Build communities and brand presence. Learn content calendars, influencer marketing, and virality.",
      instructor: mentorUsers[4]._id,
      liveClassSchedule: "Tue, Thu – 6:00 PM IST",
      curriculum: [
        { title: "Content Creation", duration: "2 weeks", order: 1, topics: ["Hook", "Story"] },
      ],
    },
    {
      title: "Growth Hacking", category: "Marketing", level: "Intermediate",
      duration: "4 months", price: 45999, tag: "Scale",
      color: "#8B5CF6", icon: "🧬", rating: 4.9, ratingCount: 270, enrolled: 2700,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: false,
      description: "Data-driven marketing for startups. AARRR funnel, viral loops, and unconventional acquisition.",
      instructor: mentorUsers[4]._id,
      liveClassSchedule: "Fri, Sat – 7:00 PM IST",
      curriculum: [
        { title: "Funnel Ops", duration: "2 weeks", order: 1, topics: ["AARRR", "Retention"] },
      ],
    },
    {
      title: "E-commerce Marketing", category: "Marketing", level: "Intermediate",
      duration: "3 months", price: 39999, tag: "Store Choice",
      color: "#14B8A6", icon: "🛒", rating: 4.8, ratingCount: 350, enrolled: 3500,
      thumbnail: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=800&auto=format&fit=crop",
      isPublished: true, isFeatured: false,
      description: "Scale your online store. Shopify marketing, conversion rate optimization, and email flows.",
      instructor: mentorUsers[4]._id,
      liveClassSchedule: "Thu, Sun – 10:00 AM IST",
      curriculum: [
        { title: "CRO Mastery", duration: "2 weeks", order: 1, topics: ["Landing Pages", "Checkouts"] },
      ],
    },
  ];

  const courses = await Course.insertMany(courseData);
  console.log("📚  Courses seeded");

  // ── Mentors ────────────────────────────────────────────────────────────
  await Mentor.insertMany([
    { user: mentorUsers[0]._id, initials: "AM", color: "#0056D2", role: "Senior SDE @ Google",       company: "Google",    experience: "8 years", rating: 4.9, ratingCount: 340, totalSessions: 340, hourlyRate: 2500, expertise: ["React", "Node.js", "System Design", "DSA"],  linkedinUrl: "https://linkedin.com/in/arjun-mehta",  bio: "8 years building scalable systems at Google. Passionate about helping engineers grow." },
    { user: mentorUsers[1]._id, initials: "PS", color: "#00C2FF", role: "Data Scientist @ Microsoft", company: "Microsoft", experience: "6 years", rating: 4.9, ratingCount: 280, totalSessions: 280, hourlyRate: 2000, expertise: ["Python", "ML", "TensorFlow", "NLP"],          linkedinUrl: "https://linkedin.com/in/priya-sharma",  bio: "ML engineer with 6 years at Microsoft. Ex-researcher at IIT Delhi." },
    { user: mentorUsers[2]._id, initials: "NS", color: "#EC4899", role: "Principal Designer @ Flipkart", company: "Flipkart", experience: "7 years", rating: 4.8, ratingCount: 195, totalSessions: 195, hourlyRate: 1800, expertise: ["Figma", "User Research", "Prototyping", "Design Systems"], linkedinUrl: "https://linkedin.com/in/neha-singh", bio: "Design lead who has shipped products used by 400M+ users at Flipkart." },
    { user: mentorUsers[3]._id, initials: "RG", color: "#F97316", role: "VP Product @ Razorpay",     company: "Razorpay", experience: "10 years", rating: 5.0, ratingCount: 420, totalSessions: 420, hourlyRate: 3000, expertise: ["Strategy", "Roadmapping", "Agile", "OKRs"],     linkedinUrl: "https://linkedin.com/in/rahul-gupta",  bio: "Built 3 products from 0 to $100M ARR. Mentor to 400+ aspiring PMs." },
    { user: mentorUsers[4]._id, initials: "VJ", color: "#10B981", role: "Growth Lead @ Swiggy",      company: "Swiggy",   experience: "5 years", rating: 4.7, ratingCount: 165, totalSessions: 165, hourlyRate: 1500, expertise: ["SEO", "Google Ads", "Analytics", "Email Marketing"], linkedinUrl: "https://linkedin.com/in/vikram-joshi", bio: "Growth marketer who scaled Swiggy's user base from 5M to 50M." },
    { user: mentorUsers[5]._id, initials: "AK", color: "#F59E0B", role: "Cloud Architect @ Amazon",   company: "Amazon",   experience: "9 years", rating: 4.9, ratingCount: 210, totalSessions: 210, hourlyRate: 2800, expertise: ["AWS", "Kubernetes", "Terraform", "CI/CD"],         linkedinUrl: "https://linkedin.com/in/amit-kumar",   bio: "AWS Solutions Architect Pro. Built infrastructure handling 10B+ requests/day." },
  ]);
  console.log("👨‍🏫  Mentors seeded");

  // ── Enrollments ────────────────────────────────────────────────────────
  await Enrollment.insertMany([
    { student: studentUsers[0]._id, course: courses[0]._id, amountPaid: 49999, progress: 95, status: "completed", completedAt: new Date("2026-01-15") },
    { student: studentUsers[1]._id, course: courses[1]._id, amountPaid: 54999, progress: 88, status: "active" },
    { student: studentUsers[2]._id, course: courses[2]._id, amountPaid: 44999, progress: 70, status: "active" },
    { student: studentUsers[3]._id, course: courses[5]._id, amountPaid: 59999, progress: 60, status: "active" },
    { student: studentUsers[4]._id, course: courses[3]._id, amountPaid: 34999, progress: 45, status: "active" },
    { student: studentUsers[5]._id, course: courses[0]._id, amountPaid: 49999, progress: 80, status: "active" },
  ]);
  console.log("📝  Enrollments seeded");

  // ── Companies & Placements ─────────────────────────────────────────────
  const companies = await Company.insertMany([
    { name: "Google",    logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg", color: "#ea4335" },
    { name: "Microsoft", logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg", color: "#00a1f1" },
    { name: "Amazon",    logo: "https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg", color: "#ff9900" },
    { name: "Flipkart",  logo: "https://www.vectorlogo.zone/logos/flipkart/flipkart-icon.svg", color: "#f7a600" },
    { name: "Swiggy",    logo: "https://www.vectorlogo.zone/logos/swiggy/swiggy-icon.svg", color: "#fc8019" },
    { name: "Razorpay",  logo: "https://www.vectorlogo.zone/logos/razorpay/razorpay-icon.svg", color: "#3395FF" },
    { name: "CRED",      logo: "https://www.vectorlogo.zone/logos/cred_club/cred_club-icon.svg", color: "#1c1c1c" },
    { name: "PhonePe",   logo: "https://www.vectorlogo.zone/logos/phonepe/phonepe-icon.svg", color: "#5f259f" },
    { name: "Zomato",    logo: "https://www.vectorlogo.zone/logos/zomato/zomato-icon.svg", color: "#e23744" },
    { name: "Meesho",    logo: "https://www.vectorlogo.zone/logos/meesho/meesho-icon.svg", color: "#9e1f63" },
  ]);

  await Placement.insertMany([
    { student: studentUsers[0]._id, company: companies[0]._id, course: courses[0]._id, role: "Software Engineer",      packageLPA: "45 LPA", testimonial: "TalentStack gave me the structure and mentorship I needed to crack Google." },
    { student: studentUsers[1]._id, company: companies[1]._id, course: courses[1]._id, role: "Data Scientist",         packageLPA: "38 LPA", testimonial: "The live sessions and real projects made all the difference." },
    { student: studentUsers[2]._id, company: companies[3]._id, course: courses[2]._id, role: "Product Manager",        packageLPA: "32 LPA", testimonial: "Rahul's mentorship is world-class. Got my dream PM role." },
    { student: studentUsers[3]._id, company: companies[2]._id, course: courses[5]._id, role: "Cloud Engineer",         packageLPA: "42 LPA", testimonial: "DevOps bootcamp is intense but worth every rupee." },
    { student: studentUsers[4]._id, company: companies[4]._id, course: courses[3]._id, role: "UX Designer",            packageLPA: "28 LPA", testimonial: "Built a portfolio that got me 12 interview calls." },
    { student: studentUsers[5]._id, company: companies[5]._id, course: courses[0]._id, role: "Full Stack Developer",   packageLPA: "35 LPA", testimonial: "From a non-CS background to Razorpay in 6 months." },
  ]);
  console.log("🏆  Companies & Placements seeded");

  // ── Live Classes ───────────────────────────────────────────────────────
  const now = new Date();
  await LiveClass.insertMany([
    { course: courses[0]._id, mentor: (await Mentor.findOne({ user: mentorUsers[0]._id }))._id, title: "System Design Deep Dive",         scheduledAt: new Date(now.getTime() + 1  * 3600000), status: "scheduled", durationMins: 90  },
    { course: courses[1]._id, mentor: (await Mentor.findOne({ user: mentorUsers[1]._id }))._id, title: "Neural Networks from Scratch",     scheduledAt: new Date(now.getTime() + 24 * 3600000), status: "scheduled", durationMins: 60  },
    { course: courses[2]._id, mentor: (await Mentor.findOne({ user: mentorUsers[3]._id }))._id, title: "PM Interview Mock Session",        scheduledAt: new Date(now.getTime() + 48 * 3600000), status: "scheduled", durationMins: 120 },
    { course: courses[3]._id, mentor: (await Mentor.findOne({ user: mentorUsers[2]._id }))._id, title: "Design System Workshop",           scheduledAt: new Date(now.getTime() + 72 * 3600000), status: "scheduled", durationMins: 90  },
    { course: courses[5]._id, mentor: (await Mentor.findOne({ user: mentorUsers[5]._id }))._id, title: "Kubernetes Production Deployment", scheduledAt: new Date(now.getTime() - 2  * 3600000), status: "completed", durationMins: 90, recordingUrl: "https://example.com/rec/k8s-1" },
  ]);
  console.log("📺  Live classes seeded");

  // ── Blogs ──────────────────────────────────────────────────────────────
  await Blog.insertMany([
    {
      title: "How I Cracked Google with 0 Experience",
      slug: "how-i-cracked-google-zero-experience",
      excerpt: "A step-by-step account of going from a tier-3 college to Google SWE in 8 months.",
      content: "<p>Full blog content here...</p>",
      category: "Career", color: "#f97316",
      author: studentUsers[0]._id,
      tags: ["Google", "FAANG", "DSA", "Interview"],
      readTime: "8 min", views: 42000, isPublished: true, publishedAt: new Date("2026-02-12"),
    },
    {
      title: "Top 10 Data Science Projects for 2026",
      slug: "top-10-data-science-projects-2026",
      excerpt: "Build these 10 projects to stand out in every data science interview.",
      content: "<p>Full blog content here...</p>",
      category: "Tech", color: "#8b5cf6",
      author: mentorUsers[1]._id,
      tags: ["Data Science", "Python", "ML", "Portfolio"],
      readTime: "6 min", views: 31000, isPublished: true, publishedAt: new Date("2026-02-10"),
    },
    {
      title: "Product Management Roadmap for Freshers",
      slug: "product-management-roadmap-freshers",
      excerpt: "Everything you need to know to land your first PM role — from a VP of Product.",
      content: "<p>Full blog content here...</p>",
      category: "Business", color: "#06b6d4",
      author: mentorUsers[3]._id,
      tags: ["Product Management", "Career", "Fresher"],
      readTime: "10 min", views: 28000, isPublished: true, publishedAt: new Date("2026-02-08"),
    },
    {
      title: "UI/UX Trends That Will Define 2026",
      slug: "uiux-trends-2026",
      excerpt: "Glassmorphism is dead. Here's what the best designers are actually shipping.",
      content: "<p>Full blog content here...</p>",
      category: "Design", color: "#ec4899",
      author: mentorUsers[2]._id,
      tags: ["Design", "UI", "UX", "Figma", "Trends"],
      readTime: "5 min", views: 19000, isPublished: true, publishedAt: new Date("2026-02-05"),
    },
  ]);
  console.log("✍️   Blogs seeded");

  console.log("\n✅  All collections seeded successfully!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🔑  Admin login:  admin@talentstack.com  /  Password@123");
  console.log("🔑  Mentor login: arjun@talentstack.com  /  Password@123");
  console.log("🔑  Student login: ravi@example.com      /  Password@123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
