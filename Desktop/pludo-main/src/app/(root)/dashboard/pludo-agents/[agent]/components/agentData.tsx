import {
  KeyIcon as Strategy,
  Handshake,
  TrendingUp,
  FileText,
  MessageSquare,
  ClipboardList,
  BookOpen,
  Users,
  ShoppingCart,
  BarChart2,
  Megaphone,
  Package,
  Database,
  LineChart,
  FileSpreadsheet,
  Target,
  Zap,
  Award,
  Briefcase,
  UserCheck,
  Search,
  PenTool,
  Edit3, 
  Play,
  Calendar,
  Palette,
  Activity,
  Settings, 
} from "lucide-react"  
import { Link, Apple, Heart, Sun } from "lucide-react";
import {  ElementType } from "react"; 
import Avatars from "@/lib/Avatars";
export interface SubAgent {
  id: string;
  name: string;
  description: string;
  icon: ElementType;
}

export interface AgentWithSubAgents {
  name: string;
  role: string;
  image: string;
  subAgents: SubAgent[];
}
export const agentsWithSubAgents: AgentWithSubAgents[] = [
  {
    name: "Ace",
    role: "Business Analyst",
    image: Avatars.Ace,
    subAgents: [
      {
        id: "ace-1",
        name: "Strategic Planning Agent",
        description: "Formulates strategies for long-term goals.",
        icon: Strategy,
      },
      {
        id: "ace-2",
        name: "Partnership Management Agent",
        description: "Builds and maintains strategic partnerships.",
        icon: Handshake,
      },
      {
        id: "ace-3",
        name: "Market Analysis Agent",
        description: "Analyzes customer trends and opportunities.",
        icon: TrendingUp,
      },
      {
        id: "ace-4",
        name: "Business Proposal Agent",
        description: "Creates proposals to secure funding or deals.",
        icon: FileText,
      },
    ],
  },
  {
    name: "Cora",
    role: "Customer Support",
    image: Avatars.Cora,
    subAgents: [
      {
        id: "cora-1",
        name: "Issue Resolution Agent",
        description: "Addresses customer complaints and issues.",
        icon: MessageSquare,
      },
      {
        id: "cora-2",
        name: "Feedback Collection Agent",
        description: "Gathers insights through customer surveys.",
        icon: ClipboardList,
      },
      {
        id: "cora-3",
        name: "Knowledge Base Management Agent",
        description: "Maintains a comprehensive knowledge base.",
        icon: BookOpen,
      },
      {
        id: "cora-4",
        name: "Customer Engagement Agent",
        description: "Proactively engages customers for loyalty.",
        icon: Users,
      },
    ],
  },
  {
    name: "Echo",
    role: "eCommerce Specialist",
    image: Avatars.Echo,
    subAgents: [
      {
        id: "echo-1",
        name: "Product Listing Agent",
        description: "Creates and optimizes product listings.",
        icon: ShoppingCart,
      },
      { id: "echo-2", name: "Sales Analytics Agent", description: "Analyzes sales data and trends.", icon: BarChart2 },
      {
        id: "echo-3",
        name: "Campaign Management Agent",
        description: "Oversees execution of promotional campaigns.",
        icon: Megaphone,
      },
      {
        id: "echo-4",
        name: "Inventory Management Agent",
        description: "Monitors and optimizes stock levels.",
        icon: Package,
      },
    ],
  },
  {
    name: "Delta",
    role: "Data Analyst",
    image: Avatars.Delta,
    subAgents: [
      {
        id: "delta-1",
        name: "Data Collection Agent",
        description: "Gathers reliable data from diverse sources.",
        icon: Database,
      },
      {
        id: "delta-2",
        name: "Trend Analysis Agent",
        description: "Identifies patterns and trends in data.",
        icon: LineChart,
      },
      {
        id: "delta-3",
        name: "Reporting Agent",
        description: "Compiles data into actionable reports.",
        icon: FileSpreadsheet,
      },
      {
        id: "delta-4",
        name: "Data Cleaning Agent",
        description: "Ensures data accuracy and consistency.",
        icon: FileText,
      },
    ],
  },
  {
    name: "Ember",
    role: "Email Marketing",
    image: Avatars.Ember,
    subAgents: [
      {
        id: "ember-1",
        name: "Campaign Design Agent",
        description: "Designs engaging and persuasive email campaigns.",
        icon: Palette,
      },
      {
        id: "ember-2",
        name: "Audience Segmentation Agent",
        description: "Segments email lists for personalization.",
        icon: Users,
      },
      {
        id: "ember-3",
        name: "Performance Tracking Agent",
        description: "Monitors key email campaign metrics.",
        icon: BarChart2,
      },
      {
        id: "ember-4",
        name: "A/B Testing Agent",
        description: "Tests strategies for maximum engagement.",
        icon: Target,
      },
    ],
  },
  {
    name: "Gala",
    role: "Personal Development Coach",
    image: Avatars.Gala,
    subAgents: [
      {
        id: "gala-1",
        name: "Goal Setting Agent",
        description: "Defines actionable goals and strategies.",
        icon: Target,
      },
      {
        id: "gala-2",
        name: "Skill Enhancement Agent",
        description: "Provides resources for skill development.",
        icon: Zap,
      },
      {
        id: "gala-3",
        name: "Motivational Agent",
        description: "Inspires clients to overcome challenges.",
        icon: Award,
      },
      {
        id: "gala-4",
        name: "Accountability Agent",
        description: "Ensures clients stay on track.",
        icon: ClipboardList,
      },
    ],
  },
  {
    name: "Maverik",
    role: "Sales Manager",
    image: Avatars.Maverik,
    subAgents: [
      { id: "maverik-1", name: "Team Management Agent", description: "Leads and trains the sales team.", icon: Users },
      {
        id: "maverik-2",
        name: "Sales Strategy Agent",
        description: "Designs innovative revenue strategies.",
        icon: Strategy,
      },
      {
        id: "maverik-3",
        name: "Client Acquisition Agent",
        description: "Sources and acquires new clients.",
        icon: UserCheck,
      },
      {
        id: "maverik-4",
        name: "Customer Retention Agent",
        description: "Builds relationships for repeat business.",
        icon: Handshake,
      },
    ],
  },
  {
    name: "Quill",
    role: "Copy Writer",
    image: Avatars.Quill,
    subAgents: [
      {
        id: "quill-1",
        name: "Content Creation Agent",
        description: "Writes persuasive content for marketing.",
        icon: PenTool,
      },
      { id: "quill-2", name: "SEO Writing Agent", description: "Optimizes content for search engines.", icon: Search },
      {
        id: "quill-3",
        name: "Editing and Proofreading Agent",
        description: "Reviews content for clarity and errors.",
        icon: Edit3,
      },
      {
        id: "quill-4",
        name: "Creative Storytelling Agent",
        description: "Crafts compelling brand narratives.",
        icon: BookOpen,
      },
    ],
  },
  {
    name: "Ryder",
    role: "Recruiter",
    image: Avatars.Ryder,
    subAgents: [
      {
        id: "ryder-1",
        name: "Talent Sourcing Agent",
        description: "Seeks and evaluates qualified candidates.",
        icon: Search,
      },
      {
        id: "ryder-2",
        name: "Interview Coordination Agent",
        description: "Manages scheduling and interview logistics.",
        icon: Calendar,
      },
      {
        id: "ryder-3",
        name: "Onboarding Agent",
        description: "Facilitates smooth onboarding for hires.",
        icon: UserCheck,
      },
      {
        id: "ryder-4",
        name: "Employee Engagement Agent",
        description: "Maintains relationships with employees.",
        icon: Users,
      },
    ],
  },
  {
    name: "Sage",
    role: "SEO Specialist",
    image: Avatars.Sage,
    subAgents: [
      {
        id: "sage-1",
        name: "Keyword Research Agent",
        description: "Identifies high-ranking SEO keywords.",
        icon: Search,
      },
      {
        id: "sage-2",
        name: "Content Optimization Agent",
        description: "Enhances content for SEO performance.",
        icon: FileText,
      },
      {
        id: "sage-3",
        name: "Performance Monitoring Agent",
        description: "Tracks and analyzes SEO metrics.",
        icon: BarChart2,
      },
      { id: "sage-4", name: "Link Building Agent", description: "Builds backlinks to boost rankings.", icon: Link },
    ],
  },
  {
    name: "Lumen",
    role: "Social Media Specialist",
    image: Avatars.Lumen,
    subAgents: [
      {
        id: "lumen-1",
        name: "Content Scheduling Agent",
        description: "Schedules posts for consistent engagement.",
        icon: Calendar,
      },
      {
        id: "lumen-2",
        name: "Engagement Tracking Agent",
        description: "Tracks metrics like likes and shares.",
        icon: BarChart2,
      },
      {
        id: "lumen-3",
        name: "Platform Strategy Agent",
        description: "Develops strategies for social platforms.",
        icon: Strategy,
      },
      {
        id: "lumen-4",
        name: "Community Management Agent",
        description: "Interacts with and supports the audience.",
        icon: MessageSquare,
      },
    ],
  },
  {
    name: "Vera",
    role: "Virtual Assistant",
    image: Avatars.Vera,
    subAgents: [
      {
        id: "vera-1",
        name: "Administrative Tasks Agent",
        description: "Handles day-to-day administrative duties.",
        icon: ClipboardList,
      },
      {
        id: "vera-2",
        name: "Data Management Agent",
        description: "Organizes and maintains accurate data.",
        icon: Database,
      },
      {
        id: "vera-3",
        name: "Research Assistance Agent",
        description: "Conducts research and provides reports.",
        icon: Search,
      },
      {
        id: "vera-4",
        name: "Customer Support Agent",
        description: "Addresses inquiries to ensure satisfaction.",
        icon: MessageSquare,
      },
    ],
  },
  {
    name: "Aria",
    role: "Education Specialist",
    image: Avatars.Aria,
    subAgents: [
      {
        id: "aria-1",
        name: "Curriculum Design Agent",
        description: "Designs structured and engaging curricula.",
        icon: BookOpen,
      },
      {
        id: "aria-2",
        name: "Instructional Support Agent",
        description: "Provides resources to improve teaching.",
        icon: Users,
      },
      {
        id: "aria-3",
        name: "Student Assessment Agent",
        description: "Develops assessments to evaluate progress.",
        icon: ClipboardList,
      },
      {
        id: "aria-4",
        name: "E-Learning Development Agent",
        description: "Creates interactive online learning content.",
        icon: Zap,
      },
    ],
  },
  {
    name: "Drift",
    role: "Event Planner",
    image: Avatars.Drift,
    subAgents: [
      {
        id: "drift-1",
        name: "Event Design Agent",
        description: "Conceptualizes themes and decorations.",
        icon: Palette,
      },
      {
        id: "drift-2",
        name: "Vendor Coordination Agent",
        description: "Manages vendor contracts and delivery.",
        icon: Handshake,
      },
      {
        id: "drift-3",
        name: "On-Site Management Agent",
        description: "Oversees logistics during events.",
        icon: Briefcase,
      },
      {
        id: "drift-4",
        name: "Budget Management Agent",
        description: "Tracks and allocates event budgets.",
        icon: FileSpreadsheet,
      },
    ],
  },
  {
    name: "Neon",
    role: "Creative Designer",
    image: Avatars.Neon,
    subAgents: [
      { id: "neon-1", name: "Graphic Design Agent", description: "Creates captivating visual designs.", icon: Palette },
      {
        id: "neon-2",
        name: "Brand Identity Agent",
        description: "Develops and maintains consistent branding.",
        icon: Briefcase,
      },
      { id: "neon-3", name: "UI/UX Design Agent", description: "Designs user-friendly digital interfaces.", icon: Zap },
      { id: "neon-4", name: "Motion Graphics Agent", description: "Creates dynamic video content.", icon: Play },
    ],
  },
  {
    name: "Pulse",
    role: "Health & Wellness Advisor",
    image: Avatars.Pulse,
    subAgents: [
      {
        id: "pulse-1",
        name: "Nutrition Planning Agent",
        description: "Designs personalized nutrition plans.",
        icon: Apple,
      },
      {
        id: "pulse-2",
        name: "Exercise Guidance Agent",
        description: "Provides personalized fitness routines.",
        icon: Activity,
      },
      {
        id: "pulse-3",
        name: "Mental Wellness Support Agent",
        description: "Offers strategies for mental health.",
        icon: Heart,
      },
      {
        id: "pulse-4",
        name: "Holistic Health Agent",
        description: "Integrates physical and spiritual wellness.",
        icon: Sun,
      },
    ],
  },
  {
    name: "Nova",
    role: "Customizable Support Agent",
    image: Avatars.Nova,
    subAgents: [
      {
        id: "nova-1",
        name: "Feature Configuration Agent",
        description: "Customizes features to user needs.",
        icon: Settings,
      },
      { id: "nova-2", name: "User Training Agent", description: "Provides training for efficient use.", icon: Users },
      {
        id: "nova-3",
        name: "Feedback Integration Agent",
        description: "Analyzes feedback to prioritize updates.",
        icon: MessageSquare,
      },
      {
        id: "nova-4",
        name: "Customer Success Agent",
        description: "Ensures satisfaction and ongoing support.",
        icon: Award,
      },
    ],
  },
]

