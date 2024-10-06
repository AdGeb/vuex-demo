import { createStore } from "vuex";
import { ItemDetails } from "@/views/CoffeeBeans/interfaces/coffeeBeans.interfaces";
import { ItemInBag } from "@/store/store.interfaces";

export interface RootState {
  navigation: {
    selectedTab: string;
  };
  shoppingBag: {
    itemsInBag: ItemInBag[];
    itemDetails: ItemDetails;
  };
}

const index = createStore<RootState>({
  state: {
    navigation: {
      selectedTab: "tab1",
    },
    shoppingBag: {
      itemsInBag: [],
      itemDetails: {},
    },
  },
  mutations: {
    setSelectedTab(state: RootState, tab: string) {
      state.navigation.selectedTab = tab;
    },
    addItemsToShoppingBag(state: RootState, newItems: ItemInBag[]) {
      state.shoppingBag.itemsInBag.push(...newItems);
    },
    removeItemFromShoppingBag(state: RootState, itemId: string) {
      const index = state.shoppingBag.itemsInBag.findIndex(
        (item) => item.id === itemId,
      );
      if (index !== -1) {
        state.shoppingBag.itemsInBag.splice(index, 1);
      }
    },
    setItemDetails(state: RootState, itemDetails: ItemDetails) {
      state.shoppingBag.itemDetails = itemDetails;
    },
  },
  actions: {
    updateSelectedTab({ commit }, tab: string) {
      commit("setSelectedTab", tab);
    },
    addItems({ commit }, newItems: ItemInBag[] = []) {
      commit("addItemsToShoppingBag", newItems);
    },
    removeItem({ commit }, itemId: string) {
      commit("removeItemFromShoppingBag", itemId);
    },
    setItemDetails({ commit }, itemDetails: ItemDetails) {
      commit("setItemDetails", itemDetails);
    },
  },
  getters: {
    selectedTab: (state: RootState) => state.navigation.selectedTab,
    getItemsInBag: (state: RootState, id: string) =>
      state.shoppingBag.itemsInBag,
    getNumberOfItemsInShoppingBag: (state: RootState) =>
      state.shoppingBag.itemsInBag.length,
    getItemDetails: (state: RootState) => state.shoppingBag.itemDetails,
  },
});

export default index;
