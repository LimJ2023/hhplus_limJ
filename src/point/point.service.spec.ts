import { Test, TestingModule } from '@nestjs/testing';
import { PointService } from './point.service';

describe('PointService', () => {
  let service: PointService;
  const userId = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointService],
    }).compile();

    service = module.get<PointService>(PointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPoint', () => {
    it('should return user point', async () => {
      const point = await service.getPoint(userId);
      expect(point).toBeDefined();
    });
  });

  describe('getHistory', () => {
    it('should return user point history', async () => {
      const history = await service.getHistory(userId);
      expect(history).toBeDefined();
    });
  });

  describe('charge', () => {
    it('should charge user point', async () => {
      const amount = 100;
      const point = await service.charge(userId, amount);
      expect(point).toBeDefined();
    });
  });

  describe('use', () => {
    it('should use user point', async () => {
      const amount = 100;
      const point = await service.use(userId, amount);
      expect(point).toBeDefined();
    });
  });
});
