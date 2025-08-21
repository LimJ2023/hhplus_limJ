import { Injectable } from '@nestjs/common';
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
    return user;
  }
  async getHistory(userId: number): Promise<PointHistory[]> {
    const history = await this.historyDb.selectAllByUserId(userId);
    return history;
  }

  async charge(userId: number, amount: number): Promise<UserPoint> {
    const user = await this.userDb.selectById(userId);
    const newPoint = user.point + amount;
    await this.userDb.insertOrUpdate(userId, newPoint);
    return { id: userId, point: newPoint, updateMillis: Date.now() };
  }

  async use(userId: number, amount: number): Promise<UserPoint> {
    const user = await this.userDb.selectById(userId);
    const newPoint = user.point - amount;
    await this.userDb.insertOrUpdate(userId, newPoint);
    return { id: userId, point: newPoint, updateMillis: Date.now() };
  }
}
