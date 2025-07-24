export class Service {
  public id?: string;
  public typeService: string;
  public prices: number;
  public storeId: string;
  public observations?: string | null;

  constructor(
    typeService: string,
    prices: number,
    storeId: string,
    observations?: string | null,
    id?: string
  ) {
    this.typeService = typeService;
    this.prices = prices;
    this.storeId = storeId;

    if (observations !== undefined) this.observations = observations;
    if (id) this.id = id;
  }

  static updateService(existing: Service, updates: Partial<Service>): Service {
    return new Service(
      updates.typeService ?? existing.typeService,
      updates.prices ?? existing.prices,
      existing.storeId,
      updates.observations ?? existing.observations,
      existing.id
    );
  }
}
