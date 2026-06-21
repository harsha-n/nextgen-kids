import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { SchoolConfig } from "@/data/school.config";

type Teacher = SchoolConfig["faculty"]["teachers"][number];

type FacultyCardProps = {
  teacher: Teacher;
};

export function FacultyCard({ teacher }: FacultyCardProps) {
  return (
    <Card className="h-full overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={teacher.image.src}
          alt={teacher.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-extrabold text-slate-950">{teacher.name}</h3>
        <p className="mt-1 text-sm font-bold text-coral-600">{teacher.role}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{teacher.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {teacher.specialties.map((specialty) => (
            <Badge key={specialty} variant="mint">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
