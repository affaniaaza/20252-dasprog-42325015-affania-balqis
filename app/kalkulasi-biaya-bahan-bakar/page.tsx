"use client";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Validasi input: harus angka positif dan tidak boleh nol
const formSchema = z.object({
  pemakaian: z
    .string()
    .min(1, "Pemakaian harus diisi")
    .regex(/^\d+(\.\d+)?$/, "Harus berupa angka positif")
    .regex(/^(?!0+(\.0+)?$)\d+(\.\d+)?$/, "Tidak boleh nol")
    .transform(Number),
  jarak: z
    .string()
    .min(1, "Jarak harus diisi")
    .regex(/^\d+(\.\d+)?$/, "Harus berupa angka positif")
    .regex(/^(?!0+(\.0+)?$)\d+(\.\d+)?$/, "Tidak boleh nol")
    .transform(Number),
  harga: z
    .string()
    .min(1, "Harga harus diisi")
    .regex(/^\d+(\.\d+)?$/, "Harus berupa angka positif")
    .regex(/^(?!0+(\.0+)?$)\d+(\.\d+)?$/, "Tidak boleh nol")
    .transform(Number),
});

const BiayaBahanBakar = () => {
  const [biaya, setBiaya] = useState<number | null>(null);
  const [sdhDihitung, setSdhDihitung] = useState(false);

  const form = useForm({
    defaultValues: { pemakaian: "", jarak: "", harga: "" },
    validators: { onBlur: formSchema },
    onSubmit: ({ value }) => {
      const k = Number(value.pemakaian);
      const j = Number(value.jarak);
      const h = Number(value.harga);

      const totalLiter = k * j;
      const hitungBiaya = totalLiter * h;

      setBiaya(hitungBiaya);
      setSdhDihitung(true);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Card className="max-w-md w-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-xl p-6">
        <CardHeader>
          <CardTitle>Kalkulasi Biaya Bahan Bakar</CardTitle>
          <CardDescription className="text-gray-600">
            Hitung biaya perjalanan berdasarkan pemakaian bahan bakar, jarak
            tempuh, dan harga per liter
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <form
            id="biaya-bahan-bakar-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <FieldGroup>
              <form.Field name="pemakaian">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Pemakaian (Liter/Km)
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Masukkan pemakaian bahan bakar per km"
                        className="rounded-lg border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
                        autoComplete="off"
                      />
                      <FieldDescription className="text-gray-600">
                        Contoh: 0.1 berarti 1 liter untuk 10 km
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="jarak">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Jarak Tempuh (Km)
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Masukkan jarak tempuh perjalanan"
                        className="rounded-lg border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
                        autoComplete="off"
                      />
                      <FieldDescription className="text-gray-600">
                        Contoh: 150 berarti perjalanan sejauh 150 km
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="harga">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Harga per Liter (IDR)
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Masukkan harga bahan bakar per liter"
                        className="rounded-lg border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
                        autoComplete="off"
                      />
                      <FieldDescription className="text-gray-600">
                        Contoh: 15000 berarti harga bahan bakar per liter adalah
                        Rp 15.000
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <Separator />
        {sdhDihitung && biaya !== null && (
          <>
            <Alert
              variant="default"
              className="px-6 py-3 rounded-lg bg-red-50 border-red-200 text-red-700"
            >
              <AlertTitle className="font-semibold mb-2">
                Hasil Kalkulasi Biaya Bahan Bakar
              </AlertTitle>
              <AlertDescription>
                Biaya Bahan Bakar:{" "}
                <span className="font-bold text-blue-400">
                  Rp{" "}
                  {biaya.toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </AlertDescription>
            </Alert>
          </>
        )}
        <Separator />
        <CardFooter className="flex justify-between mt-4">
          <Button
            type="button"
            onClick={() => {
              form.reset();
              setSdhDihitung(false);
              setBiaya(null);
            }}
            className="rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100"
            variant="outline"
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="biaya-bahan-bakar-form"
            variant="outline"
            className="rounded-lg bg-gray-600 text-white shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-gray-700 hover:text-white"
          >
            Hitung Biaya
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BiayaBahanBakar;
