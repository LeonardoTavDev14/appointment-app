export type operationStatus = "OPEN" | "CLOSE";

export class Store {
  public id?: string;
  public name: string;
  public businessFone: string;
  public cep: string;
  public address: string;
  public operation: operationStatus;
  public openingHours: string;
  public closingTime: string;
  public userId: string;
  public cnpj?: string | null;

  constructor(
    name: string,
    businessFone: string,
    cep: string,
    address: string,
    operation: operationStatus,
    openingHours: string,
    closingTime: string,
    userId: string,
    cnpj?: string | null,
    id?: string
  ) {
    this.name = name;
    this.businessFone = businessFone;
    this.cep = cep;
    this.address = address;
    this.openingHours = openingHours;
    this.closingTime = closingTime;
    this.operation = operation;
    this.userId = userId;

    if (cnpj !== undefined) this.cnpj = cnpj;
    if (id) this.id = id;
  }

  static updateForm(existing: Store, updates: Partial<Store>): Store {
    return new Store(
      updates.name ?? existing.name,
      updates.businessFone ?? existing.businessFone,
      updates.cep ?? existing.cep,
      updates.address ?? existing.address,
      updates.operation ?? existing.operation,
      updates.openingHours ?? existing.openingHours,
      updates.closingTime ?? existing.closingTime,
      existing.userId,
      existing.cnpj,
      existing.id
    );
  }
}
