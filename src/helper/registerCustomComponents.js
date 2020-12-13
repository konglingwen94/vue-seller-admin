import PageLayout from "@/components/page-layout";
import Uploader from "@/components/uploader";
import VUpload from "@/components/v-upload";

export default (Vue) => {
  Vue.component(PageLayout.name, PageLayout);
  Vue.component(Uploader.name, Uploader);
  Vue.component(VUpload.name, VUpload);
};
