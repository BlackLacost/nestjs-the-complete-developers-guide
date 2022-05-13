import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator'

export class CreateReportDto {
  @IsPositive()
  price: number

  @IsString()
  make: string

  @IsString()
  model: string

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number

  @IsLongitude()
  lng: number

  @IsLatitude()
  lat: number

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number
}
