import PageLayout from "@/components/page-layout";
import Uploader from "@/components/uploader";
import VUpload from "@/components/v-upload";
import TabTag from "@/components/tab-tag";

export default (Vue) => {
  Vue.component(PageLayout.name, PageLayout);
  Vue.component(Uploader.name, Uploader);
  Vue.component(VUpload.name, VUpload);
  Vue.component(TabTag.name, TabTag);
};
