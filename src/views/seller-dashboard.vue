<template>
  <div class="dashboard">
    <!-- <pre>{{data}}</pre> -->
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
                <div class="number">{{ data.sellCount }}</div>
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
                <div class="number">{{ data.sellCount }}</div>
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
                <div class="number">{{ data.sellCount }}</div>
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

                  <el-rate v-model="data.score" disabled show-score text-color="#ff9900"></el-rate>
                </div>

                <div class="seller-rating__item">
                  <label class="seller-rating__item--label">服务态度</label>

                  <el-rate v-model="data.serviceScore" disabled show-score text-color="#ff9900"></el-rate>
                </div>
                <div class="seller-rating__item">
                  <label class="seller-rating__item--label">食品得分</label>

                  <el-rate v-model="data.foodScore" disabled show-score text-color="#ff9900"></el-rate>
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
                  :percentage="data.rankRate"
                ></el-progress>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card header="商品排行榜">
            <ve-histogram :data="chartData"></ve-histogram>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { fetchSeller } from "@/helper/request";
export default {
  name: "page-seller",
  data() {
    return {
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },

      data: {},
    };
  },
  created() {
    fetchSeller()
      .then((res) => {
        this.data = res;
      })
      .catch((err) => {
        this.$message.error(err.message);
      });
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
