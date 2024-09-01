"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { LabelList, Pie, PieChart } from "recharts";
import { OrderItem } from "../../order-manage/type/OrderItem";

interface OrderPieChartProps {
  monthOrderData: OrderItem[];
}

interface chartItemType {
  menu: string;
  quantity: number;
  fill?: string;
}

const colorPalette = [
  "#FF4500", // 가장 많이 팔린 메뉴 색상
  "#FF8C00",
  "#FFD700",
  "#ADFF2F",
  "#32CD32",
  "#00FA9A",
  "#4682B4",
  "#4169E1",
  "#8A2BE2",
  "#FF69B4",
  "#FF6347", // Tomato
  "#FF7F50", // Coral
  "#FFD700", // Gold
  "#ADFF2F", // GreenYellow
  "#7FFF00", // Chartreuse
  "#00FF7F", // SpringGreen
  "#87CEEB", // SkyBlue
  "#6495ED", // CornflowerBlue
  "#BA55D3", // MediumOrchid
  "#DA70D6", // Orchid
];

export const OrderPieChart = ({ monthOrderData }: OrderPieChartProps) => {
  const [orderChartData, setOrderChartData] = useState<chartItemType[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    const menuSet: chartItemType[] = [];

    if (monthOrderData.length === 0) {
      setOrderChartData([]);
      setChartConfig({});
      return;
    }

    monthOrderData.forEach((orderData) => {
      orderData.items.forEach((order) => {
        const existingItem = menuSet.find((set) => set.menu === order.name);

        if (existingItem) {
          existingItem.quantity += order.quantity;
        } else {
          menuSet.push({
            menu: order.name,
            quantity: order.quantity,
          });
        }
      });
    });
    menuSet.sort((a, b) => b.quantity - a.quantity);

    const updatedMenuSet = menuSet.map((item, index) => ({
      ...item,
      fill: colorPalette[index % colorPalette.length],
    }));

    setOrderChartData(updatedMenuSet);

    const orderChartConfig: ChartConfig = menuSet.reduce((acc, item, index) => {
      acc[item.menu] = {
        label: item.menu,
        color: item.fill!,
      };
      return acc;
    }, {} as ChartConfig);

    setChartConfig({
      menu: { label: "Menu" }, // 차트의 레이블 (기본값)
      ...orderChartConfig,
    });
  }, [monthOrderData]);

  return (
    <div>
      <span>월 매출:</span>{monthOrderData.reduce((acc, cur) => acc + cur.totalPrice, 0)}
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-[500px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="menu" />}
          />
          <Pie data={orderChartData} dataKey={"quantity"} nameKey={"menu"}>
            <LabelList
              dataKey={"menu"}
              className="fill-background"
              stroke="none"
              fontSize={12}
              formatter={(value: keyof typeof chartConfig) =>
                chartConfig[value]?.label
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
};
