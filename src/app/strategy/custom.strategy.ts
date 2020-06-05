import { Context, Position, SnakeDirection } from './context';
import { Strategy } from './strategy';

export class CustomStrategy implements Strategy {
  private steps = 0;
  private current = SnakeDirection.left;

  step(context: Context): SnakeDirection {
    const traverser = new FieldTraverser();
    const directions = traverser.getDirections(context.snake.parts[0], context.fruit);
    return directions[0];
  }
}

export interface VisitSpec {
  pos: number;
  dist: number;
  prev: number | null;
}

export class FieldTraverser {
  private static readonly FIELD_WIDTH = 18;
  private static readonly FIELD_HEIGHT = 18;
  private traversalQueue: VisitSpec[];
  private visitedWithPrev: Map<number, number>;

  constructor() { }

  getDirections(start: Position, dest: Position): SnakeDirection[] {
    const startPrimitive = this.asPrimitive(start);
    const destPrimitive = this.asPrimitive(dest);
    this.traverse(startPrimitive, destPrimitive);
    return this.reconstructPathTo(destPrimitive);
  }

  private asPrimitive(pos: Position): number {
    return pos.x + pos.y * FieldTraverser.FIELD_WIDTH;
  }

  private traverse(start: number, dest: number): VisitSpec {
    this.traversalQueue = [{ pos: start, dist: 0, prev: null }];
    this.visitedWithPrev = new Map();

    while (true) {
      let spec = this.traversalQueue.shift();
      if (!this.visitedWithPrev.has(spec.pos)) {
        this.visit(spec);
      }
      if (spec.pos === dest) {
        return spec;
      }
    }
  }

  private visit({ pos, dist, prev }: VisitSpec): void {
    this.visitedWithPrev.set(pos, prev);
    this.traversalQueue.push({ pos: pos + 1, dist: dist + 1, prev: pos });
    this.traversalQueue.push({ pos: pos - 1, dist: dist + 1, prev: pos });
    this.traversalQueue.push({ pos: pos + FieldTraverser.FIELD_WIDTH, dist: dist + 1, prev: pos });
    this.traversalQueue.push({ pos: pos - FieldTraverser.FIELD_WIDTH, dist: dist + 1, prev: pos });
  }

  private reconstructPathTo(dest: number): SnakeDirection[] {
    const path: SnakeDirection[] = [];

    let prev, cur = dest;
    while (true) {
      prev = this.visitedWithPrev.get(cur);
      if (prev === null) {
        return path;
      } else {
        path.unshift(this.getDirection(prev, cur));
        cur = prev;
      }
    }
  }

  private getDirection(prev: number, cur: number): SnakeDirection {
    switch (cur - prev) {
      case 1:
        return SnakeDirection.right;
      case -1:
        return SnakeDirection.left;
      case FieldTraverser.FIELD_WIDTH:
        return SnakeDirection.down;
      case -FieldTraverser.FIELD_WIDTH:
        return SnakeDirection.up;
      default:
        throw Error(`Invalid movement detected: ${prev} to ${cur}.`);
    }
  }
}
