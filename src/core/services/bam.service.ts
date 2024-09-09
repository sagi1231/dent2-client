import { MalshabBam } from "../entities/MalshabBam";
import { ServiceBase } from "./service.base";

class BamService extends ServiceBase {
  prefix = "/bam";

  getTable() {
    return this.get<MalshabBam[]>("/getTable");
  }
}
const bamService = new BamService();
export default bamService;
