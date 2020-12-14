<template>
  <div class="dashboard">
    <!-- 外链 -->
    <!-- <div class="external-link">
      <a
         
        href="https://github.com/konglingwen94/vue-elm-admin"
        target="_blank"
        aria-label="View source on Github"
        class="github-corner github-corner"
        ><svg
          data-v-09fe1acc=""
          width="80"
          height="80"
          viewBox="0 0 250 250"
          aria-hidden="true"
          style="fill: rgb(64, 201, 198); color: rgb(255, 255, 255);"
        >
          <path data-v-09fe1acc="" d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path
            data-v-09fe1acc=""
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            class="octo-arm"
            style="transform-origin: 130px 106px 0px;"
          ></path>
          <path
            data-v-09fe1acc=""
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            class="octo-body"
          ></path></svg
      ></a>
    </div> -->
    <!-- 店铺统计 -->
    <div class="dashboard-header dashboard-item">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-card shadow="always">
            <div class="dashboard-header__card">
              <div class="dashboard-header__card--icon">
                <i class="iconfont icon-sale-amount"></i>
              </div>
              <div class="dashboard-header__card--text">
                <div class="label">销售额</div>
                <div class="number">{{ seller.totalPrice.toLocaleString() }}</div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="always">
            <div class="dashboard-header__card">
              <div class="dashboard-header__card--icon">
                <i class="iconfont icon-shopping"></i>
              </div>
              <div class="dashboard-header__card--text">
                <div class="label">销量</div>
                <div class="number">{{ seller.totalSellCount.toLocaleString() }}</div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="always">
            <div class="dashboard-header__card">
              <div class="dashboard-header__card--icon">
                <i class="iconfont icon-total-count"></i>
              </div>
              <div class="dashboard-header__card--text">
                <div class="label">商品数</div>
                <div class="number">{{ seller.totalFoodCount.toLocaleString() }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 店铺评价 -->
    <div class="dashboard-item">
      <el-card header="店铺评价">
        <div class="seller-rating">
          <div class="seller-rating__left">
            <div class="seller-rating__item">
              <label class="seller-rating__item--label">综合评分</label>

              <el-rate v-model="seller.score" disabled show-score text-color="#ff9900"></el-rate>
            </div>

            <div class="seller-rating__item">
              <label class="seller-rating__item--label">服务态度</label>

              <el-rate v-model="seller.serviceScore" disabled show-score text-color="#ff9900"></el-rate>
            </div>
            <div class="seller-rating__item">
              <label class="seller-rating__item--label">食品得分</label>

              <el-rate v-model="seller.foodScore" disabled show-score text-color="#ff9900"></el-rate>
            </div>
          </div>
          <div class="right">
            <el-progress
              :format="
                (value) => {
                  return `高于周边商家${value}%`;
                }
              "
              :width="140"
              type="circle"
              :percentage="seller.rankRate"
            ></el-progress>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 食品统计 -->
    <div class="dashboard-item">
      <el-card>
        <div slot="header">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span>商品统计</span>
            <div>
              <span style="margin-right:10px">
                <el-input-number
                  placeholder="数据数"
                  size="small"
                  v-model="foodChartOptions.payload.count"
                  :min="6"
                  :max="13"
                ></el-input-number>
              </span>
              <span>
                <el-select size="small" placeholder="选择排序" v-model="foodChartOptions.payload.sort">
                  <el-option
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    v-for="item in foodChartOptions.sortOptions"
                  ></el-option>
                </el-select>
              </span>
            </div>
          </div>
        </div>

        <ve-histogram
          ref="foodChart"
          :extend="extend"
          :settings="chartSettings"
          :data="foodChartData"
          :data-empty="!foodChartData.rows.length"
          :loading="foodChartOptions.loading"
          :xAxis="foodChartOptions.echartsOptions.xAxis"
        ></ve-histogram>
      </el-card>
    </div>
  </div>
</template>

<script>
import { fetchFoodsStatistic, fetchSeller } from "@/helper/request";
import "v-charts/lib/style.css";
export default {
  name: "seller-dashboard",
  data() {
    const foodChartDataOrder = {
      label: "sellCount",
      order: "asc",
    };
    this.extend = {
      series: {
        label: { show: true, position: "top" },
      },
    };
    this.chartSettings = {
      axisSite: { right: ["highRating"] },
      yAxisType: ["MB", "percent"],
      yAxisName: ["数值", "好评率"],
      showLine: ["highRating"],
      labelMap: {
        sellCount: "销量",
        ratingCount: "评价数",
        highRating: "好评率",
      },
      dataOrder: foodChartDataOrder,
    };
    return {
      foodChartOptions: {
        echartsOptions: {
          // yAxis: { type: "value", axisLine: { show: true }, show: true },
          xAxis: {
            axisLabel: {
              margin: 19,
              align: "center",
              interval: 0,
              rotate: 10,
            },
          },
        },
        sortOptions: [
          { value: "sellCount", label: "按销量排序" },
          { value: "ratingCount", label: "按评价数排序" },
          { value: "highRating", label: "按好评率排序" },
        ],
        dataOrder: foodChartDataOrder,
        payload: {
          sort: "sellCount",

          count: 10,
        },
        loading: false,
      },
      foodChartData: {
        columns: ["foodName", "sellCount", "ratingCount", "highRating"],
        rows: [],
      },

      seller: {
        totalPrice: 0,
        totalSellCount: 0,
        totalFoodCount: 0,
      },
    };
  },
  watch: {
    "foodChartOptions.payload": {
      handler: "updateFoodsChartData",
      deep: true,
    },
  },
  created() {
    this.updateFoodsChartData().catch((err) => {
      this.$message.error(err.message);
    });
    fetchSeller()
      .then((res) => {
        this.seller = res;
      })
      .catch((err) => {
        this.$message.error(err.message);
      });
  },
  methods: {
    updateFoodsChartData() {
      this.foodChartOptions.loading = true;

      const { dataOrder, payload } = this.foodChartOptions;

      return fetchFoodsStatistic(payload)
        .then((res) => {
          this.foodChartOptions.loading = false;
          // 更新图表数据排序为指定排序
          dataOrder.label = payload.sort;
          // 排序图标顶部指示器
          const chartColumn = this.foodChartData.columns;
          const swapIndex = chartColumn.findIndex((item) => item === payload.sort);
          chartColumn.splice(swapIndex, 1, chartColumn[1]);
          chartColumn.splice(1, 1, payload.sort);

          this.foodChartData.rows = res.map((item) => {
            return {
              foodName: item.name,
              sellCount: item.sellCount,
              ratingCount: item.ratingCount,
              highRating: item.highRating,
            };
          });
          // 设置x轴坐标label

          this.foodChartOptions.echartsOptions.xAxis.data = res.map((item) => item.name);
        })
        .catch((err) => {
          this.foodChartOptions.loading = false;

          this.$message.error(err.message);
          return Promise.reject(err);
        });
    },
  },
};
</script>
 
<style scoped lang="less">
.iconfont {
  font-size: 70px;
  &.icon-shopping {
    color: #34bfa3;
  }
  &.icon-sale-amount {
    color: red;
  }
  &.icon-total-count {
    color: #409eff;
  }
}
.dashboard {
  // position: relative;
  &-item {
    margin-bottom: 50px;
  }
  &-header {
    &__card {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      height: 100px;
      .label {
        margin-bottom: 12px;
        font-size: 24px;
        color: #606266;
      }
      .number {
        font-size: 35px;
      }
    }
  }
}

.seller-rating {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 35px;
    &--label {
      margin-right: 15px;
    }
  }
}
</style>
