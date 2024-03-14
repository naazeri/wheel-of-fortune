<template>
  <v-container>
    <v-locale-provider rtl>
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" prepend-icon="mdi-check-circle" @click="showAddDialog = true"
            >ایجاد آیتم جدید</v-btn
          >
        </v-col>
      </v-row>
      <v-row v-if="items.length > 0">
        <v-col cols="12" md="6" v-for="(item, index) in items" :key="item.id">
          <v-card>
            <v-card-title>
              {{ item.prizeName }}
            </v-card-title>
            <v-card-subtitle> شانس: {{ item.probability }} </v-card-subtitle>
            <v-card-actions>
              <v-btn color="blue" @click="editItem(index)">ویرایش</v-btn>
              <v-btn color="red" @click="confirmDelete(index)">حذف</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-row class="text-center">
          <v-col cols="12">
            <br />
            <br />
            <v-label>آیتمی برای گردونه شانس موجود نیست</v-label>
          </v-col>
        </v-row>
      </v-row>

      <v-dialog v-model="showAddDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ currentItemIndex !== null ? 'ویرایش' : 'ایجاد' }} آیتم</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.prizeName"
                      :rules="[rules.required]"
                      label="نام آیتم"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model.number="form.probability"
                      :rules="[rules.required, rules.positiveNumber]"
                      label="شانس"
                      type="number"
                      required
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="closeDialog">لغو</v-btn>
            <v-btn color="blue darken-1" @click="saveItem">ذخیره</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showDeleteDialog" persistent max-width="400">
        <v-card>
          <v-card-title class="text-h5">آیا مطمئن هستید؟</v-card-title>
          <br />
          <br />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="showDeleteDialog = false">لغو</v-btn>
            <v-btn color="red darken-1" @click="deleteItem">حذف</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-locale-provider>
  </v-container>
</template>

<script setup lang="ts">
import 'vuetify/styles'
import { reactive, ref } from 'vue'
import { useWheelStore } from '@/stores/wheel'
import type { PrizeConfig } from '@/types'

const wheelStore = useWheelStore()
const items = wheelStore.items

const showAddDialog = ref(false)
const showDeleteDialog = ref(false)
const currentItemIndex = ref<number | null>(null)

const emptyForm: PrizeConfig = {
  id: 0,
  prizeName: '',
  prizeNameOnWheel: '',
  bgColor: '',
  color: '',
  probability: 1
}
const form = ref<PrizeConfig>({ ...emptyForm })

const rules = reactive({
  required: (value: any) => !!value || 'ضروری.',
  positiveNumber: (value: number) => value > 0 || 'حداقل میزان شانس باید ۱ باشد'
})

const editItem = (index: number) => {
  currentItemIndex.value = index
  form.value = { ...items[index] }
  showAddDialog.value = true
}

const confirmDelete = (index: number) => {
  currentItemIndex.value = index
  showDeleteDialog.value = true
}

const saveItem = () => {
  if (currentItemIndex.value !== null) {
    // edit
    wheelStore.editItem(currentItemIndex.value, { ...form.value })
  } else {
    // add
    const lastId = items[items.length - 1]?.id ?? 0
    form.value.id = lastId + 1
    form.value.prizeNameOnWheel = form.value.prizeName
    wheelStore.addItem({ ...form.value })
  }
  closeDialog()
}

const deleteItem = () => {
  if (currentItemIndex.value == null) {
    return
  }

  wheelStore.removeItem(currentItemIndex.value)
  showDeleteDialog.value = false
  currentItemIndex.value = null
}

const closeDialog = () => {
  showAddDialog.value = false
  currentItemIndex.value = null
  form.value = { ...emptyForm }
}
</script>

<style>
body {
  background-color: #e5e7eb !important;
}
</style>
