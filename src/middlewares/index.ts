import Services from "@/services";

class Middleware {
  public services: Services;

  constructor() {
    this.services = new Services();
  }
}

export default Middleware;
