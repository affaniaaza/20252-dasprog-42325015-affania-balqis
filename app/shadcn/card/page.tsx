import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck } from "lucide-react";

const CardDemo = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Judul Card</CardTitle>
          <CardDescription>
            Deskripsi Card - Ini adalah deskripsi dari card
          </CardDescription>
          <CardAction>
            <Badge variant="destructive" className="rounded-lg">
              <BadgeCheck data-icon="inline-start" />
              Badge
            </Badge>
          </CardAction>
        </CardHeader>
        <Separator />
        <CardContent>
          <h1 className="font-bold">Isi Card</h1>
          <p>Ini adalah isi dari card, bisa berisi informasi tambahan</p>
        </CardContent>
        <Separator />
        <CardFooter className="flex gap-2">
          <Button className="rounded-lg">Button 1</Button>
          <Button size="lg" variant="outline" className="rounded-lg">
            Button 2
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardDemo;
