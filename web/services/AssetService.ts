import { ASSET_ENDPOINTS } from "@/lib/constants/EndPoints";
import BaseService from "./BaseService";

class AssetService extends BaseService {
    constructor() {
        super();
    }

    createAsset = (form: FormData) => {
        return this.post(ASSET_ENDPOINTS.CREATE, form);
    }

    updateAsset = (id: number, form: FormData) => {
        return this.put(ASSET_ENDPOINTS.UPDATE(id), form);
    }

}

export const assetService = new AssetService();