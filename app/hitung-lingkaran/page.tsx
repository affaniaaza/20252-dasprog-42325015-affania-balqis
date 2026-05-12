import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Kalkulasi Lingkaran</CardTitle>
          <CardDescription>Hitung luas dan keliling lingkaran</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Radius Lingkaran</FieldLabel>
              <Input />
              <FieldDescription>
                Masukkan nilai radius lingkaran dalam satuan meter
              </FieldDescription>
              <FieldError>
                Radius Lingkaran harus berupa angka positif.
              </FieldError>
            </Field>
          </FieldGroup>
        </CardContent>
        <Separator />
        <CardFooter className="flex gap-2">
          <Button className="rounded-lg">Reset</Button>
          <Button variant="outline" className="rounded-lg">
            Hitung Luas dan Keliling
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
