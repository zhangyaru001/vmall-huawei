export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  description: string;
  specs: string[];
  tags: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "HUAWEI Mate 70 Pro",
    price: 6499,
    originalPrice: 6999,
    image: "https://picsum.photos/400/400?random=1",
    category: "手机",
    description: "超光变 XMAGE 影像，玄武架构，第二代昆仑玻璃",
    specs: ["12GB + 256GB", "12GB + 512GB", "12GB + 1TB"],
    tags: ["热销", "新品"]
  },
  {
    id: 2,
    name: "HUAWEI Mate X6",
    price: 12999,
    originalPrice: 13999,
    image: "https://picsum.photos/400/400?random=2",
    category: "手机",
    description: "折叠屏旗舰，轻薄设计，强劲性能",
    specs: ["12GB + 256GB", "16GB + 512GB"],
    tags: ["热销", "折叠屏"]
  },
  {
    id: 3,
    name: "HUAWEI MatePad Pro 13.2",
    price: 4999,
    originalPrice: 5499,
    image: "https://picsum.photos/400/400?random=3",
    category: "平板",
    description: "13.2英寸柔性 OLED 屏，鸿蒙系统，办公娱乐利器",
    specs: ["12GB + 256GB", "12GB + 512GB"],
    tags: ["新品", "平板"]
  },
  {
    id: 4,
    name: "HUAWEI MateBook GT 14",
    price: 7499,
    originalPrice: 7999,
    image: "https://picsum.photos/400/400?random=4",
    category: "笔记本",
    description: "14英寸高性能轻薄本，Intel Core Ultra 处理器",
    specs: ["16GB + 1TB", "32GB + 1TB"],
    tags: ["热销", "笔记本"]
  },
  {
    id: 5,
    name: "HUAWEI FreeBuds Pro 4",
    price: 1499,
    originalPrice: 1699,
    image: "https://picsum.photos/400/400?random=5",
    category: "音频",
    description: "主动降噪，Hi-Res 音质认证，无线充电",
    specs: ["曜石黑", "云杉绿"],
    tags: ["新品", "音频"]
  },
  {
    id: 6,
    name: "HUAWEI Watch GT 5",
    price: 1688,
    originalPrice: 1888,
    image: "https://picsum.photos/400/400?random=6",
    category: "穿戴",
    description: "14天超长续航，100+运动模式，健康监测",
    specs: ["46mm", "41mm"],
    tags: ["热销", "穿戴"]
  },
  {
    id: 7,
    name: "HUAWEI Vision Glass",
    price: 2999,
    originalPrice: 3299,
    image: "https://picsum.photos/400/400?random=7",
    category: "其他",
    description: "AR 智能眼镜，120英寸虚拟屏幕，便携影院",
    specs: ["标准版"],
    tags: ["新品", "AR"]
  },
  {
    id: 8,
    name: "HUAWEI Sound Joy 2",
    price: 899,
    originalPrice: 999,
    image: "https://picsum.photos/400/400?random=8",
    category: "音频",
    description: "便携蓝牙音箱，26小时续航，IP67防水",
    specs: ["海岛蓝", "曜石黑", "云杉绿"],
    tags: ["热销", "音频"]
  },
  {
    id: 9,
    name: "HUAWEI MatePad 11.5\"S",
    price: 2299,
    originalPrice: 2599,
    image: "https://picsum.photos/400/400?random=9",
    category: "平板",
    description: "11.5英寸 144Hz 高刷屏，华为笔记，专业绘画",
    specs: ["8GB + 128GB", "8GB + 256GB"],
    tags: ["新品", "平板"]
  },
  {
    id: 10,
    name: "HUAWEI Pocket 2",
    price: 7499,
    originalPrice: 7999,
    image: "https://picsum.photos/400/400?random=10",
    category: "手机",
    description: "竖折折叠屏，珍珠双环设计，超光谱摄像头",
    specs: ["12GB + 256GB", "12GB + 512GB"],
    tags: ["热销", "折叠屏"]
  }
];

export const categories = [
  { name: "手机", key: "手机", icon: "📱" },
  { name: "笔记本", key: "笔记本", icon: "💻" },
  { name: "平板", key: "平板", icon: "📱" },
  { name: "穿戴", key: "穿戴", icon: "⌚" },
  { name: "音频", key: "音频", icon: "🎧" },
  { name: "智能家居", key: "智能家居", icon: "🏠" },
  { name: "配件", key: "配件", icon: "🔌" }
];

export const banners = [
  {
    id: 1,
    image: "https://picsum.photos/1200/500?random=101",
    title: "HUAWEI Mate 70 系列",
    subtitle: "超光变 XMAGE 影像"
  },
  {
    id: 2,
    image: "https://picsum.photos/1200/500?random=102",
    title: "HUAWEI Mate X6",
    subtitle: "折叠屏旗舰"
  },
  {
    id: 3,
    image: "https://picsum.photos/1200/500?random=103",
    title: "HUAWEI MatePad Pro",
    subtitle: "创作无限可能"
  }
];
