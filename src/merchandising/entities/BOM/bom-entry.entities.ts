export class BomEntry {
  id: string;
  styleId: string;
  materialType: 'FABRIC' | 'TRIM' | 'ACCESSORY';
  materialName: string;
  consumption: number;
  unit: string;
  wastagePercentage: number;
  totalRequired: number;
}
