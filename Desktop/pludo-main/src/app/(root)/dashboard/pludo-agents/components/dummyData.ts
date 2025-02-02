export interface Agent {
  id: string;
  name: string;
  role: string;
  image: string;
  isLocked: boolean;
  isSpecial?: boolean;
} 
import Avatars from "@/lib/Avatars";

export const pludoAgentsData: Agent[] = [
  {
    id: "pludo",
    name: "Pludo X",
    role: "Unlock All 17 Agents",
    image: "/images/Avatars/Hero.png",
    isLocked: true,
    isSpecial: true,
  }, 
  {
    id: "ace",
    name: "Ace",
    role: "Bussiness Development",
    image: Avatars.Ace,
    isLocked: false,
  },
  {
    id: "cora",
    name: "CORA",
    role: "Customer Support",
    image: Avatars.Cora,
    isLocked: true,
  },
  {
    id: "echo",
    name: "Echo",
    role: "eCommerce Specialist",
    image: Avatars.Echo,
    isLocked: true,
  },
  {
    id: "delta",
    name: "Delta",
    role: "Data Analyst",
    image: Avatars.Delta,
    isLocked: false,
  },
  {
    id: "ember",
    name: "Ember",
    role: "Email Marketing",
    image: Avatars.Ember,
    isLocked: true,
  },
  {
    id: "gala",
    name: "Gala",
    role: "Personal Development Coach",
    image: Avatars.Gala,
    isLocked: false,
  },
  {
    id: "maverik",
    name: "Maverik",
    role: "Sales Manager",
    image: Avatars.Maverik,
    isLocked: true,
  },
  {
    id: "quill",
    name: "Quill",
    role: "Copy Writer",
    image: Avatars.Quill,
    isLocked: true,
  },
  {
    id: "ryder",
    name: "Ryder",
    role: "Recruiter",
    image: Avatars.Ryder,
    isLocked: false,
  },
  {
    id: "sage",
    name: "Sage",
    role: "SEO Specialist",
    image: Avatars.Sage,
    isLocked: true,
  },
  {
    id: "lumen",
    name: "Lumen",
    role: "Social Media Specialist",
    image: Avatars.Lumen,
    isLocked: true,
  },
  {
    id: "vera",
    name: "Vera",
    role: "Virtual Assistant",
    image: Avatars.Vera,
    isLocked: true,
  },
  {
    id: "aria",
    name: "Aria",
    role: "Education Specialist",
    image: Avatars.Aria,
    isLocked: true,
  },
  {
    id: "drift",
    name: "Drift",
    role: "Event Planner",
    image: Avatars.Drift,
    isLocked: false,
  },
  {
    id: "neon",
    name: "Neon",
    role: "Creative Designer",
    image: Avatars.Neon,
    isLocked: true,
  },
  {
    id: "pulse",
    name: "Pulse",
    role: "Health & Wellness Advisor",
    image: Avatars.Pulse,
    isLocked: true,
  },
  {
    id: "nova",
    name: "Nova",
    role: "Customizable Support Agent",
    image: Avatars.Nova,
    isLocked: false,
  },
];
