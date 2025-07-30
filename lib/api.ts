import { Ecole } from "@/data/data";
import { Filiere } from "./types";

export async function getFilieres(): Promise<Filiere[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/filieres`);
  const data = await res.json();
  return data.data?.filieres || [];
}

export async function getEcoles(): Promise<Ecole[]> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/admin/ecoles`);
  const data = await res.json();
  return data.data?.ecoles || [];
}