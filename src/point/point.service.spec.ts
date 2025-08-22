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

  // GET /point/{id} : 포인트를 조회한다. 를 테스트합니다.
  describe('getPoint', () => {
    it('should return user point', async () => {
      const point = await service.getPoint(userId);
      expect(point).toBeDefined();
    });
  });

  // GET /point/{id}/histories : 포인트 내역을 조회한다. 를 테스트합니다.
  describe('getHistory', () => {
    it('should return user point history', async () => {
      const history = await service.getHistory(userId);
      expect(history).toBeDefined();
    });
  });

  // PATCH  /point/{id}/charge : 포인트를 충전한다. 를 테스트합니다.
  describe('charge', () => {
    it('should charge user point', async () => {
      const amount = 100;
      const point = await service.charge(userId, amount);
      expect(point).toBeDefined();
    });
  });

  // PATCH /point/{id}/use : 포인트를 사용한다. 를 테스트합니다.
  describe('use', () => {
    it('should use user point', async () => {
      const amount = 100;
      const point = await service.use(userId, amount);
      expect(point).toBeDefined();
    });
  });

  // 잔고가 부족할 경우, 포인트 사용은 실패하여야 합니다. 를 테스트합니다.
  describe('fail use point', () => {
    it('should fail use point', async () => {
      const amount = 10000000;
      const point = await service.use(userId, amount);
      expect(point).toBeNull();
    });
  });
});
