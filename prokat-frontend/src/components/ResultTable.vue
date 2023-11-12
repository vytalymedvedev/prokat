<template>
  <div class="q-pa-md">
    <q-markup-table flat bordered>
      <thead>
        <tr>
          <th class="text-left">№</th>
          <th class="text-left">Комментарий</th>
          <th class="text-left">Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(result, index) in results"
          :key="index"
          :class="result.status === SUCCESS ? 'bg-green-2' : 'bg-red-2'"
        >
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left">{{ result.comment }}</td>
          <template v-if="result.status === SUCCESS">
            <td class="text-right">Заказ успешно создан</td>
            <td>&#x2714;</td>
          </template>
          <template v-else>
            <td class="text-left">Ошибка</td>
            <td>&#x2716;</td>
          </template>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { SUCCESS } from "../static/result-statuses";

export default defineComponent({
  name: "ResultTable",
  props: {
    results: {
      type: Array,
      required: true,
    },
  },

  setup() {
    return { SUCCESS };
  },
});
</script>
