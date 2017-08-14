/**
 * Created by progden on 2017/8/14.
 */
export class Node {
  id: string;
  group: number;
}
export class Link {
  source: string;
  target: string;
  value: number;
}
export class Graph {
  nodes: Node[];
  links: Link[];
}
