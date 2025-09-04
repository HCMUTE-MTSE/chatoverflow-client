import axios from "axios";
import type { Province } from "~/models/constant/Address.dto";
import type { Ward } from "~/models/constant/Address.dto";
const API_BASE = "https://provinces.open-api.vn/api/v2";

export async function getProvinces(): Promise<Province[]> {
  const res = await axios.get(`${API_BASE}/p`);
  return res.data;
}

export async function getWards(provinceId: string): Promise<Ward[]> {
  const res = await axios.get(`${API_BASE}/p/${provinceId}?depth=2`);
  // API trả về province object có wards array
  return res.data.wards || [];
}
