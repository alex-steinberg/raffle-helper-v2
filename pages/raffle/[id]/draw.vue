<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle v-if="raffles?.length > 0"
          >Draw: {{ raffles[0].quantity }} x
          {{ raffles[0].prize.name }}</IonTitle
        >
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding" :fullscreen="true">
      <IonList ref="entrants">
        <IonItem v-for="entry in entries" :key="entry.id" :id="entry.id">
          <IonLabel>
            <h2>{{ entry.first_name }} {{ entry.last_name }}</h2>
          </IonLabel>
        </IonItem>
      </IonList>
      <div class="draw">
        <button
          @click="handleDraw"
          ref="drawButton"
          id="doDraw"
          class="draw__button"
        >
          Do the draw
        </button>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import { drawWinners, Entry } from "~/common/helpers";
import { Database } from "~~/types/database.types";
const router = useIonRouter();
const {
  params: { id: raffleId },
} = useRoute();

const client = useSupabaseClient<Database>();
const entrants = ref(null);
const drawButton = ref(null);
const animateDraw = (winners: number[]) => {
  const list = entrants.value.$el;
  const listItems = list.querySelectorAll("ion-item");

  listItems.forEach((item, index) => {
    const animationDelay = (listItems.length - index - 1) * 0.1;
    if (winners.includes(parseInt(item.id))) {
      item.classList.add("winner");
    } else {
      item.style.animationDelay = `${animationDelay}s`;
      item.addEventListener("animationend", () => {
        item.remove();
      });
    }
  });
  list.classList.add("list");
};

let { data: raffles, error } = await useAsyncData("raffles", async () => {
  if (!raffleId) return;
  const { data } = await client
    .from("raffles")
    .select(
      `
      id,
      quantity,
      completed_at,
      prize (
        id,
        name,
        description
      )
    `
    )
    .eq("id", raffleId);
  return data;
});

const isRaffleOpen = computed(() => {
  return (raffles.value && raffles.value.length > 0) ||
    !!raffles.value[0].completed_at
    ? dayjs(raffles.value[0].completed_at).isAfter(dayjs())
    : false;
});

let { data: entries, error: entriesError } = await useAsyncData(
  "entries",
  async () => {
    if (!raffleId) return;
    const { data } = await client
      .from("entries")
      .select(
        `
        id,
        entrant_id (
          id,
          first_name,
          last_name,
          email
        )
      `
      )
      .eq("raffle_id", raffleId);
    console.log({ data });
    const unique = new Set();
    return data
      ?.filter((entry) => {
        if (unique.has(entry.entrant_id.id)) return false;
        unique.add(entry.entrant_id.id);
        return true;
      })
      .map((entry) => ({ ...entry.entrant_id, entry_id: entry.id }));
  }
);

const hideDrawButton = () => {
  drawButton.value.style.display = "none";
};

const setWinners = async (winners: Entry[]) => {
  await client
    .from("winnings")
    .insert(winners.map((winner) => ({ entry_id: winner.entry_id })));
};

const closeRaffle = async () => {
  const now = new Date();
  await client
    .from("raffles")
    .update({ completed_at: now.toISOString() })
    .eq("id", raffleId);
};

const handleDraw = async () => {
  const winners = drawWinners(entries.value, raffles.value[0].quantity);
  await setWinners(winners);
  await closeRaffle();
  setTimeout(() => {
    const winnerIds = winners.map((winner) => winner.id);
    console.log({ winnerIds, quantity: raffles.value[0].quantity });
    animateDraw(winnerIds);
    hideDrawButton();
  }, 3100);
  console.log({ winners });
};
const doDraw = drawWinners(entries.value, raffles.value[0].quantity);

definePageMeta({
  middleware: ["auth"],
});
</script>

<style scoped>
.draw {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10vh;
}
.draw__button {
  color: white;
  background-color: darkred;
  border-radius: 6px;
  padding: 16px 32px;
  font-size: 24px;
  font-weight: bold;
}
#doDraw {
  animation: spin 3s cubic-bezier(0.775, 0.295, 0.18, 0.95) forwards;
  animation-play-state: paused;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(2160deg);
  }
}

button#doDraw:focus {
  animation-play-state: running;
}

button#doDraw:active {
  animation-play-state: paused;
  transform: rotate(1080deg);
}

.list {
  overflow: hidden;
  position: relative;
}

.list ion-item:not(.winner) {
  position: relative;
  animation: swipeOff 0.5s ease forwards;
}

@keyframes swipeOff {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
