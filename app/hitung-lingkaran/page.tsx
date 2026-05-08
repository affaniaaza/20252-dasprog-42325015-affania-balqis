import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="p-4 text-2xl font-bold text-white border-2 border-amber-50 rounded-lg bg-gray-500 ">
        Pemrograman Website - Pertemuan 3
      </div>
      <div className="border-2 border-b-gray-400 rounded-lg p-4">
        <h1 className="text-xl font-bold">Kalkulasi Lingkaran</h1>
        <div className="flex flex-row gap-3 items-center pl-3">
          <p className="mt-2 mb-2">Berapa Radius Lingkaran?</p>
          <input
            type="number"
            placeholder="Masukkan radius lingkaran"
            className="border-2 border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <Button className="rounded-lg bg-gray-500 text-white hover:bg-gray-400">
          Hitung LUAS dan KELILING Lingkaran
        </Button>
      </div>
    </div>
  );
};

export default Page;
