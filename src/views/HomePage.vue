<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header>
        <ion-toolbar>
          <ion-button @click="goToAuth">
            <ion-icon slot="icon-only" :icon="personOutline"></ion-icon>
          </ion-button>
        </ion-toolbar>
      </ion-header>
      <ion-card>
        <ion-card-header>
          <ion-row class="ion-align-items-center">
            <ion-col>
              <ion-card-title>Balance:</ion-card-title>
            </ion-col>
            <ion-col class="ion-text-end">
              <ion-card-title>$ {{ totalBalance }}</ion-card-title>
            </ion-col>
          </ion-row>
        </ion-card-header>
      </ion-card>

      <ion-row>
        <ion-col>
          <ion-button
              expand="block"
              @click="openFundsModal(false)"
          >
            Add funds
          </ion-button>
        </ion-col>
        <ion-col>
          <ion-button
              color="danger"
              expand="block"
              @click="openFundsModal(true)"
          >
            Reduce funds
          </ion-button>
        </ion-col>
      </ion-row>

      <ion-card>
        <ion-row
            v-for="(record, index) in store.records"
            :key="index"
        >
          <ion-col>
            <ion-card-title>
              {{ record.comment }}
            </ion-card-title>
            <ion-card-subtitle>
              2{{ record.date }}
            </ion-card-subtitle>
          </ion-col>
          <ion-col class="ion-text-end">
            <ion-card-title :class="{ 'added-funds': !record.isExpense }">
              <span v-if="!record.isExpense">+</span>
              $ {{ record.value }}
            </ion-card-title>
          </ion-col>
        </ion-row>
      </ion-card>


      <ion-modal
          :is-open="isAddFundsModalOpen"
          @will-dismiss="dismiss"
          :initial-breakpoint=".5"
          :breakpoints="[0, .5, 1]"
          handle-behavior="cycle"
      >
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="dismiss">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-input
              v-model="record.comment"
              label="Comment"
              label-placement="floating"
          />
          <ion-input
              v-model="record.value"
              label="Amount"
              label-placement="floating"
          />
          <br>
          <ion-button
              class="ion-margin-bottom"
              expand="block"
              @click="addFunds"
          >
            Submit
          </ion-button>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { personOutline } from "ionicons/icons";
import { userStore } from "@/store/user.js";
import { useRouter } from "vue-router";

const store = userStore()

const isAddFundsModalOpen = ref(false)
const isNewRecordWithExpenses = ref(false)

const totalBalance = computed(() => {
  return store.records.reduce((sum, el) => {
    if (el.isExpense) {
      return sum - Number(el.value)
    } else {
      return sum + Number(el.value)
    }
  }, 0)
})

const openFundsModal = (isExpenses) => {
  isNewRecordWithExpenses.value = isExpenses
  isAddFundsModalOpen.value = true
}
const dismiss = () => {
  isAddFundsModalOpen.value = false;
}

const record = ref({})

const addFunds = () => {
  if (!record.value.comment || !record.value.value) return
  const data = { ...record.value, date: new Date().toDateString() }
  data.isExpense = isNewRecordWithExpenses.value

  store.addRecordToStore(data)

  record.value = {}

  dismiss()
}

const router = useRouter()

const goToAuth = () => {
  router.push({ name: 'Auth' })
}


onMounted(() => {
  store.fetchDataFromDB()
})

</script>

<style scoped>
.added-funds {
  color: var(--ion-color-success)
}
</style>
