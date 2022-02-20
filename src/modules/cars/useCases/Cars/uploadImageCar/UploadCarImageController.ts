import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadImageCarService } from "./UploadImageCarService";

class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id } = req.params;
    const images = req.files as Express.Multer.File[];

    const uploadImageCarService = container.resolve(UploadImageCarService);

    const images_name = images.map((file) => file.filename);

    const carsImages = await uploadImageCarService.execute({
      car_id,
      images_name,
    });

    return res.status(201).json(carsImages);
  }
}

export { UploadCarImageController };
