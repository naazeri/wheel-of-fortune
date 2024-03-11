<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="showAddDialog = true">ایجاد آیتم جدید</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="items.length > 0">
      <v-col cols="12" md="6" v-for="(item, index) in items" :key="item.name">
        <v-card>
          <v-card-title>
            {{ item.name }}
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
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="نام آیتم" v-model="form.name" />
              </v-col>
              <v-col cols="12">
                <v-text-field label="شانس" type="number" v-model="form.probability" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="closeDialog">لغو</v-btn>
          <v-btn color="blue darken-1" @click="saveItem">ذخیره</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showDeleteDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">آیا مطمئن هستید؟</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="showDeleteDialog = false">لغو</v-btn>
          <v-btn color="red darken-1" @click="deleteItem">حذف</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWheelStore } from '@/stores/wheel'
import 'vuetify/styles'
import type { PrizeConfig } from '@/types'

const wheelStore = useWheelStore()
const showAddDialog = ref(false)
const showDeleteDialog = ref(false)
const currentItemIndex = ref<number | null>(null)
const emptyForm: PrizeConfig = {
  id: 0,
  name: '',
  value: '',
  bgColor: '',
  color: '',
  probability: 1
}
const form = ref<PrizeConfig>({ ...emptyForm })

const items = wheelStore.items

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
    form.value.value = form.value.name
    wheelStore.editItem(currentItemIndex.value, { ...form.value })
  } else {
    const lastId = items[items.length - 1]?.id ?? 0
    form.value.id = lastId + 1
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
