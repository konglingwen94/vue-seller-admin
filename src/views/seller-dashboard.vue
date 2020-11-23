<template>
  <div class="dashboard">
    <!-- <pre>{{seller}}</pre> -->
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
      <el-row :gutter="50">
        <el-col :span="12">
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
        </el-col>

        <el-col :span="24">
          <el-card :header="`商品排行Top10`">
            <div slot="header">
              <el-row type="flex" justify="space-between">
                <el-col :span="4">商品统计</el-col>
                <el-col :span="4">
                  <el-select   placeholder="选择排序" v-model="foodChartOptions.payload.sort">
                    <el-option
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      v-for="item in foodChartOptions.sortOptions"
                    >
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </div>

            <ve-histogram
              :extend="extend"
              :settings="chartSettings"
              :data="foodChartData"
              :data-empty="!foodChartData.rows.length"
              :loading="foodChartOptions.loading"
            >
            </ve-histogram>
          </el-card>
        </el-col>
      </el-row>
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
      order: "asc",
    };
    this.extend = {
      series: {
        label: { show: true, position: "top" },
      },
    };
    this.chartSettings = {
      axisSite: { right: ["highRating"] },
      yAxisType: ["KMB", "percent"],
      yAxisName: ["数值", "好评率"],
      showLine: ["highRating"],
      labelMap: {
        sellCount: "销量",
        ratingCount: "评 价数",
        highRating: "好评率",
      },
      dataOrder: foodChartDataOrder,
    };
    return {
      foodChartOptions: {
        // dataOrder:foodChartDataOrder,
        sortOptions: [
          { value: "sellCount", label: "销量" },
          { value: "ratingCount", label: "评价数" },
          { value: "highRating", label: "好评率" },
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
        rows: [
          { foodName: "八宝粥", sellCount: 1393, ratingCount: 1093, highRating: 0.32 },
          { foodName: "油条", sellCount: 3530, ratingCount: 3230, highRating: 0.26 },
          { foodName: "1/3", sellCount: 2923, ratingCount: 2623, highRating: 0.76 },
          { foodName: "1/4", sellCount: 1723, ratingCount: 1423, highRating: 0.49 },
          { foodName: "1/5", sellCount: 3792, ratingCount: 3492, highRating: 0.323 },
          { foodName: "1/6", sellCount: 4593, ratingCount: 4293, highRating: 0.78 },
        ],
      },

      seller: {},
    };
  },
  watch: {
    "foodChartOptions.payload.sort": "updateFoodsChartData",
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
          dataOrder.label = payload.sort;

          this.foodChartData.rows = res.map((item) => {
            return {
              foodName: item.name,
              sellCount: item.sellCount,
              ratingCount: item.ratingCount,
              highRating: item.highRating,
            };
          });
        })
        .catch((err) => {
          this.foodChartOptions.loading = false;

          this.$message.error(err.message);
          return Promise.reject();
        });
    },
  },
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
