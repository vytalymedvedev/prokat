<template>
  <q-page class="flex flex-center">
    <result-table v-if="results.length" :results="results" />
    <div class="fit row wrap justify-around">
      <q-spinner v-if="showSpinner" color="primary" size="3em" />
      <template v-else>
        <q-input
          name="comment"
          v-model="comment"
          label="Комментарий"
          class="col-4"
        ></q-input>

        <q-btn @click="onClick" class="col-4 bg-primary text-grey-1"
          >Создать заказ</q-btn
        >
      </template>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import ResultTable from "../components/ResultTable.vue";
import { postOrder } from "../api";
import { SUCCESS, ERROR } from "../static/result-statuses";

export default defineComponent({
  name: "IndexPage",
  components: {
    ResultTable,
  },

  setup() {
    const results = ref([]);
    const comment = ref("");
    const showSpinner = ref(false);

    const onClick = async () => {
      showSpinner.value = true;

      try {
        await postOrder({ comment: comment.value });
        results.value.push({ status: SUCCESS, comment: comment.value });
      } catch (e) {
        results.value.push({ status: ERROR, comment: comment.value });
      } finally {
        comment.value = "";
        showSpinner.value = false;
      }
    };

    return { results, onClick, comment, showSpinner };
  },
});
</script>
