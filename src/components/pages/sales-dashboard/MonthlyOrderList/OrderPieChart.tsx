import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import { OrderItem } from "../../order-manage/type/OrderItem";

// chartData 만들어야 함. 메뉴... 메뉴를 어쩌지?
// 메뉴는 고정이 아님... 즉 DB에 있는 메뉴를 가져와서 만들 수 없음
// 그냥 월 주문 목록에서 메뉴를 뽑아 내야 함.

interface OrderPieChartProps {
  monthOrderData: OrderItem[];
}

interface chartItemType {
  menu: string;
  quantity: number;
}

export const OrderPieChart = ({ monthOrderData }: OrderPieChartProps) => {
  console.log("monthOrderData", monthOrderData);

  const [orderChartData, setOrderChartData] = useState<chartItemType[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    const menuSet: chartItemType[] = [];

    if (monthOrderData.length === 0) {
      setOrderChartData([]);
      setChartConfig({});
      return;
    }
    monthOrderData.map((orderData) => {
      orderData.items.map((order) => {
        const existingItem = menuSet.find((set) => set.menu === order.name);

        if (existingItem) {
          existingItem.quantity += order.quantity;
        } else {
          menuSet.push({ menu: order.name, quantity: order.quantity });
        }
      });
    });
    setOrderChartData(menuSet);

    const orderChartConfig: ChartConfig = menuSet.reduce((acc, item, index) => {
      acc[item.menu] = {
        label: item.menu,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    }, {} as ChartConfig);
    setChartConfig(orderChartConfig);

    console.log(menuSet);
  }, [monthOrderData]);

  const totalPrice = monthOrderData.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0
  );

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={orderChartData}
          dataKey={"quantity"}
          nameKey="menu"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalPrice.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Visitors
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};
