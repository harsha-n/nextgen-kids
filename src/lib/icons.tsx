import {
  Baby,
  BookOpen,
  Bus,
  Calendar,
  Camera,
  CheckCircle,
  Clock,
  GraduationCap,
  Heart,
  Home,
  ImageIcon,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Music,
  Palette,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Users,
  Utensils
} from "lucide-react";
import type { IconName } from "@/data/school.config";

export const iconMap = {
  baby: Baby,
  bookOpen: BookOpen,
  bus: Bus,
  calendar: Calendar,
  camera: Camera,
  checkCircle: CheckCircle,
  clock: Clock,
  graduationCap: GraduationCap,
  heart: Heart,
  home: Home,
  image: ImageIcon,
  mail: Mail,
  mapPin: MapPin,
  messageCircle: MessageCircle,
  moon: Moon,
  music: Music,
  palette: Palette,
  phone: Phone,
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  sun: Sun,
  users: Users,
  utensils: Utensils
} satisfies Record<IconName, typeof Baby>;

export function getIcon(name: IconName) {
  return iconMap[name] ?? Sparkles;
}
