import ResponseServices from "@/services/response";

class Controllers {
  public responseServices: ResponseServices;

  constructor() {
    this.responseServices = new ResponseServices();
  }
}

export default Controllers;
