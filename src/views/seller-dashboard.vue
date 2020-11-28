<template>
  <div class="dashboard">
  <!-- 店铺统计 -->
    <div class="dashboard-header dashboard-item">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-card shadow="always">
            <div class="dashboard-header__card">
              <div class="dashboard-header__card--icon">
                <img
                  width="100"
                  height="100"
                  src="http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180"
                  alt
                />
              </div>
              <div class="dashboard-header__card--text">
                <div class="label">销售额</div>
                <div class="number">{{ seller.sellCount }}</div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="always">
            <div class="dashboard-header__card">
              <div class="dashboard-header__card--icon">
                <img
                  width="100"
                  height="100"
                  src="http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180"
                  alt
                />
              </div>
              <div class="dashboard-header__card--text">
                <div class="label">销量</div>
                <div class="number">{{ seller.sellCount }}</div>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="always">
            <div class="dashboard-header__card">
              <div class="dashboard-header__card--icon">
                <img
                  width="100"
                  height="100"
                  src="http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180"
                  alt
                />
              </div>
              <div class="dashboard-header__card--text">
                <div class="label">商品数</div>
                <div class="number">{{ seller.sellCount }}</div>
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
  name: "page-seller",
  data() {
    const foodChartDataOrder = {
      label: "sellCount",
      order: "asc"
    };
    this.extend = {
      series: {
        label: { show: true, position: "top" }
      }
    };
    this.chartSettings = {
      axisSite: { right: ["highRating"] },
      yAxisType: ["MB", "percent"],
      yAxisName: ["数值", "好评率"],
      showLine: ["highRating"],
      labelMap: {
        sellCount: "销量",
        ratingCount: "评价数",
        highRating: "好评率"
      },
      dataOrder: foodChartDataOrder
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
              rotate: 10
            }
          }
        },
        sortOptions: [
          { value: "sellCount", label: "按销量排序" },
          { value: "ratingCount", label: "按评价数排序" },
          { value: "highRating", label: "按好评率排序" }
        ],
        dataOrder: foodChartDataOrder,
        payload: {
          sort: "sellCount",

          count: 10
        },
        loading: false
      },
      foodChartData: {
        columns: ["foodName", "sellCount", "ratingCount", "highRating"],
        rows: []
      },

      seller: {}
    };
  },
  watch: {
    "foodChartOptions.payload": {
      handler: "updateFoodsChartData",
      deep: true
    }
  },
  created() {
    this.updateFoodsChartData().catch(err => {
      this.$message.error(err.message);
    });
    fetchSeller()
      .then(res => {
        this.seller = res;
      })
      .catch(err => {
        this.$message.error(err.message);
      });
  },
  methods: {
    updateFoodsChartData() {
      this.foodChartOptions.loading = true;

      const { dataOrder, payload } = this.foodChartOptions;

      return fetchFoodsStatistic(payload)
        .then(res => {
          this.foodChartOptions.loading = false;
          // 更新图表数据排序为指定排序
          dataOrder.label = payload.sort;
          // 排序图标顶部指示器
          const chartColumn = this.foodChartData.columns;
          const swapIndex = chartColumn.findIndex(
            item => item === payload.sort
          );
          chartColumn.splice(swapIndex, 1, chartColumn[1]);
          chartColumn.splice(1, 1, payload.sort);

          this.foodChartData.rows = res.map(item => {
            return {
              foodName: item.name,
              sellCount: item.sellCount,
              ratingCount: item.ratingCount,
              highRating: item.highRating
            };
          });
          // 设置x轴坐标label

          this.foodChartOptions.echartsOptions.xAxis.data = res.map(
            item => item.name
          );
        })
        .catch(err => {
          this.foodChartOptions.loading = false;

          this.$message.error(err.message);
          return Promise.reject(err);
        });
    }
  }
};
</script>

<style scoped lang="less">
.dashboard {
  &-item {
    margin-bottom: 50px;
  }
  &-header {
    &__card {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      .label {
        margin-bottom: 12px;
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
