import { inject, injectable } from "tsyringe";

import { CarImage } from "../../../infra/typeorm/entities/CarImage";
import { ICarImagesRepository } from "../../../repositories/CarImages/ICarImagesRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadImageCarService {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
    const carImages = [];
    images_name.map(async (image) => {
      const carImage = await this.carImagesRepository.create(car_id, image);
      carImages.push(carImage);
    });

    return carImages;
  }
}

export { UploadImageCarService };
