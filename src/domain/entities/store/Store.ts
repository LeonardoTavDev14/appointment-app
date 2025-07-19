export class Store {
  public id?: string;
  public name: string;
  public businessFone: string;
  public cep: string;
  public address: string;
  public userId: string;
  public cnpj?: string | null;

  constructor(
    name: string,
    businessFone: string,
    cep: string,
    address: string,
    userId: string,
    cnpj?: string | null,
    id?: string
  ) {
    this.name = name;
    this.businessFone = businessFone;
    this.cep = cep;
    this.address = address;
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
      existing.userId,
      existing.cnpj,
      existing.id
    );
  }
}
