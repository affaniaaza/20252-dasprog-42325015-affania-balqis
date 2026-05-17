"use client";

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
import z from "zod";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";

//validasi formulir menggunakan zod untuk memastikan bahwa input yang dimasukkan adalah angka positif
const formSchema = z.object({
  radius: z
    .string()
    .min(1, "Radius Lingkaran harus diisi")
    .regex(/^\d+(\.\d+)?$/, "Radius harus berupa angka positif")
    .regex(/^(?!0+(\.0+)?$)\d+(\.\d+)?$/, "Radius tidak boleh nol")
    .transform(Number),
});

const HitungLingkaran = () => {
  //State (kondisi/status) untuk menyimpan hasil perhitungan luas dan keliling lingkaran serta status apakah hasil perhitungan sudah ditampilkan atau belum
  const [radius, setRadius] = useState(0);
  const [luas, setLuas] = useState(0);
  const [keliling, setKeliling] = useState(0);
  const [sdhDihitung, setSdhDihitung] = useState(false);

  // Inisialisasi form menggunakan useForm dari @tanstack/react-form dengan konfigurasi default values, validators, dan onSubmit handler.
  const form = useForm({
    // Menentukan default values untuk masing-masing field dalam formulir.
    defaultValues: { radius: "" },
    // Menentukan validasi untuk setiap field dalam formulir menggunakan zod.
    validators: { onBlur: formSchema },
    // Menentukan fungsi yang akan dipanggil ketika formulir disubmit.
    onSubmit: ({ value }) => {
      console.log(value);

      const r = Number(value.radius); // Mengambil nilai radius dari form dan mengkonversinya menjadi angka untuk digunakan dalam perhitungan luas dan keliling lingkaran
      const hitungLuas = Math.PI * r * r; // Rumus luas lingkaran: πr²
      const hitungKeliling = 2 * Math.PI * r; // Rumus keliling lingkaran: 2πr

      console.log("Luas Lingkaran:", hitungLuas);
      console.log("Keliling Lingkaran:", hitungKeliling);

      setRadius(r);
      setLuas(hitungLuas);
      setKeliling(hitungKeliling);
      setSdhDihitung(true); // Menandakan bahwa perhitungan sudah dilakukan sehingga hasilnya dapat ditampilkan di UI
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Kalkulasi Lingkaran</CardTitle>
          <CardDescription>Hitung luas dan keliling lingkaran</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <form
            id="hitung-lingkaran-form"
            onSubmit={(e) => {
              e.preventDefault(); // Mencegah perilaku default form yang akan me-refresh halaman saat disubmit
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="radius">
                {(field) => {
                  // menentukan apakah field radius sudah disentuh (touched) dan valid atau tidak, untuk menampilkan pesan error jika input tidak valid
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Radius Lingkaran
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Masukkan radius lingkaran dalam cm"
                        autoComplete="off"
                      />
                      <FieldDescription>
                        Masukkan nilai radius lingkaran dalam satuan meter
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
        {sdhDihitung && (
          <>
            <div className="px-6 text-orange-700 rounded-lg">
              <h1 className="font-semibold mb-3">
                Hasil Kalkulasi Lingkaran Radius {""}
                {radius.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}{" "}
                cm
              </h1>
              <p>
                luas: {""}
                {luas.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}{" "}
                {""} cm<sup>2</sup>, keliling: {""}
                {keliling.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}{" "}
                cm
              </p>
            </div>
            <Separator />
          </>
        )}
        <CardFooter className="flex gap-2">
          <Button
            type="button"
            onClick={() => {
              form.reset();
              setSdhDihitung(false);
            }}
            className="rounded-lg"
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="hitung-lingkaran-form"
            variant="outline"
            className="rounded-lg"
          >
            Hitung Luas dan Keliling
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HitungLingkaran;
