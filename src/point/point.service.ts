import { Injectable, NotFoundException } from '@nestjs/common';
import { PointHistoryTable } from 'src/database/pointhistory.table';
import { UserPointTable } from 'src/database/userpoint.table';
import { PointHistory, UserPoint } from './point.model';

@Injectable()
export class PointService {
  constructor(
    private readonly userDb: UserPointTable,
    private readonly historyDb: PointHistoryTable,
  ) {}

  async getPoint(userId: number): Promise<UserPoint> {
    const user = await this.userDb.selectById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async getHistory(userId: number): Promise<PointHistory[]> {
    const user = await this.userDb.selectById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const history = await this.historyDb.selectAllByUserId(user.id);
    if (!history) {
      throw new NotFoundException('History not found');
    }
    return history;
  }

  async charge(userId: number, amount: number): Promise<UserPoint> {
    const user = await this.userDb.selectById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newPoint = user.point + amount;
    await this.userDb.insertOrUpdate(userId, newPoint);
    return { id: userId, point: newPoint, updateMillis: Date.now() };
  }

  async use(userId: number, amount: number): Promise<UserPoint> {
    const user = await this.userDb.selectById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newPoint = user.point - amount;
    // 잔고가 부족할 경우, 포인트 사용은 실패하여야 합니다.
    if (newPoint < 0) {
      return null;
    }
    await this.userDb.insertOrUpdate(userId, newPoint);
    return { id: userId, point: newPoint, updateMillis: Date.now() };
  }
}
