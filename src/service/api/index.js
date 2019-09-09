import ApiRequest from "../request";

class Api {
  constructor() {}
  test = () => ApiRequest.get("/api/server_apche");
}
export default new Api();
